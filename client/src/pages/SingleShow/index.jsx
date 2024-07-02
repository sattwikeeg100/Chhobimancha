import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PaymentPopup from "./PaymentPopup";
import BookYourSeat from "./BookYourSeat";
import ShowDetails from "./ShowDetails";
import TheatreCastCrew from "./TheatreCastCrew";

import { useDispatch, useSelector } from "react-redux";
import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice";
import axiosInstance from "../../config/axiosInstance";

import logo from "/logo.jpg";
import jsPDF from "jspdf";
import "jspdf-autotable";

const theatre = {
  about: `In the kingdom of Denmark, Prince Hamlet mourns his father, the king,
            who has recently passed away. His mother, the Queen, quickly marries
            Claudius, the king's brother. Hamlet is disgusted by this marriage,
            believing it to be inappropriate and hasty. One night, a ghost appears
            to Hamlet, resembling his deceased father. The ghost reveals he was
            murdered by Claudius and pleads with Hamlet to avenge his death.
            Consumed by grief and rage, Hamlet swears to take revenge. Hamlet
            becomes withdrawn and erratic, baffling those around him. He feigns
            madness to conceal his true motives from Claudius and the court. He
            puts on a play that reenacts the murder of his father, hoping to see
            Claudius betray himself. As the play unfolds, Claudius becomes
            agitated and storms out, confirming Hamlet's suspicions. Hamlet
            wrestles with doubt and the burden of revenge. He contemplates death
            and the meaning of life. Meanwhile, Claudius grows fearful of Hamlet
            and schemes to eliminate him. Hamlet hesitates to act, troubled by
            moral dilemmas and the potential consequences. The play explores
            themes of betrayal, revenge, grief, and mortality, building towards a
            conflict-filled climax.`,
  casts: [
    {
      name: "Riddhi Sen",
      image:
        "https://in.bmscdn.com/iedb/artist/images/website/poster/large/riddhi-sen-41799-02-12-2021-01-39-05.jpg",
    },
    {
      name: "Surangana Bandyopadhyay",
      image:
        "https://www.indiablooms.com/showbiz_pic/2022/ca77088e5d8cc1d79a41345e83f442d1.jpeg",
    },
    {
      name: "Kaushik Sen",
      image:
        "https://media.themoviedb.org/t/p/w500/51wHqBDdpHj15rvE2K1btwcaTqL.jpg",
    },

    {
      name: "Reshmi Sen",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw1mN-vHdksP6xHNbv1_M5vn970syr4VFHiQ&s",
    },
  ],
  crew: [
    {
      name: "Kaushik Sen",
      image:
        "https://media.themoviedb.org/t/p/w500/51wHqBDdpHj15rvE2K1btwcaTqL.jpg",
    },
    {
      name: "Chaiti Mitra",
      image:
        "https://photogallery.indiatimes.com/events/kolkata/upal-sengupta-presents-a-musical-event-with-folk-songs/chaiti-mitra/photo/65843902/Chaiti-Mitra.jpg",
    },
    {
      name: "Swapnasandhani Production",
      image:
        "https://scontent.fccu32-1.fna.fbcdn.net/v/t39.30808-1/305479432_537097888220365_5273972752967471739_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bi2l7ZsSwhoQ7kNvgEOPNpz&_nc_ht=scontent.fccu32-1.fna&oh=00_AYB6Wv78JmstmLe3nP5zFlGIP-aqjLenQirs6mTIpxa0fQ&oe=666739AD",
    },
  ],
};

