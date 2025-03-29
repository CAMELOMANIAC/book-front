import LoadingSpinner from "@/components/common/LoadingSpinner";
import MainBookSlide from "@/components/mainBookSlide/MainBookSlide";
import MainScheduleSlide from "@/components/mainScheduleSlide/MainScheduleSlide";
import PromotionContract from "@/components/promotionContract/PromotionContract";
import { Suspense } from "react";
import TodayLibrary from "@/components/todayLibrary/TodayLibrary";
import { Book } from "@/types/dto/book";

const Home = () => {
  return (
    <main className="relative flex size-full flex-col items-center py-5">
      <Suspense fallback={<LoadingSpinner className="h-[30vw] w-full" />}>
        <MainBookSlideContainer />
      </Suspense>
      <TodayLibrary className="mb-5" />
      <MainScheduleSlide className="mb-5" />
      <PromotionContract />
    </main>
  );
};

export default Home;

const MainBookSlideContainer = async () => {
  //const data = await getBirthdayBook();
  const data = await fetchBirthdayBook();

  return (
    <>
      {data ? (
        <>
          <MainBookSlide className="mb-12" books={data.slice(0, 6)} />
        </>
      ) : (
        "서버와 통신이 원활하지 않습니다"
      )}
    </>
  );
};

const fetchBirthdayBook = async (): Promise<Book[] | undefined> => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/birthday`);
    if (!result.ok) {
      throw new Error("통신 실패: " + result.status);
    }
    const response = await result.json();
    return response.result;
  } catch (error) {
    console.log("오류 발생", error);
  }
};
