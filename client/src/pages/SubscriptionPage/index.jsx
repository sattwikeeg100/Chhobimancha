import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../config/axiosInstance.js";
import { updateUser } from "../../store/slices/userSlice.js";
import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice.js";
import { toast } from "sonner";

const SubscriptionPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const APIURL = import.meta.env.VITE_API_URL;
    const dispatch = useDispatch();
    const FEEDBACK_URL = import.meta.env.VITE_GOOGLE_WEB_APP_URL;

    const user = useSelector((state) => state.user.userInfo);

    const handlePayment = async () => {
        if (!user) {
            dispatch(switchLoginModalOpen(true));
            return;
        }

        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
        const razorpayPlan = import.meta.env.VITE_RAZORPAY_PLAN_ID;
        try {
            const response = await axiosInstance.post(
                `${APIURL}/users/buy-subscription`,
                {
                    plan_id: razorpayPlan,
                    customer_notify: 1, // Send notification to the customer
                }
            );

            const subscription = response.data;
            console.log(subscription);

            const options = {
                key: razorpayKey,
                subscription_id: subscription.id,
                name: "Showtime360 Premium",
                description: "Subscription for enjoying unlimited movies",
                handler: function (response) {
                    dispatch(
                        updateUser({
                            isSubscriber: true,
                            subscriptionId: subscription.id,
                        })
                    ).then(() => {
                        alert("Payment Successful and Subscription Activated!");
                    });
                    console.log(response);
                },
                modal: {
                    ondismiss: function () {
                        console.log("Modal closed by user");
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error creating subscription:", error);
            alert("Error creating subscription. Please try again.");
        }
    };

    const handleCancelSubscription = async () => {
        try {
            if (true) {
                dispatch(
                    updateUser({ isSubscriber: false, subscriptionId: "" })
                ).then(() => {
                    alert("Subscription cancelled successfully!");
                });
            } else {
                alert("Failed to cancel subscription. Please try again.");
            }

            const response = await axiosInstance.post(
                `${APIURL}/users/cancel-subscription`,
                {
                    subscription_id: user.subscriptionId,
                }
            );

            const cancellation = response.data;
            console.log(cancellation);

            /*             if (true) {
                console.log("HULLLAAAAA")
                dispatch(
                    updateUser({ isSubscriber: false, subscriptionId: "" })
                ).then(() => {
                    alert("Subscription cancelled successfully!");
                });
            } else {
                alert("Failed to cancel subscription. Please try again.");
            } */
        } catch (error) {
            console.error("Error cancelling subscription:", error);
            alert("Error cancelling subscription. Please try again.");
        }
    };

    const handleFeedbackChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEmojiClick = (emoji) => {
        setFormData({ ...formData, experience: emoji });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const currTimestamp = new Date();
        let feedbackData;
        if (user) {
            feedbackData = {
                ...formData,
                name: user.name,
                email: user.email,
                time: currTimestamp,
            };
        } else {
            feedbackData = { ...formData, time: currTimestamp };
        }

        console.log({ ...formData, time: currTimestamp });
        try {
            const response = await fetch(FEEDBACK_URL, {
                method: "POST",
                body: JSON.stringify(feedbackData),
            });
            const result = await response.json();
            if (result.status === "success") {
                toast.success("Feedback submitted successfully!");
                setSubmitting(false);
                setShowModal(false);
                setFormData({});
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast.error("Failed to submit feedback. Please try again.");
        }
    };
    console.log(formData);

    return (
        <div className="min-h-screen  py-12 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" bg-slate-100 shadow-xl rounded-lg p-8">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900">
                        Subscribe Now
                    </h2>
                    <p className="mt-4 text-center text-gray-600">
                        Enjoy unlimited access to our collection of Bengali
                        movies by subscribing for just ₹50 per month.
                    </p>

                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-gray-800 font-serif ">
                            Why Subscribe?
                        </h3>
                        <ul className="mt-4 space-y-2 text-gray-700">
                            <li>• Unlimited access to all movies</li>
                            <li>
                                • Exclusive content available only to
                                subscribers
                            </li>
                            <li>• High-definition streaming</li>
                            <li>• No advertisements</li>
                            <li>• New movies added every week</li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-gray-800 font-serif ">
                            Testimonials
                        </h3>
                        <div className="mt-4 space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <p className="text-gray-700">
                                    "This is the best platform for Bengali
                                    movies. The subscription is totally worth
                                    it!"
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    - Chandrima
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <p className="text-gray-700">
                                    "I love the collection and the quality of
                                    streaming is excellent."
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    - Roshan
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-gray-800 font-serif ">
                            Frequently Asked Questions
                        </h3>
                        <div className="mt-4 space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <h4 className="text-gray-800 font-medium">
                                    How much does the subscription cost?
                                </h4>
                                <p className="text-gray-600">
                                    The subscription costs ₹50 per month.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                                <h4 className="text-gray-800 font-medium">
                                    Can I cancel my subscription?
                                </h4>
                                <p className="text-gray-600">
                                    Yes, you can cancel your subscription
                                    anytime from your account settings.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        {!user || !user.isSubscriber ? (
                            <button
                                onClick={handlePayment}
                                className="inline-block bg-indigo-900 hover:bg-blue-700 text-white tracking-widest font-semibold py-3 px-6 rounded-lg">
                                Buy Subscription
                            </button>
                        ) : (
                            <>
                                <p className="mb-2 font-medium font-roboto tracking-widest">
                                    You are already a subscriber!
                                </p>
                                <button
                                    onClick={handleCancelSubscription}
                                    className="inline-block bg-rose-700 hover:bg-red-800 text-white font-semibold tracking-widest py-3 px-6 rounded-lg">
                                    Cancel Subscription
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="App">
                <button
                    className="fixed right-0 bottom-1/2  rotate-90 bg-indigo-600 hover:bg-blue-700 text-gray-200 tracking-widest font-semibold py-2 px-4 rounded-xl cursor-pointer"
                    onClick={() => setShowModal(true)}>
                    Give feedback
                </button>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                            <h2 className="text-2xl mb-4">Feedback</h2>
                            <form onSubmit={handleSubmit}>
                                {!user && (
                                    <>
                                        <div className="mb-4">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="email">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleFeedbackChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="email">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleFeedbackChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="experience">
                                        Rate your experience
                                    </label>
                                    <div className="flex space-x-2">
                                        {["😃", "😊", "😐", "☹️", "😠"].map(
                                            (emoji) => (
                                                <button
                                                    type="button"
                                                    key={emoji}
                                                    className={`text-2xl ${
                                                        formData.experience ===
                                                        emoji
                                                            ? "border border-blue-500"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleEmojiClick(emoji)
                                                    }>
                                                    {emoji}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="message">
                                        Message
                                    </label>
                                    <textarea
                                        name="feedback"
                                        value={formData.feedback}
                                        onChange={handleFeedbackChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required></textarea>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
                                        onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    {submitting ? (
                                        <button
                                            type="submit"
                                            className="bg-blue-400 text-white py-2 px-4 rounded-lg cursor-not-allowed">
                                            Submitting...
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionPage;
