// src/components/Teachers/TeacherCard.jsx

import React, { useState } from "react";
import ReviewItem from "./ReviewItem";

// ... İkonlarınız aynı kalabilir ...
const BookOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6-2.292m0 0V3.75m0 12.552a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6.75A2.25 2.25 0 0 1 6 4.5h3.75a2.25 2.25 0 0 1 2.25 2.25v11.802Z"
    />
  </svg>
);
const StarIconSolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5 text-yellow-400"
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.39-3.423 3.338.95 4.872 4.258-2.28 4.258 2.28.95-4.872-3.423-3.338-4.753-.39-1.83-4.401Z"
      clipRule="evenodd"
    />
  </svg>
);

const HeartIcon = ({ isFavorite }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isFavorite ? "#FBCB09" : "none"}
    stroke="currentColor"
    strokeWidth={1.5}
    className={`w-6 h-6 cursor-pointer transition-colors ${
      isFavorite ? "text-yellow-400" : "text-gray-800 hover:text-yellow-400"
    }`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);

const TeacherCard = ({
  teacher,
  isFavorite,
  onToggleFavorite,
  onBookLesson,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  if (!teacher) return null;
  const fullName = `${teacher.name} ${teacher.surname}`;

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 mb-8 transition-shadow duration-300 hover:shadow-lg">
      {/* --- YERLEŞİM HATASI DÜZELTİLDİ: md:flex-row olmalı --- */}
      <div className="flex flex-row md:flex-col gap-8">
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <div className="relative w-28 h-28">
            <div className="p-1 rounded-full bg-white border-2 border-yellow-400/50">
              <img
                src={
                  teacher.avatar_url ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    fullName
                  )}&background=FBBF24&color=fff&size=128`
                }
                alt={fullName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>
        {/* ... Geri kalan kod aynı ... */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Languages</p>
              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                {fullName}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-base text-gray-800 font-medium">
              <div className="flex items-center gap-2">
                {" "}
                <BookOpenIcon /> <span>Lessons online</span>{" "}
              </div>
              <div className="hidden sm:block">
                {" "}
                Lessons done: {teacher.lessons_done}{" "}
              </div>
              <div className="flex items-center gap-2">
                {" "}
                <StarIconSolid /> <span>Rating: {teacher.rating}</span>{" "}
              </div>
              <p>
                {" "}
                Price / 1 hour:{" "}
                <span className="text-green-600 font-semibold ml-1">
                  {teacher.price_per_hour}$
                </span>{" "}
              </p>
              <button
                onClick={() => onToggleFavorite && onToggleFavorite(teacher.id)}
                aria-label="Toggle Favorite"
              >
                <HeartIcon isFavorite={isFavorite} />
              </button>
            </div>
          </div>
          <div className="space-y-2 my-6">
            <p className="text-base">
              <span className="font-medium text-gray-500">Speaks:</span>{" "}
              <span className="text-gray-800 underline">
                {teacher.languages?.join(", ")}
              </span>
            </p>
            <p className="text-base">
              <span className="font-medium text-gray-500">Lesson Info:</span>{" "}
              <span className="text-gray-800">{teacher.lesson_info}</span>
            </p>
            <p className="text-base">
              <p className="text-base">
                <span className="font-medium text-gray-500">Conditions:</span>{" "}
                <span className="text-gray-800">
                  {teacher.conditions.join(" ")}
                </span>
              </p>
            </p>
          </div>
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="text-base font-bold text-gray-800 underline hover:text-yellow-600 mb-6"
          >
            {isDetailsOpen ? "Hide more" : "Read more"}
          </button>
          {isDetailsOpen && (
            <div className="border-t border-gray-100 pt-6 mt-6">
              <p className="text-gray-700">{teacher.experience}</p>
              {teacher.reviews?.map((review, index) => (
                <ReviewItem key={index} review={review} />
              ))}
              <button
                onClick={() => onBookLesson && onBookLesson(teacher)}
                className="mt-4 px-10 py-4 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-500 transition-colors"
              >
                {" "}
                Book trial lesson{" "}
              </button>
            </div>
          )}
          {teacher.levels?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {teacher.levels.map((level, index) => (
                <span
                  key={level}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium border ${
                    index === 0
                      ? "bg-yellow-400 border-yellow-400"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <span className="opacity-60 mr-0.5">#</span>
                  {level}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
