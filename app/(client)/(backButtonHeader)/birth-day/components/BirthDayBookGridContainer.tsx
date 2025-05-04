"use client";
import useGetBirthDayBooks from "@/components/hooks/useGetBirthDayBooks";
import BookGrid from "@/components/bookGrid/BookGrid";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useEffect, useRef } from "react";

const BirthDayBookGridContainer = () => {
  const nextPageButtonRef = useRef<HTMLButtonElement>(null);
  const { data, fetchNextPage, hasNextPage, status } = useGetBirthDayBooks();

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
      {status === "success" ? (
        <>
          {data?.pages.map((page, index) => (
            <BookGrid
              key={index}
              books={page.items || []}
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

export default BirthDayBookGridContainer;
