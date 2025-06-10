import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={i <= rating ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={i <= rating ? 0 : 1.5}
        className={`w-4 h-4 ${
          i <= rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 14.248l-4.949 2.826 1.105-5.49L2 7.583l5.48-.47L10 2l2.52 5.113 5.48.47-4.156 4.001 1.105 5.49L10 14.248z"
        />
      </svg>
    );
  }
  return <div className="flex items-center">{stars}</div>;
};

const ReviewItem = ({ review }) => {
  const reviewerInitials = review.reviewer_name
    ? review.reviewer_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="py-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
          {reviewerInitials}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-semibold text-gray-800">
              {review.reviewer_name}
            </h4>
            <StarRating rating={review.reviewer_rating} />
          </div>
          <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
