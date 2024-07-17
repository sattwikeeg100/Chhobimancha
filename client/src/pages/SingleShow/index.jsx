import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PaymentPopup from "../../components/PaymentPopup/PaymentPopup";
import BookYourSeat from "../../components/BookYourSeat/BookYourSeat";
import ShowDetails from "../../components/ShowDetails/ShowDetails";
import TheatreCastCrew from "../../components/TheatreCastCrew/TheatreCastCrew";

import { useDispatch, useSelector } from "react-redux";
import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice";
import axiosInstance from "../../config/axiosInstance";

import logo from "/logo.jpg";
import jsPDF from "jspdf";
import "jspdf-autotable";

import SkeletonSingleShow from "../../components/Skeletons/skeletonSingleShow";

const SingleShow = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [emailSuccessPopup, setEmailSuccessPopup] = useState(false);

  const { slug } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState(null);
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const fetchShow = async () => {
    try {
      const response = await axiosInstance.get(`/shows/${slug}`);
      setTimeout(() => {
        setShow(response.data);
        setLocalLoading(false);
      }, 700);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred");
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    fetchShow();
  }, []);

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
          ["Total Amount", `$${booking.totalAmount.toFixed(2)}`],
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

  const getSeatPrice = (seatId) => {
    const row = seatId.charAt(0); // Extract the row letter
    if (["A", "B", "C", "D"].includes(row)) {
      return show.ticketPrice.frontStall;
    } else if (["E", "F", "G", "H", "I", "J"].includes(row)) {
      return show.ticketPrice.rearStall;
    } else if (["K", "L", "M"].includes(row)) {
      return show.ticketPrice.balcony;
    } else {
      return 0; // Default price if the row is not recognized
    }
  };

  const handleBookNow = async () => {
    if (!user) {
      dispatch(switchLoginModalOpen(true));
      return;
    }
    if (selectedSeats.length > 0) {
      try {
        // Calculate total amount based on selected seats
        const totalAmount = selectedSeats.reduce((total, seatId) => {
          return total + getSeatPrice(seatId);
        }, 0);

        const orderInfo = await axiosInstance.post(
          `/bookings/checkout`,
          { amount: totalAmount } // Amount in paise
        );

        const options = {
          key: razorpayKey,
          amount: orderInfo.data.order.amount,
          currency: "INR",
          name: "Chhobimancha",
          description: "Booking show seats at Chhobimancha",
          image:
            "https://chhobimancha.vercel.app/assets/chobimancha_logo3-Cb85A07e.png", // TODO: Our logo url
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
                `/bookings/paymentverification`,
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

  if (localLoading) {
    return <SkeletonSingleShow />;
  }

  return (
    <section className="py-5  bg-background1 flex flex-col gap-y-7 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-y-5 justify-center">
        {/* poster */}
        <ShowDetails show={show} />

        {/* Cast and Crews Section */}

        <div className="flex flex-col gap-y-4 lg:w-[56%] xl:w-[64%] lg:pr-10">
          {/* cast */}
          <div className=" flex flex-col ">
            <div className="text-3xl pl-10    sm:text-2xl text-md font-bold font-montserrat text-left lg:px-10 md:px-8 sm:px-5 px-10 text-primary_text">
              Artist
            </div>
            <div className="pt-7">
              <TheatreCastCrew casts={show.casts} />
              {console.log(show.casts)}
            </div>
          </div>

          {/* crew */}
          <div className=" flex flex-col ">
            <div className="text-3xl pl-10    sm:text-2xl text-md font-bold font-montserrat text-left lg:px-10 md:px-8 sm:px-5 px-10 text-primary_text">
              Crew
            </div>
            <div className="pt-7">
              <TheatreCastCrew casts={show.crews} />
            </div>
          </div>
        </div>
      </div>

      {/* about section */}

      <div className="px-10 flex flex-col gap-y-3">
        <div className="sm:text-2xl text-3xl font-bold font-montserrat tracking-wider common-heading">
          About The Play
        </div>
        <p className=" text-secondary_text sm:text-lg leading-8">
          {show.description}
        </p>
      </div>

      {/* Casts Section */}

      {/* booking */}

      <div className="flex flex-col gap-y-5 ">
        <div className="px-10 sm:text-2xl text-3xl font-bold font-montserrat tracking-wider common-heading">
          Grab Your Seats
        </div>
        <BookYourSeat
          selectedSeats={selectedSeats}
          handleSeatClick={handleSeatClick}
          handleBookNow={handleBookNow}
          getSeatClass={getSeatClass}
          ticketPrice={show.ticketPrice}
          theatreImage={show.theatre.image}
        />
      </div>

      {/* popup for seat booking */}

      {showPopup && (
        <PaymentPopup
          handleClosePopup={handleClosePopup}
          bookedSeat={selectedSeats}
          emailSuccessPopup={emailSuccessPopup}
        />
      )}
    </section>
  );
};

export default SingleShow;
