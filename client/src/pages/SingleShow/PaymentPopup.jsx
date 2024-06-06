import React from "react";

const PaymentPopup = ({ bookedSeat, handleClosePopup }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Seat Booked</h2>
        <p>Seat {bookedSeat} has been booked successfully!</p>
        <button
          onClick={handleClosePopup}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentPopup;
