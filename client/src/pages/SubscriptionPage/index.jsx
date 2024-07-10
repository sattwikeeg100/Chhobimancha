import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../config/axiosInstance.js";
import { updateUser } from "../../store/slices/userSlice.js";
import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice.js";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "sonner";

const SubscriptionPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [submitting, setSubmitting] = useState(false);

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
                `/users/buy-subscription`,
                {
                    plan_id: razorpayPlan,
                    customer_notify: 1,
                }
            );

            const subscription = response.data;
            console.log(subscription);

            const options = {
                key: razorpayKey,
                subscription_id: subscription.id,
                name: "Chhobimancha Premium",
                image: "https://i.ibb.co/B62hf01/chobimancha-logo.jpg", // TODO: Our logo url
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
        window.confirm("Are you sure you want to cancel your subscription?");

        try {
            const response = await axiosInstance.post(
                `/users/cancel-subscription`,
                {
                    subscription_id: user.subscriptionId,
                }
            );
            const cancellation = response.data;
            dispatch(
                updateUser({ isSubscriber: false, subscriptionId: "" })
            ).then(() => {
                alert("Subscription cancelled successfully!");
            });
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
        <div className="min-h-screen py-12 bg-background1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-background2 text-primary_text shadow-xl rounded-lg p-8">
                    <h2 className="text-3xl font-montserrat font-bold text-center">
                        Subscribe Now
                    </h2>
                    <p className="mt-4 text-center text-secondary_text">
                        Enjoy unlimited access to our collection of Bengali
                        movies by subscribing for just ₹50 per month.
                    </p>

                    <div className="mt-8">
                        <h3 className="text-2xl font-montserrat font-semibold text-primary_text">
                            Why Subscribe?
                        </h3>
                        <ul className="mt-4 space-y-2 text-secondary_text">
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
                        <h3 className="text-2xl font-montserrat font-semibold text-primary_text">
                            Testimonials
                        </h3>
                        <div className="mt-4 space-y-4">
                            <div className="bg-background1 p-4 rounded-lg shadow-md">
                                <p className="text-secondary_text">
                                    "This is the best platform for Bengali
                                    movies. The subscription is totally worth
                                    it!"
                                </p>
                                <p className="mt-2 text-sm text-secondary_text">
                                    - Chandrima
                                </p>
                            </div>
                            <div className="bg-background1 p-4 rounded-lg shadow-md">
                                <p className="text-secondary_text">
                                    "I love the collection and the quality of
                                    streaming is excellent."
                                </p>
                                <p className="mt-2 text-sm text-secondary_text">
                                    - Roshan
                                </p>
                            </div>
                            <div className="bg-background1 p-4 rounded-lg shadow-md">
                                <p class="text-secondary_text">
                                    "Finally, a streaming platform that
                                    understands Bengali cinema! The curation is
                                    fantastic, and I've discovered so many
                                    hidden gems."
                                </p>
                                <p class="mt-2 text-sm text-secondary_text">
                                    - Pratik
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-montserrat font-semibold text-primary_text">
                            Frequently Asked Questions
                        </h3>
                        <div className="mt-4 space-y-4">
                            <div className="bg-background1 p-4 rounded-lg shadow-md">
                                <h4 className="text-primary_text font-medium">
                                    How much does the subscription cost?
                                </h4>
                                <p className="text-secondary_text">
                                    The subscription costs ₹50 per month.
                                </p>
                            </div>
                            <div className="bg-background1 p-4 rounded-lg shadow-md">
                                <h4 className="text-primary_text font-medium">
                                    Can I cancel my subscription?
                                </h4>
                                <p className="text-secondary_text">
                                    Yes, you can cancel your subscription
                                    anytime you want.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        {!user || !user.isSubscriber ? (
                            <button
                                onClick={handlePayment}
                                className="inline-block bg-highlight hover:bg-highlight_hover text-primary_text tracking-widest font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                                Buy Subscription
                            </button>
                        ) : (
                            <>
                                <p className="mb-2 font-roboto tracking-widest text-primary_text">
                                    You are already a subscriber!
                                </p>
                                <button
                                    onClick={handleCancelSubscription}
                                    className="inline-block bg-red-900 hover:bg-red-700 text-primary_text tracking-widest font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                                    <p className="flex flex-row gap-2">
                                        <MdOutlineCancel size={20} className="mt-0.5"/>
                                        Cancel Subscription
                                    </p>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="App">
                {!showModal && (
                    <button
                        className="fixed right-4 bottom-1/2 transform translate-y-1/2 rotate-90 bg-highlight hover:bg-highlight_hover text-primary_text tracking-widest font-semibold py-2 px-4 rounded-xl transition-all duration-300"
                        onClick={() => setShowModal(true)}>
                        Give Feedback
                    </button>
                )}

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                        <div className="bg-background2 text-primary_text rounded-lg p-6 w-full max-w-lg shadow-lg transform transition-all duration-300 scale-105">
                            <h2 className="text-2xl font-montserrat font-bold mb-4">
                                Feedback
                            </h2>
                            <form onSubmit={handleSubmit}>
                                {!user && (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-secondary_text text-sm font-bold mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleFeedbackChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 bg-background1 text-primary_text leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-secondary_text text-sm font-bold mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleFeedbackChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 bg-background1 text-primary_text leading-tight focus:outline-none focus:shadow-outline"
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="mb-4">
                                    <label className="block text-secondary_text text-sm font-bold mb-2">
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
                                                            ? "border border-highlight"
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
                                    <label className="block text-secondary_text text-sm font-bold mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="feedback"
                                        value={formData.feedback}
                                        onChange={handleFeedbackChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-background1 text-primary_text leading-tight focus:outline-none focus:shadow-outline"
                                        required></textarea>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-primary_text py-2 px-4 rounded-lg mr-2 transition-all duration-300"
                                        onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    {submitting ? (
                                        <button
                                            type="submit"
                                            className="bg-blue-400 text-primary_text py-2 px-4 rounded-lg cursor-not-allowed transition-all duration-300">
                                            Submitting...
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="bg-highlight hover:bg-highlight_hover text-primary_text py-2 px-4 rounded-lg transition-all duration-300">
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
