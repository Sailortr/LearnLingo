import { useState, useEffect, useCallback } from "react";

const fetchTeachersFromService = async ({ filters, page, perPage }) => {
  console.log(
    "Fetching teachers with filters:",
    filters,
    "Page:",
    page,
    "PerPage:",
    perPage
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      const sampleTeachers = [];
      const totalTeachers = 20;
      const hasMoreData = page * perPage < totalTeachers;
      resolve({
        data: sampleTeachers.slice(0, perPage),
        hasMore: hasMoreData,
        total: totalTeachers,
      });
    }, 1000);
  });
};

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
          setTeachers(result.data);
        } else {
          setTeachers((prevTeachers) => [...prevTeachers, ...result.data]);
        }
        setHasMore(result.hasMore);
        setCurrentPage(pageToLoad);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
        setError(err.message || "Öğretmenler yüklenirken bir hata oluştu.");
        setTeachers([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [teachersPerPage]
  );

  useEffect(() => {
    setCurrentPage(1);
    loadTeachers(1, activeFilters);
  }, [activeFilters, loadTeachers]);

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
    loadTeachers,
    loadMoreTeachers,
    activeFilters,
    setExternalFilters,
  };
};
