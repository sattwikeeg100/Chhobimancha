import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentPopup from "./PaymentPopup";
import BookYourSeat from "./BookYourSeat";
import ShowDetails from "./ShowDetails";

const SingleShow = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [bookedSeat, setBookedSeat] = useState(null);

  const { slug } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const APIURL = import.meta.env.VITE_API_URL;
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const [user, setUser] = useState(null);
  useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
          setUser(JSON.parse(storedUser));
      }
  }, []);

  const fetchShow = async () => {
      try {
          const response = await axios.get(`${APIURL}/shows/${slug}`);
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
    if (!bookedSeats.includes(seatId)) {
      if (!selectedSeats.includes(seatId)) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        const updatedSeats = selectedSeats.filter((seat) => seat !== seatId);
        setSelectedSeats(updatedSeats);
      }
    }
  };

  const handleBookNow = async () => {
      if(!user) {
        alert("Please login to book seats for your favouite show!");
        return;
      }
      if (selectedSeats.length > 0) {
          try {
              const orderInfo = await axios.post(
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
                              totalAmount: orderInfo.data.order.amount/100,
                          };
                          console.log("BBOKINGDATA: ", bookingData);
                          await axios.post(
                              `${APIURL}/bookings/paymentverification`,
                              bookingData,
                              {
                                  headers: {
                                      Authorization: `Bearer ${user.token}`,
                                  },
                              }
                          );
                          alert("Payment Successful and Booking Confirmed!");
                          setShowPopup(true);
                      } catch (error) {
                          console.error("Error saving booking", error);
                          alert(
                              "Payment successful but booking could not be saved."
                          );
                      }
                  },
                  prefill: {
                      name: "Sattwikee Ghosh",
                      email: "sattwikeeghosh@example.com",
                      contact: "9000090000",
                  },
                  notes: {
                      address: "Razorpay Corporate Office",
                  },
                  theme: {
                      color: "#121212",
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
/*   const handleBookNow = async() => {
    if (selectedSeats.length > 0) {
      if (selectedSeats.length === 1) {
        setBookedSeat(selectedSeats[0]);
      } else {
        setBookedSeat(selectedSeats.join(", "));
      }
      setBookedSeats([...bookedSeats, ...selectedSeats]);
      setShowPopup(true);
    }
  };
 */
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
    window.location.reload();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="p-5 bg-background1">
      <div className="flex flex-col items-center justify-center gap-y-3">
        <div className="flex flex-col lg:flex-row gap-x-7">
          {/* poster */}
          <ShowDetails show={show}/>

          {/* booking */}
          <BookYourSeat
            selectedSeats={selectedSeats}
            bookedSeats={bookedSeats}
            handleSeatClick={handleSeatClick}
            handleBookNow={handleBookNow}
            getSeatClass={getSeatClass}
          />
        </div>
      </div>
      {/* popup for seat booking */}
      {showPopup && (
        <PaymentPopup
          handleClosePopup={handleClosePopup}
          bookedSeat={bookedSeat}
        />
      )}

      <div className="text-3xl text-white">About the play</div>
      <div className="text-3xl text-white">Cast</div>
      <div className="text-3xl text-white">Crew</div>
    </section>
  );
};

export default SingleShow;