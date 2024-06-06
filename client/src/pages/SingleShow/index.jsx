import React, { useState } from "react";

import PaymentPopup from "./PaymentPopup";
import BookYourSeat from "./BookYourSeat";
import ShowDetails from "./ShowDetails";

const SingleShow = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [bookedSeat, setBookedSeat] = useState(null);

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

  const handleBookNow = () => {
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

  const getSeatClass = (seatId) => {
    if (bookedSeats.includes(seatId)) {
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
  };

  return (
    <section className="p-5 bg-background1">
      <div className="flex flex-col items-center justify-center gap-y-3">
        <div className="flex flex-col lg:flex-row gap-x-7">
          {/* poster */}
          <ShowDetails />

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
