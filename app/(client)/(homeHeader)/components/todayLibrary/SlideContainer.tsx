"use client";
import React, { useState } from "react";
import SlideIndicator from "./SlideIndicator";
import TodayLibraryItem from "./TodayLibraryItem";
import { ListResponseRecommendedBookDto } from "@/types/dto";

type Props = {
  className?: string;
  todayLibrary: ListResponseRecommendedBookDto;
};
const SlideContainer = ({ className, todayLibrary, ...props }: Readonly<Props>) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  return (
    <div className={`relative flex w-full flex-col ${className || ""}`} {...props}>
      <div className="grid grid-cols-3 gap-1">
        {todayLibrary &&
          [...new Array(...todayLibrary.items)].map((item, index) => (
            <TodayLibraryItem key={index} publisher={item.publisher.name} imageUrl={item.titleImage} />
          ))}
      </div>
      <SlideIndicator
        pageCount={todayLibrary.items.length / 3}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        className="mt-7"
      />
    </div>
  );
};

export default SlideContainer;
