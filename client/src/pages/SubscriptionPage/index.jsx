import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../config/axiosInstance.js";
import { updateUser } from "../../store/slices/userSlice.js";

const SubscriptionPage = () => {
    const APIURL = import.meta.env.VITE_API_URL;
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);

    const handlePayment = async () => {
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

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-xl rounded-lg p-8">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900">
                        Subscribe Now
                    </h2>
                    <p className="mt-4 text-center text-gray-600">
                        Enjoy unlimited access to our collection of Bengali
                        movies by subscribing for just ₹50 per month.
                    </p>

                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-gray-800">
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
                        <h3 className="text-2xl font-semibold text-gray-800">
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
                        <h3 className="text-2xl font-semibold text-gray-800">
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
                                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                                Buy Subscription
                            </button>
                        ) : (
                            <>
                                <p className="mb-2 font-medium">
                                    You are already a subscriber!
                                </p>
                                <button
                                    onClick={handleCancelSubscription}
                                    className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg">
                                    Cancel Subscription
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
