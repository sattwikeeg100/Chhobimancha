import React from "react";
import stageImg from "../../assets/theatreImages/stage1.jpg";
import exitGate from "../../assets/theatreImages/exit.png";
import bgtheatre from "../../assets/theatreImages/bgtheatre.jpg";

import bgleft from "../../assets/theatreImages/bgleft1.png";
import bgright from "../../assets/theatreImages/bgright1.png";

const bgStyle = {
  backgroundImage: `
    linear-gradient(to right, 
      rgba(0, 0, 0, 0.2), 
      rgba(0, 0, 0, 0.2)),
    url(${bgright}),
    url(${bgleft})`,
  backgroundSize: "22% 100%", // Each image takes 50% width and full height
  backgroundPosition: "left, right",
  backgroundRepeat: "no-repeat",
};

const rowToLetter = (row) => String.fromCharCode(64 + row); // Convert row number to letter

const BookYourSeat = ({
  selectedSeats,
  bookedSeats,
  handleSeatClick,
  handleBookNow,
  getSeatClass,
}) => {
  const rowLabels = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ];
  const rowHeights = [
    0, 36, 72, 108, 178, 214, 250, 286, 324, 360, 429, 461, 497,
  ];

  return (
    <div className="min-h-screen bg-cover bg-center" style={bgStyle}>
      <form className="flex flex-col items-center justify-center  ">
        <div className=" p-4 flex flex-col  rounded-xl items-center relative">
          {/* stage */}
          <div className="w-full lg:w-[85%] mt-4">
            <img src={stageImg} alt="Stage" />
          </div>
          <div className="flex flex-row items-center justify-center gap-x-10 w-full py-5">
            {/* left section */}
            <div className="relative cursor-pointer grid grid-cols-4 gap-2 gap-y-10 transform rotate-3 mb-2">
              {/* front */}

              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-4 gap-2">
                  {[...Array(4)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 1)}${
                      colIndex + 1
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                          seatId
                        )}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 1, colIndex + 1)
                        }
                      >
                        {colIndex + 1}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute top-[26rem] w-full h-[1px] bg-white"></div>
              <div className="absolute -top-[1.5rem] text-xs">
                <span className="text-primary_text font-semibold">
                  Front stall... Rs.500
                </span>
              </div>
              {/* Row labels */}
              {rowLabels.slice(0, 3).map((label, index) => (
                <div
                  key={label}
                  className="absolute -left-5 text-white"
                  style={{ top: rowHeights[index] }}
                >
                  {label}
                </div>
              ))}

              {/* rear */}

              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-6 gap-2">
                  {[...Array(6)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 5)}${
                      colIndex + 1
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                          seatId
                        )}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 5, colIndex + 1)
                        }
                      >
                        {colIndex + 1}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute top-[10.5rem] w-full h-[1px] bg-white"></div>
              <div className="absolute top-[9.5rem] text-xs">
                <span className="text-primary_text font-semibold">
                  Rear Stall...Rs.300
                </span>
              </div>
              {/* Row labels */}
              {rowLabels.slice(3, 9).map((label, index) => (
                <div
                  key={label}
                  className="absolute  -left-5 text-white "
                  style={{ top: rowHeights[index + 3] }}
                >
                  {label}
                </div>
              ))}

              {/* balcony */}

              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-3 gap-2">
                  {[...Array(3)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 11)}${
                      colIndex + 1
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                          seatId
                        )}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 11, colIndex + 1)
                        }
                      >
                        {colIndex + 1}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute -top-[0.5rem] w-full h-[1px] bg-white"></div>

              <div className="absolute top-[25rem] text-xs">
                <span className="text-primary_text font-semibold">
                  Balcony...Rs.200
                </span>
              </div>
              {/* row labels */}
              {rowLabels.slice(9).map((label, index) => (
                <div
                  key={label}
                  className="absolute  -left-5 text-white"
                  style={{ top: rowHeights[index + 9] }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Center section */}

            <div className="relative cursor-pointer grid grid-cols-10 gap-2 gap-y-10">
              {/* front */}

              {[...Array(10)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-4 gap-2">
                  {[...Array(4)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 1)}${
                      colIndex + 5
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                          seatId
                        )}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 1, colIndex + 5)
                        }
                      >
                        {colIndex + 5}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute top-[26rem] w-full h-[1px] bg-white"></div>
              <div className="absolute -top-[1.5rem] text-xs">
                <span className="text-primary_text font-semibold">
                  Front Stall...Rs.500
                </span>
              </div>

              {/* rear  */}
              {[...Array(10)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-6 gap-2">
                  {[...Array(6)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 5)}${
                      colIndex + 5
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                          seatId
                        )}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 5, colIndex + 5)
                        }
                      >
                        {colIndex + 5}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute top-[10.5rem] w-full h-[1px] bg-white"></div>
              <div className="absolute top-[9.5rem] text-xs">
                <span className="text-primary_text font-semibold">
                  Rear Stall...Rs.300
                </span>
              </div>

              {/* balcony */}

              {[...Array(10)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-3 gap-2">
                  {[...Array(3)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 11)}${
                      colIndex + 5
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                          seatId
                        )}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 11, colIndex + 5)
                        }
                      >
                        {colIndex + 5}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="absolute -top-[0.5rem] w-full h-[1px] bg-white"></div>
              <div className="absolute top-[25rem] text-xs">
                <span className="text-primary_text font-semibold">
                  Balcony... Rs.200
                </span>{" "}
              </div>
            </div>

            {/* right section */}
            <div className="relative cursor-pointer grid grid-cols-4 gap-2 gap-y-10 transform -rotate-3 mb-2">
              {/* front */}

              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-4 gap-2">
                  {[...Array(4)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 1)}${
                      colIndex + 15
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                          seatId
                        )}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 1, colIndex + 15)
                        }
                      >
                        {colIndex + 15}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Row labels */}
              {rowLabels.slice(0, 3).map((label, index) => (
                <div
                  key={label}
                  className="absolute -right-5 text-white"
                  style={{ top: rowHeights[index] }}
                >
                  {label}
                </div>
              ))}
              <div className="absolute top-[26rem] w-full h-[1px] bg-white"></div>
              <div className="absolute -top-[1.5rem] text-xs">
                <span className="text-primary_text font-semibold">
                  Front stall... Rs.500
                </span>
              </div>

              {/* rear */}
              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-6 gap-2">
                  {[...Array(6)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 5)}${
                      colIndex + 15
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                          seatId
                        )}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 5, colIndex + 15)
                        }
                      >
                        {colIndex + 15}
                      </div>
                    );
                  })}
                </div>
              ))}
              {/* Row labels */}
              {rowLabels.slice(3, 9).map((label, index) => (
                <div
                  key={label}
                  className="absolute -right-5 text-white"
                  style={{ top: rowHeights[index + 3] }}
                >
                  {label}
                </div>
              ))}
              <div className="absolute top-[10.5rem] w-full h-[1px] bg-white"></div>
              <div className="absolute top-[9.5rem] text-xs">
                <span className="text-primary_text font-semibold">
                  Rear Stall...Rs.300
                </span>
              </div>

              {/* balcony */}
              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="grid grid-rows-3 gap-2">
                  {[...Array(3)].map((_, rowIndex) => {
                    const seatId = `${rowToLetter(rowIndex + 11)}${
                      colIndex + 15
                    }`;
                    return (
                      <div
                        key={rowIndex}
                        className={`border-2 flex items-center justify-center border-black rounded-md w-7 h-7 ${getSeatClass(
                          seatId
                        )}`}
                        onClick={() =>
                          handleSeatClick(rowIndex + 11, colIndex + 15)
                        }
                      >
                        {colIndex + 15}
                      </div>
                    );
                  })}
                </div>
              ))}
              {/* row labels */}
              {rowLabels.slice(9).map((label, index) => (
                <div
                  key={label}
                  className="absolute -right-5 text-white"
                  style={{ top: rowHeights[index + 9] }}
                >
                  {label}
                </div>
              ))}
              <div className="absolute -top-[0.5rem] w-full h-[1px] bg-white"></div>
              <div className="absolute top-[25rem] text-xs">
                <span className="text-primary_text font-semibold">
                  Balcony...Rs.200
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className=" p-4 flex flex-row items-center justify-evenly w-full ">
          <div className="flex text-primary_text py-2 gap-x-2">
            <div className="border-highlight border-2 border-dashed text-white text-xl font-bold py-2 px-4 rounded-xl">
              Balcony - Rs.200
            </div>
            <div className="border-highlight border-2 border-dashed text-white text-xl font-bold py-2 px-4 rounded-xl">
              Rear Stall - Rs.300
            </div>
            <div className="border-highlight border-2 border-dashed text-white text-xl font-bold py-2 px-4 rounded-xl">
              Front Stall - Rs.500
            </div>
          </div>
          {/* book now button */}
          <button
            onClick={handleBookNow}
            type="button"
            className=" bg-highlight hover:bg-highlight_hover text-white text-xl font-bold py-2 px-6 rounded-xl"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookYourSeat;
