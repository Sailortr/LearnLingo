import React, { useState, useEffect } from "react";
import teachersData from "../data/teachers.json";
import FilterGroup from "../components/Filters/FilterGroup";
import TeacherList from "../components/Teachers/TeacherList";
import LoadMoreButton from "../components/Teachers/LoadMoreButton";
import Spinner from "../components/UI/Spinner";
import BookingModal from "../components/Booking/BookingModal";

// --- YENİ EKLENTİLER ---
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import InfoModal from "../components/UI/InfoModal"; // Basit uyarı modalımız

const TEACHERS_PER_PAGE = 4;

const TeachersPage = () => {
  // Mevcut state'leriniz
  const [allTeachers] = useState(teachersData);
  const [displayedTeachers, setDisplayedTeachers] = useState([]);
  const [filters, setFilters] = useState({
    language: "",
    level: "",
    price_per_hour: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] =
    useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // --- YENİ STATE VE CONTEXT'LER ---
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Uyarı modalının durumu
  const { currentUser } = useAuth(); // Kullanıcının giriş durumu
  const { isFavorite, addFavoriteTeacher, removeFavoriteTeacher } =
    useFavorites(); // Favori fonksiyonları

  // --- YENİ KOŞULLU FAVORİ FONKSİYONU ---
  const handleToggleFavorite = (teacherId) => {
    if (!currentUser) {
      // Kullanıcı giriş yapmamışsa, uyarı modalını aç
      setIsInfoModalOpen(true);
      return;
    }
    // Kullanıcı giriş yapmışsa, favori işlemini yap
    if (isFavorite(teacherId)) {
      removeFavoriteTeacher(teacherId);
    } else {
      addFavoriteTeacher(teacherId);
    }
  };

  // --- DİĞER FONKSİYONLARINIZ (Değişiklik yok) ---
  const handleOpenBookingModal = (teacher) => {
    setSelectedTeacherForBooking(teacher);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setSelectedTeacherForBooking(null);
    setIsBookingModalOpen(false);
  };

  const handleBookingSuccess = () => {
    // Bu fonksiyon modalın hemen kapanmaması için boş bırakılabilir
    // veya sayfada bir bildirim gösterebilir.
  };

  const applyFilters = (data, filterSettings) => {
    return data.filter((teacher) => {
      const langMatch = filterSettings.language
        ? teacher.languages
            .map((lang) => lang.toLowerCase())
            .includes(filterSettings.language.toLowerCase())
        : true;
      const levelMatch = filterSettings.level
        ? teacher.levels.includes(filterSettings.level)
        : true;
      const priceMatch = filterSettings.price_per_hour
        ? teacher.price_per_hour <= Number(filterSettings.price_per_hour)
        : true;
      return langMatch && levelMatch && priceMatch;
    });
  };

  const loadTeachers = (page, filterSettings) => {
    setIsLoading(true);
    const filtered = applyFilters(allTeachers, filterSettings);
    const nextTeachers = filtered.slice(0, page * TEACHERS_PER_PAGE);
    setDisplayedTeachers(nextTeachers);
    setHasMore(nextTeachers.length < filtered.length);
    setIsLoading(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    loadTeachers(1, filters);
  }, [filters]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const filtered = applyFilters(allTeachers, filters);
    const newTeachers = filtered.slice(
      currentPage * TEACHERS_PER_PAGE,
      nextPage * TEACHERS_PER_PAGE
    );
    setDisplayedTeachers((prev) => [...prev, ...newTeachers]);
    setHasMore(displayedTeachers.length + newTeachers.length < filtered.length);
    setCurrentPage(nextPage);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const availableFilters = {
    languages: [...new Set(allTeachers.flatMap((t) => t.languages))].map(
      (l) => ({ value: l.toLowerCase(), label: l })
    ),
    levels: [...new Set(allTeachers.flatMap((t) => t.levels))].map((lvl) => ({
      value: lvl,
      label: lvl,
    })),
    prices: [10, 20, 30, 40].map((p) => ({ value: String(p), label: `$${p}` })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <FilterGroup
        availableFilters={availableFilters}
        currentFilters={filters}
        onFilterChange={handleFilterChange}
      />

      {isLoading && displayedTeachers.length === 0 ? (
        <div className="flex justify-center h-40">
          <Spinner size="lg" />
        </div>
      ) : (
        // --- `TeacherList`'e YENİ PROPLAR EKLENDİ ---
        <TeacherList
          teachers={displayedTeachers}
          onBookLesson={handleOpenBookingModal}
          onToggleFavorite={handleToggleFavorite}
          favoriteStatus={displayedTeachers.reduce(
            (acc, teacher) => ({
              ...acc,
              [teacher.id]: isFavorite(teacher.id),
            }),
            {}
          )}
        />
      )}

      {hasMore && !isLoading && (
        <LoadMoreButton
          onClick={handleLoadMore}
          isLoading={isLoading}
          hasMore={hasMore}
        />
      )}

      {selectedTeacherForBooking && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          teacher={selectedTeacherForBooking}
          onBookingSubmitSuccess={handleBookingSuccess}
        />
      )}

      {/* --- UYARI MODALI JSX'E EKLENDİ --- */}
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        message="Please log in to add teachers to your favorites."
      />
    </div>
  );
};

export default TeachersPage;
