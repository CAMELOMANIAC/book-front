import Discovery from "@/components/discovery/Discovery";
import TodayLibrary from "./components/todayLibrary/TodayLibrary";
import MainScheduleSlide from "./components/mainScheduleSlide/MainScheduleSlide";
import MainBookSlide from "./components/mainBookSlide/MainBookSlide";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Suspense } from "react";

const Home = () => {
  return (
    <main className="relative flex size-full flex-col items-center py-5">
      <MainBookSlide />
      <Suspense fallback={<LoadingSpinner className="w-full" />}>
        <Discovery />
      </Suspense>
      <Suspense fallback={<LoadingSpinner className="w-full" />}>
        <TodayLibrary />
      </Suspense>
      <MainScheduleSlide />
    </main>
  );
};

export default Home;
