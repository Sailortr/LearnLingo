import { useState, useEffect, useCallback } from "react";

// Varsayımsal öğretmen servisi fonksiyonları
// Bu fonksiyonlar normalde src/services/teacherService.js gibi bir dosyada olurdu
// ve Firebase/API çağrılarını yapardı.
const fetchTeachersFromService = async ({ filters, page, perPage }) => {
  console.log(
    "Fetching teachers with filters:",
    filters,
    "Page:",
    page,
    "PerPage:",
    perPage
  );
  // --- Placeholder Logic ---
  // Burada gerçek API çağrısı yapılmalı.
  // Örnek veri döndürelim:
  return new Promise((resolve) => {
    setTimeout(() => {
      // `initialTeachersData` TeachersPage.jsx'deki gibi bir veri olabilir.
      // Bu veriyi filtreleyip sayfalayarak döndürdüğünüzü varsayalım.
      const sampleTeachers = [
        // ... öğretmen objeleri ...
      ];
      const totalTeachers = 20; // Toplam öğretmen sayısı (filtrelenmiş)
      const hasMoreData = page * perPage < totalTeachers;
      resolve({
        data: sampleTeachers.slice(0, perPage), // Sadece o sayfadaki veriler
        hasMore: hasMoreData,
        total: totalTeachers,
      });
    }, 1000);
  });
  // --- End Placeholder Logic ---
};

/**
 * Öğretmen verilerini yönetmek, filtrelemek ve sayfalamak için bir custom hook.
 * * @param {object} [initialFilters={}] - Başlangıç filtreleri.
 * @param {number} [teachersPerPage=4] - Sayfa başına gösterilecek öğretmen sayısı.
 * @returns {object}
 * - teachers: Yüklenen öğretmenlerin listesi (dizi).
 * - isLoading: Veri yüklenirken true olan boolean.
 * - error: Veri yükleme sırasında bir hata oluşursa hata mesajı (string).
 * - hasMore: Daha fazla öğretmen olup olmadığını belirten boolean.
 * - currentPage: Mevcut sayfa numarası.
 * - loadTeachers: Belirli filtreler ve sayfa ile öğretmenleri yükleyen fonksiyon.
 * - loadMoreTeachers: Bir sonraki sayfayı yükleyen fonksiyon.
 * - activeFilters: Şu anki aktif filtreler.
 * - setExternalFilters: Filtreleri dışarıdan ayarlamak için fonksiyon.
 */
export const useTeachers = (initialFilters = {}, teachersPerPage = 4) => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const loadTeachers = useCallback(
    async (pageToLoad, filtersToApply) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchTeachersFromService({
          filters: filtersToApply,
          page: pageToLoad,
          perPage: teachersPerPage,
        });

        if (pageToLoad === 1) {
          setTeachers(result.data); // Yeni filtrelerle ilk sayfa yükleniyorsa listeyi değiştir
        } else {
          setTeachers((prevTeachers) => [...prevTeachers, ...result.data]); // Daha fazla yükleniyorsa ekle
        }
        setHasMore(result.hasMore);
        setCurrentPage(pageToLoad);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
        setError(err.message || "Öğretmenler yüklenirken bir hata oluştu.");
        setTeachers([]); // Hata durumunda listeyi boşalt
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [teachersPerPage]
  );

  // Filtreler değiştiğinde öğretmenleri yeniden yükle (ilk sayfadan başla)
  useEffect(() => {
    setCurrentPage(1); // Sayfayı başa al
    loadTeachers(1, activeFilters);
  }, [activeFilters, loadTeachers]); // loadTeachers'ı bağımlılıklara ekledik

  const loadMoreTeachers = () => {
    if (hasMore && !isLoading) {
      loadTeachers(currentPage + 1, activeFilters);
    }
  };

  const setExternalFilters = (newFilters) => {
    setActiveFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return {
    teachers,
    isLoading,
    error,
    hasMore,
    currentPage,
    loadTeachers, // Belirli bir sayfayı belirli filtrelerle yüklemek için
    loadMoreTeachers,
    activeFilters,
    setExternalFilters, // Filtreleri dışarıdan değiştirmek için
  };
};

// Kullanım Örneği (TeachersPage.jsx içinde):
// const {
//   teachers,
//   isLoading,
//   error,
//   hasMore,
//   loadMoreTeachers,
//   setExternalFilters,
//   activeFilters
// } = useTeachers({ language: 'english' }, 4);

// useEffect(() => {
//   // Dışarıdan gelen bir filtre değişikliği için
//   // setExternalFilters({ level: 'A1' });
// }, []);

// return (
//   <div>
//     {/* FilterGroup bileşeni burada activeFilters ve setExternalFilters'ı kullanabilir */}
//     {isLoading && <p>Loading...</p>}
//     {error && <p>Error: {error}</p>}
//     <TeacherList teachers={teachers} />
//     {hasMore && <button onClick={loadMoreTeachers} disabled={isLoading}>Load More</button>}
//   </div>
// );
