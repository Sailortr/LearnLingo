import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const bookingReasons = [
  { id: "career", label: "Career and business" },
  { id: "kids", label: "Lesson for kids" },
  { id: "abroad", label: "Living abroad" },
  { id: "exams", label: "Exams and coursework" },
  { id: "culture", label: "Culture, travel or hobby" },
];

const bookingSchema = yup.object().shape({
  reason: yup.string().required("Lütfen bir öğrenme nedeni seçin."),
  fullName: yup.string().required("Tam ad alanı zorunludur."),
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi girin.")
    .required("E-posta alanı zorunludur."),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Sadece rakam girilmelidir.")
    .min(10, "Telefon numarası en az 10 haneli olmalıdır.")
    .required("Telefon numarası zorunludur."),
});

const BookingForm = ({ onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
  });

  const handleBookingSubmit = (data) => {
    console.log("Booking Data:", data);
    if (onSubmitSuccess) onSubmitSuccess(data); 
  };

  return (
    <form onSubmit={handleSubmit(handleBookingSubmit)} className="space-y-6">
      <fieldset>
        <legend className="text-base font-medium text-gray-900 mb-2">
          What is your main reason for learning English?
        </legend>
        <div className="space-y-2">
          {bookingReasons.map((reason) => (
            <div key={reason.id} className="flex items-center">
              <input
                id={`reason-${reason.id}`}
                type="radio"
                value={reason.label}
                {...register("reason")}
                className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300"
              />
              <label
                htmlFor={`reason-${reason.id}`}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {reason.label}
              </label>
            </div>
          ))}
        </div>
        {errors.reason && (
          <p className="mt-2 text-sm text-red-600">{errors.reason.message}</p>
        )}
      </fieldset>

      <div>
        <label
          htmlFor="fullNameBooking"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          id="fullNameBooking"
          type="text"
          {...register("fullName")}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
        />
        {errors.fullName && (
          <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="emailBooking"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="emailBooking"
          type="email"
          {...register("email")}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phoneBooking"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          id="phoneBooking"
          type="tel"
          {...register("phone")}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.phone ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
        />
        {errors.phone && (
          <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
        >
          Book
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
