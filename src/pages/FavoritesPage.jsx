import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { getTeachersByIds } from "../services/teacherService";
import TeacherList from "../components/Teachers/TeacherList";
import BookingModal from "../components/Booking/BookingModal";
import Spinner from "../components/UI/Spinner";

const FavoritesPage = () => {
  const { currentUser } = useAuth();
  const { favoriteTeacherIds, removeFavoriteTeacher, isLoadingFavorites } =
    useFavorites();
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] =
    useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchFavoriteTeacherDetails = async () => {
      if (!currentUser || favoriteTeacherIds.size === 0) {
        setFavoriteTeachers([]);
        return;
      }
      setIsLoadingDetails(true);
      try {
        const ids = Array.from(favoriteTeacherIds);
        const teachers = await getTeachersByIds(ids);
        setFavoriteTeachers(teachers);
      } catch (error) {
        console.error("Favori öğretmen detayları getirilemedi:", error);
        setFavoriteTeachers([]);
      } finally {
        setIsLoadingDetails(false);
      }
    };
    fetchFavoriteTeacherDetails();
  }, [favoriteTeacherIds, currentUser]);

  const handleToggleFavorite = async (teacherId) => {
    await removeFavoriteTeacher(teacherId);
  };

  const handleOpenBookingModal = (teacher) => {
    setSelectedTeacherForBooking(teacher);
    setIsBookingModalOpen(true);
  };
  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedTeacherForBooking(null);
  };
  const handleBookingSuccess = () => {};

  const isLoading = isLoadingFavorites || isLoadingDetails;
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[calc(100vh-200px)]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        My favorite teachers
      </h1>

      {favoriteTeachers.length > 0 ? (
        <TeacherList
          teachers={favoriteTeachers}
          favoriteStatus={favoriteTeachers.reduce(
            (acc, teacher) => ({ ...acc, [teacher.id]: true }),
            {}
          )}
          onToggleFavorite={handleToggleFavorite}
          onBookLesson={handleOpenBookingModal}
        />
      ) : (
        <p className="text-center text-gray-500 text-xl py-10">
          You don't have any favorite teachers yet.
        </p>
      )}

      {selectedTeacherForBooking && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          teacher={selectedTeacherForBooking}
          onBookingSubmitSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