const SingleShow = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookedSeat, setBookedSeat] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [emailSuccessPopup, setEmailSuccessPopup] = useState(false);

  const { slug } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const APIURL = import.meta.env.VITE_API_URL;
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const fetchShow = async () => {
    try {
      const response = await axiosInstance.get(`${APIURL}/shows/${slug}`);
      setShow(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShow();
  }, [slug]);

  const handleSeatClick = (row, col) => {
    const seatId = `${String.fromCharCode(64 + row)}${col}`;
    // console.log(seatId);
    if (!show.bookedSeats.includes(seatId)) {
      if (!selectedSeats.includes(seatId)) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        const updatedSeats = selectedSeats.filter((seat) => seat !== seatId);
        setSelectedSeats(updatedSeats);
      }
    }
  };

  const generateBookingPDF = (booking) => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;

    return new Promise((resolve) => {
      img.onload = () => {
        doc.addImage(img, "PNG", 14, 10, 50, 20);
        doc.setFontSize(18);
        doc.text("Ticket Details", 14, 40);

        const details = [
          ["Show Title", booking.show.title],
          ["User Name", user.name],
          ["User Email", user.email],
          ["Show Date", new Date(booking.show.date).toLocaleDateString()],
          ["Show Time", booking.show.time],
          ["Theatre Name", booking.show.theatre.name],
          ["Theatre Address", booking.show.theatre.address],
          ["Booked Seats", booking.seats.join(", ")],
          ["Total Amount", `$${(booking.totalAmount / 100).toFixed(2)}`],
        ];

        doc.autoTable({
          startY: 50,
          head: [["Field", "Details"]],
          body: details,
          theme: "grid",
        });

        const pdfBase64 = doc.output("datauristring");
        resolve(pdfBase64);
      };
    });
  };

  const handleBookNow = async () => {
    if (!user) {
      dispatch(switchLoginModalOpen(true));
      return;
    }
    if (selectedSeats.length > 0) {
      try {
        const orderInfo = await axiosInstance.post(
          `${APIURL}/bookings/checkout`,
          { amount: "5000" }
        );
        const options = {
          key: razorpayKey,
          amount: orderInfo.data.order.amount,
          currency: "INR",
          name: "Sattwikee Ghosh",
          description: "Booking show seats at Showtime360",
          image: "https://avatars.githubusercontent.com/u/105354525?v=4",
          order_id: orderInfo.data.order.id,
          handler: async function (response) {
            try {
              const bookingData = {
                show: show._id,
                seats: selectedSeats,
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signatureId: response.razorpay_signature,
                totalAmount: orderInfo.data.order.amount / 100,
              };
              const bookingInfo = await axiosInstance.post(
                `${APIURL}/bookings/paymentverification`,
                bookingData
              );
              alert("Payment Successful and Booking Confirmed!");
              console.log("RESPONSE:", bookingInfo);
              const booking = bookingInfo.data.booking;
              const pdfBlob = await generateBookingPDF(booking);

              try {
                await axiosInstance.post("/bookings/send-email", {
                  name: user.name,
                  email: user.email,
                  pdfBlob,
                  showTitle: booking.show.title,
                });
                setEmailSuccessPopup(true);
              } catch (err) {
                console.error(err);
                alert("Failed to send ticket !");
              }
              setShowPopup(true);
            } catch (error) {
              console.error("Error saving booking", error);
              alert("Payment successful but booking could not be saved.");
            }
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      } catch (error) {
        console.error("Error initiating payment", error);
        alert("Error initiating payment");
      }
    }
  };

  const getSeatClass = (seatId) => {
    if (show.bookedSeats.includes(seatId)) {
      return "bg-red-500 cursor-not-allowed";
    } else if (selectedSeats.includes(seatId)) {
      return "bg-green-500";
    } else {
      return "bg-white";
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedSeats([]);
    fetchShow();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-5  bg-background1 flex flex-col gap-y-7">
      <div className="px-10 flex flex-col lg:flex-row gap-x-7 justify-center">
        {/* poster */}
        <ShowDetails show={show} />

        <div className="flex flex-col gap-y-4 w-[64%]">
          {/* cast */}
          <div className=" flex flex-col ">
            <div className="text-4xl text-white pl-10  font-bold">Artist</div>
            <div className="pt-7">
              <TheatreCastCrew casts={show.casts} />
            </div>
          </div>

          {/* Crews Section */}

          {/* crew */}
          <div className=" flex flex-col ">
            <div className="text-4xl text-white pl-10  font-bold">Crew</div>
            <div className="pt-7">
              <TheatreCastCrew casts={show.crews} />
            </div>
          </div>
        </div>

        {/* booking */}
        {/* <BookYourSeat
            selectedSeats={selectedSeats}
            handleSeatClick={handleSeatClick}
            handleBookNow={handleBookNow}
            getSeatClass={getSeatClass}
          /> */}
      </div>

      {/* popup for seat booking */}

      {showPopup && (
        <PaymentPopup
          handleClosePopup={handleClosePopup}
          bookedSeat={selectedSeats}
          emailSuccessPopup={emailSuccessPopup}
        />
      )}
      {/* about section */}

      <div className="px-10 flex flex-col gap-y-3">
        <div className="text-4xl text-white  font-bold">About The Play</div>
        <p className=" text-secondary_text text-lg leading-8">
          {show.description}
        </p>
      </div>

      {/* Casts Section */}

      {/* booking */}

      <div className="flex flex-col gap-y-3">
        <div className="px-10 text-4xl text-white  font-bold">
          Grab Your Seats
        </div>
        <BookYourSeat
          selectedSeats={selectedSeats}
          handleSeatClick={handleSeatClick}
          handleBookNow={handleBookNow}
          getSeatClass={getSeatClass}
        />
      </div>
    </section>
  );
};

export default SingleShow;
