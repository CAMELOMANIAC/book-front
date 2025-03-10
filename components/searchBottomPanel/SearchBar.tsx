"use client";
import { HTMLAttributes, useEffect, useRef } from "react";
import SearchIcon from "@/public/icons/searchIcon.svg";

type Props = { className?: string } & HTMLAttributes<HTMLDivElement>;
const SearchBar = ({ className, ...props }: Readonly<Props>) => {
  const SearchBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      //검색패널 올라오는 애니메이션이 끝나기전에 포커싱되면 레이아웃이 문제가 발생하므로 임시조치함
      SearchBarRef.current?.focus();
    }, 500);

    return () => clearTimeout(focusTimer);
  }, []);

  const handleFetchData = async () => {
    const isbn = SearchBarRef.current?.value;
    if (!isbn) return;
    const response = await fetch(`/api/book?isbn=${isbn}`);
    const { data } = await response.json();
    console.log(data);
  };

  return (
    <div className={`sticky top-0 w-full px-[var(--client-layout-margin)] py-3 ${className || ""}`} {...props}>
      <div className="relative flex w-full flex-row rounded-2xl border bg-white p-1">
        <SearchIcon className="w-11 cursor-pointer text-[var(--sub-color)]" onClick={handleFetchData} />
        <input
          className="w-full outline-none"
          placeholder="제목, 작가, 출판사를 검색하세요"
          type="search"
          ref={SearchBarRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFetchData();
            }
          }}
        ></input>
      </div>
    </div>
  );
};

export default SearchBar;
