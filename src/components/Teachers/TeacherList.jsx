import React from "react";
import TeacherCard from "./TeacherCard";

const TeacherList = ({
  teachers,
  favoriteStatus = {},
  onToggleFavorite,
  onBookLesson,
}) => {
  if (!teachers || teachers.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">No teachers found.</p>
    );
  }

  return (
    <div className="space-y-6">
      {teachers.map((teacher) => (
        <TeacherCard
          key={teacher.id}
          teacher={teacher}
          isFavorite={favoriteStatus[teacher.id] || false}
          onToggleFavorite={onToggleFavorite}
          onBookLesson={onBookLesson}
        />
      ))}
    </div>
  );
};

export default TeacherList;
