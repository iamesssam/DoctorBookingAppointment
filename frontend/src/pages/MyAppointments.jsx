import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
// import { doctors } from '../assets/assets'
import { toast } from "sonner";
import axios from "axios";

// 🟢 الـ Imports الخاصة بمكتبة Stripe جوة الـ React
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const { doctors, token, getDoctorsData } = useContext(AppContext);
    const stripe = useStripe();
    // const stripe = useStripe();
    const elements = useElements();


    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/user/myAppointments",
                {
                    headers: { "token": token }
                }
            )

            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error("No appointments found");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post("http://localhost:4000/api/user/cancelAppointment",
                { appointmentId },
                { headers: { "token": token } }
            )

            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
                getDoctorsData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    // const initStripePay = async (order) => {
    //     // نتأكد إن مكتبة سترايب والـ عناصر جاهزة
    //     if (!stripe || !elements) {
    //         toast.error("Stripe is not fully loaded yet.");
    //         return;
    //     }

    //     try {
    //         // بنجيب الكارت اللي اليوزر كتب بياناته في الـ UI
    //         const cardElement = elements.getElement(CardElement);

    //         // تأكيد الدفع مع سيرفر سترايب مباشرة باستخدام الـ client_secret اللي جوة الـ order
    //         const { paymentIntent, error } = await stripe.confirmCardPayment(order.client_secret, {
    //             payment_method: {
    //                 card: cardElement,
    //             }
    //         });

    //         // لو سترايب رجع خطأ في الفيزا (مثلاً الرصيد مش كفاية أو الكارت غلط)
    //         if (error) {
    //             toast.error(error.message);
    //             return;
    //         }

    //         // 🟢 لو عملية الدفع نجحت مع سترايب (succeeded)
    //         if (paymentIntent && paymentIntent.status === "succeeded") {

    //             // بنروح فوراً نبلغ الباك إند بتاعنا عشان يحدّث الداتابيز لـ payment: true
    //             const { data } = await axios.post(
    //                 "http://localhost:4000/api/user/verifyPayment", // تأكد إن ده نفس الروت في الباك إند
    //                 {
    //                     appointmentId: order.metadata.receipt, // قرينا الـ ID اللي خزناه في الـ metadata بالباك إند
    //                     paymentIntentId: paymentIntent.id     // الـ ID بتاع العملية من سترايب
    //                 },
    //                 { headers: { "token": token } }
    //             );

    //             if (data.success) {
    //                 toast.success("Payment Successful ✅");
    //                 // setShowPaymentModal(false); // لو عامل Modal اقفله هنا
    //                 getUserAppointments();     // اعمل ريفرش للمواعيد عشان تظهر Paid
    //             } else {
    //                 toast.error(data.message);
    //             }
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.message);
    //     }
    // }





    // const initPay = (order) => {
    //     const options = {
    //         key: "",
    //         amount: order.amount,
    //         currency: order.currency,
    //         name: "Appointment Payment",
    //         description: "Appointment Payment",
    //         order_id: order.id,
    //         receipt: order.receipt,
    //         handler: async (response) => {
    //             console.log(response);

    //             try {
    //                 const { data } = await axios.post("http://localhost:4000/api/user/verifyPayment",
    //                     response, {
    //                     headers: { "token": token }
    //                 }
    //                 )
    //             } catch (error) {

    //             }
    //         }
    //     }

    //     const rzp = new window.Stripe(options);
    //     rzp.open();
    // }


    // const appointmentStripe = async (appointmentId) => {

    //     try {
    //         const { data } = await axios.post("http://localhost:4000/api/user/stripePayment",
    //             { appointmentId },
    //             { headers: { "token": token } }
    //         )
    //         if (data.success) {
    //             // console.log(data.order);
    //             initStripePay(data.order);
    //         }
    //     } catch (error) {

    //     }
    // }

    //////////////////////////////////////////// this works//////////////////////////


    // const appointmentStripe = async (appointmentId) => {
    //     try {
    //         const { data } = await axios.post("http://localhost:4000/api/user/stripePayment",
    //             { appointmentId },
    //             { headers: { "token": token } }
    //         )
    //         if (data.success) {
    //             setCurrentOrder(data.order); // حفظ بيانات العملية
    //             setShowPaymentModal(true);   // فتح نافذة الدفع
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    //////////////////////////////////////////// this works//////////////////////////


    // 3️⃣ دالة الدفع (مطابقة ومناسبة للـ client_secret اللي طالع من الباك إند عندك)
    const appointmentStripe = async (appointmentId) => {
        try {
            if (!stripe) {
                toast.error("Stripe is not fully loaded yet.");
                return;
            }

            // طلب عملية الدفع من الباك إند
            const { data } = await axios.post("http://localhost:4000/api/user/stripePayment",
                { appointmentId },
                { headers: { "token": token } }
            );

            if (data.success) {
                setCurrentOrder(data.order);
                setShowPaymentModal(true);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("حدث خطأ أثناء معالجة الدفع");
        }
    };
    const handleModalSubmit = async (e) => {
        e.preventDefault();

        // التأكد إن سترايب والبيانات جاهزة
        if (!stripe || !elements || !currentOrder) {
            toast.error("Stripe is not fully loaded yet.");
            return;
        }

        setIsProcessing(true);

        try {
            // 1️⃣ هنا بنجيب بيانات الكارت اللي اليوزر كتبها في الـ CardElement
            const cardElement = elements.getElement(CardElement);

            // 2️⃣ تأكيد عملية الدفع وتمرير بيانات الكارت لحل مشكلة الـ Missing param
            const { paymentIntent, error } = await stripe.confirmCardPayment(currentOrder.client_secret, {
                payment_method: {
                    card: cardElement, // 🟢 الكارت الفعلي بعد ما قرأناه
                }
            });

            if (error) {
                toast.error(error.message);
                setIsProcessing(false);
                return;
            }

            // 3️⃣ لو الدفع نجح بنروح نعمل verify في الباك إند
            if (paymentIntent && paymentIntent.status === "succeeded") {
                const { data } = await axios.post("http://localhost:4000/api/user/verifyPayment",
                    {
                        appointmentId: currentOrder.metadata.receipt, // قراءة الـ ID من الميتاداتا
                        paymentIntentId: paymentIntent.id
                    },
                    { headers: { "token": token } }
                );

                if (data.success) {
                    toast.success("Payment Successful ✅");
                    setShowPaymentModal(false); // اقفل المودال
                    setCurrentOrder(null);      // صفر الأوردر الحالي
                    getUserAppointments();      // ريفرش للمواعيد عشان تظهر Paid
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "حدث خطأ أثناء معالجة الدفع");
        } finally {
            setIsProcessing(false);
        }
    };





    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token])


    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
            <div>
                {appointments.map((item, index) => (
                    <div
                        className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
                        key={index}>
                        <div>
                            <img src={item.docData.image} alt="" className='w-32 bg-indigo-50' />
                        </div>
                        <div className='flex-1 text-sm text-zinc-600'>
                            <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                            <p>{item.speciality}</p>
                            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                            <p className='text-xs'>{item.docData.address.line1}</p>
                            <p className='text-xs'>{item.docData.address.line2}</p>
                            <p className='text-xs mt-1'><span
                                className='text-sm text-neutral-700 font-medium'
                            >Date & Time: {item.slotDate} | {item.slotTime}</span></p>
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-2 justify-end'>
                            {!item.payment && !item.cancelled &&
                                <button className='text-sm text-stone-500 text-center
                            sm:min-w-48 py-2 border
                            hover:bg-[#5f6FFF] hover:text-white transition-all duration-300
                            cursor-pointer 
                            '
                                    onClick={() => appointmentStripe(item._id)}
                                >Pay Online</button>
                            }
                            {
                                item.payment
                                &&
                                !item.cancelled &&
                                <button className='sm:min-w-48  rounded text-stone-500
                                bg-indigo-50 py-2
                                '>
                                    Paid
                                </button>
                            }
                            {!item.cancelled
                                &&
                                <button
                                    className='text-sm text-stone-500 text-center
                            sm:min-w-48 py-2 border
                            hover:bg-red-600 hover:text-white transition-all duration-300
                            cursor-pointer
                            '
                                    onClick={() => cancelAppointment(item._id)}
                                >Cancel appointment</button>
                            }
                            {item.cancelled &&
                                <button className='sm:min-w-48 py-2 border border-red-500 
                                rounded text-red-500
                                '>
                                    Appointment cancelled</button>}
                        </div>
                    </div>
                ))}
            </div>

            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
                        <h3 className="text-lg font-semibold text-zinc-800 mb-4">Enter Card Details</h3>

                        <form onSubmit={handleModalSubmit}>
                            {/* هنا الكومبوننت الحقيقي بتاع سترايب اللي كان ناقص */}
                            <div className="border p-3 rounded-md bg-zinc-50 mb-4">
                                <CardElement options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': { color: '#aab7c4' },
                                        },
                                        invalid: { color: '#9e2146' },
                                    },
                                }} />
                            </div>

                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={() => { setShowPaymentModal(false); setCurrentOrder(null); }}
                                    className="px-4 py-2 border rounded text-zinc-600 hover:bg-zinc-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-zinc-400"
                                >
                                    {isProcessing ? "Processing..." : "Confirm Payment"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyAppointments
