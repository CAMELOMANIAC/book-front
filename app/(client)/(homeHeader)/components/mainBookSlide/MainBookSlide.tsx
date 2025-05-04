"use client";
import React, { HTMLAttributes, useEffect, useLayoutEffect, useRef, useState } from "react";
import BookDescription from "./BookDescription";
import ReactConfetti from "react-confetti";
import MainBookSlideContainer from "./MainBookSlideContainer";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useGetBirthDayBooks from "@/components/hooks/useGetBirthDayBooks";

type Props = { className?: string } & HTMLAttributes<HTMLDivElement>;
const MainBookSlide = ({ className, ...props }: Readonly<Props>) => {
  const { data, status } = useGetBirthDayBooks();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [confettiWind, setConfettiWind] = useState<number>(0);

  //전체 크기 조정용
  useLayoutEffect(() => {
    const sectionUpdateSize = () => {
      if (sectionRef.current) {
        setSize({
          width: sectionRef.current.offsetWidth,
          height: sectionRef.current.offsetHeight,
        });
      }
    };
    sectionUpdateSize();
    window.addEventListener("resize", sectionUpdateSize);
    return () => window.removeEventListener("resize", sectionUpdateSize);
  }, []);

  //콘페티 이벡트 바람 조정
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiWind(0);
    }, 2000);
    return () => clearTimeout(timer);
  }, [confettiWind]);

  return (
    <section className={`flex size-full flex-col ${className || ""}`} {...props} ref={sectionRef}>
      <ReactConfetti
        width={size.width}
        height={size.height}
        wind={confettiWind}
        gravity={0.08}
        friction={0.96}
        numberOfPieces={size.width / 25}
        drawShape={drawShape}
        frameRate={60}
        style={{ zIndex: 0, display: "absolute" }}
      />
      <BookDescription createdAt={new Date()} className="z-10 px-[var(--client-layout-margin)]" />
      {status === "success" ? (
        <MainBookSlideContainer books={data?.slice(0, 6)} setConfettiWind={setConfettiWind} />
      ) : (
        <LoadingSpinner className="h-[30vw] w-full" />
      )}
    </section>
  );
};

export default MainBookSlide;

const drawShape = (ctx: CanvasRenderingContext2D) => {
  const path = new Path2D(
    "M37 2L23 0C23.8 7.2 13.3333 12.3333 8 14C10.5 16.5 17.6 20.9 26 18.5C34.4 16.1 36.8333 6.5 37 2Z"
  );
  ctx.save();
  ctx.fill(path);
  ctx.restore();
};
