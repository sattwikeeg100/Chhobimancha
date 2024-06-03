import React, { useState } from "react";

const SingleShow = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [bookedSeat, setBookedSeat] = useState(null);

  const handleSeatClick = (row, col) => {
    if (!selectedSeats.includes(`${row}${col}`)) {
      setSelectedSeats([...selectedSeats, `${row}${col}`]);
    } else {
      const updatedSeats = selectedSeats.filter(
        (seat) => seat !== `${row}${col}`
      );
      setSelectedSeats(updatedSeats);
    }
    // Handle seat selection here
  };

  const handleBookNow = () => {
    if (selectedSeats.length > 0) {
      setBookedSeat(selectedSeats[0]);
      setShowPopup(true);
    }
    // Handle booking logic here
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedSeats([]);
    setShowPopup(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seat Booking</h1>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 10 }, (_, row) => (
            <React.Fragment key={row}>
              {Array.from({ length: 10 }, (_, col) => {
                const seatNumber = row * 10 + col + 1;
                const isSelected = selectedSeats.includes(seatNumber);
                const isBooked = bookedSeat === seatNumber;
                return (
                  <div
                    key={col}
                    className={`border border-gray-400 w-10 h-10 flex items-center justify-center m-1 ${
                      isSelected
                        ? "bg-black"
                        : isBooked
                        ? "bg-gray-600"
                        : "bg-white"
                    } cursor-pointer`}
                    onClick={() => handleSeatClick(row, col)}
                  >
                    <span className={`${isSelected && "text-white"}`}>
                      {seatNumber}
                    </span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
        <button
          onClick={handleBookNow}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Book Now
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <p className="text-lg font-semibold mb-2">Seat Booked!</p>
            <p>Seat {bookedSeat} has been successfully booked.</p>
            <button
              onClick={handleClosePopup}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleShow;
