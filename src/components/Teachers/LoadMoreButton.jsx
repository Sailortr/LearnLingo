import React from "react";

const LoadMoreButton = ({ onClick, isLoading, hasMore }) => {
  if (!hasMore && !isLoading) {
    return (
      <p className="text-center text-gray-500 py-4">
        No more teachers to load.
      </p>
    );
  }

  return (
    <div className="text-center py-6">
      <button
        onClick={onClick}
        disabled={isLoading || !hasMore}
        className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </div>
        ) : (
          "Load More"
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;
