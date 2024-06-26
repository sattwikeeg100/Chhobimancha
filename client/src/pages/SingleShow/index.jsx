import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PaymentPopup from "./PaymentPopup";
import BookYourSeat from "./BookYourSeat";
import ShowDetails from "./ShowDetails";
import { useDispatch, useSelector } from "react-redux";
import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice";
import axiosInstance from "../../config/axiosInstance";
import logo from "/logo.jpg";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SingleShow = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
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
        if (!show.bookedSeats.includes(seatId)) {
            if (!selectedSeats.includes(seatId)) {
                setSelectedSeats([...selectedSeats, seatId]);
            } else {
                const updatedSeats = selectedSeats.filter(
                    (seat) => seat !== seatId
                );
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
                    [
                        "Show Date",
                        new Date(booking.show.date).toLocaleDateString(),
                    ],
                    ["Show Time", booking.show.time],
                    ["Theatre Name", booking.show.theatre.name],
                    ["Theatre Address", booking.show.theatre.address],
                    ["Booked Seats", booking.seats.join(", ")],
                    [
                        "Total Amount",
                        `$${(booking.totalAmount / 100).toFixed(2)}`,
                    ],
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
                            const pdfBlob = await generateBookingPDF(
                                booking
                            );

                            try {
                                await axiosInstance.post(
                                    "/bookings/send-email",
                                    {
                                        name: user.name,
                                        email: user.email,
                                        pdfBlob,
                                        showTitle: booking.show.title,
                                    }
                                );
                                setEmailSuccessPopup(true);
                            } catch (err) {
                                console.error(err);
                                alert(
                                    "Failed to send ticket !"
                                );
                            }
                            setShowPopup(true);
                        } catch (error) {
                            console.error("Error saving booking", error);
                            alert(
                                "Payment successful but booking could not be saved."
                            );
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
        <section className="p-5 bg-background1">
            <div className="flex flex-col items-center justify-center gap-y-3">
                <div className="flex flex-col lg:flex-row gap-x-7">
                    <ShowDetails show={show} />
                    <BookYourSeat
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                        handleBookNow={handleBookNow}
                        getSeatClass={getSeatClass}
                    />
                </div>
            </div>
            {showPopup && (
                <PaymentPopup
                    handleClosePopup={handleClosePopup}
                    bookedSeat={selectedSeats}
                    emailSuccessPopup={emailSuccessPopup}
                />
            )}
            <div className="text-3xl text-white">About the play</div>
            <div className="text-3xl text-white">Cast</div>
            <div className="text-3xl text-white">Crew</div>
        </section>
    );
};

export default SingleShow;
