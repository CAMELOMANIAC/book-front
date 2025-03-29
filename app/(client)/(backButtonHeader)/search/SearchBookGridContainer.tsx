"use client";
import BookGrid from "@/components/bookGrid/BookGrid";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
const SearchBookGridContainer = ({ query }: { query: string }) => {
  const nextPageButtonRef = useRef<HTMLButtonElement>(null);
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["searchBook", query],
    queryFn: ({ pageParam }) => fetchInfiniteBookData(pageParam, query),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    staleTime: 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (nextPageButtonRef.current) {
      observer.observe(nextPageButtonRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      {!isLoading ? (
        <>
          {data?.pages.map((page, index) => (
            <BookGrid
              key={index}
              books={page?.data || []}
              className={`${data?.pages.length > 0 && "py-0 pt-[10px]"}`}
            />
          ))}
          {hasNextPage && (
            <button onClick={() => fetchNextPage()} ref={nextPageButtonRef}>
              더보기
            </button>
          )}
        </>
      ) : (
        <LoadingSpinner className="h-[50vh] w-full" />
      )}
    </>
  );
};

export default SearchBookGridContainer;

//백엔드 api 페이지네이션 값이 없으므로 다시 수정필요
const fetchInfiniteBookData = async (pageParam: number, query?: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/search?query=${query}`);
    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch data" + response.status);
    return { data: data.documents, nextCursor: data.meta.is_end ? undefined : pageParam + 1 };
  } catch (error) {
    console.log(error);
  }
};
