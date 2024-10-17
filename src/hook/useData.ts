'use client'
import { useEffect, useState } from "react";

type SearchableItem = { title: string } | { name: string };

export const useData = <T extends SearchableItem>(
  fetchData: () => Promise<T[]>,
  searchTerm: string,
  itemsPerPage: number
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetch() {
      const result = await fetchData();
      setData(result);
      setLoading(false);
    }
    fetch();
  }, [fetchData]);

  const filteredData = data.filter((item) =>
    ("title" in item
      ? item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      : item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return {
    loading,
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
    setLoading,
  };
};
