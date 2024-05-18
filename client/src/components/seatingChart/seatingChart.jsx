// SeatingChart.jsx
import React, { useState } from "react";
import "./style.scss";

const SeatingChart = () => {
    const rows = 5;
    const seatsPerRow = 10;

    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (row, seat) => {
        const seatId = `${row}-${seat}`;
        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((s) => s !== seatId)
                : [...prev, seatId]
        );
    };

    return (
        <div className="seating-chart">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="row">
                    {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                        const seatId = `${rowIndex}-${seatIndex}`;
                        const isSelected = selectedSeats.includes(seatId);

                        return (
                            <div
                                key={seatIndex}
                                className={`seat ${
                                    isSelected ? "selected" : ""
                                }`}
                                onClick={() =>
                                    handleSeatClick(rowIndex, seatIndex)
                                }>
                                {seatIndex + 1}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default SeatingChart;
