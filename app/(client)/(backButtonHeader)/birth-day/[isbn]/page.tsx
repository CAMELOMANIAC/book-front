import React, { Suspense } from "react";
import BookHeaderHelper from "../../book/[isbn]/BookHeaderHelper";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import BookDetail from "@/components/bookDetail/BookDetail";

export const dynamic = "force-static";
export const revalidate = 86400; // 캐시를 너무 오래 저장하면 더 중요한 캐시 정보(getBirthdayBook 함수처럼 무거운거)가 제거될 수 있으므로 생일도서가 변경되는 24시간만 유효하도록 설정함

const BirthDayBookDetailpage = async ({ params }: { params: Promise<{ isbn?: number }> }) => {
  const { isbn } = await params;
  return (
    <>
      <BookHeaderHelper bookData={undefined} isbn={isbn!} />
      <main className="flex size-full flex-1 items-center gap-8">
        <Suspense fallback={<LoadingSpinner className="h-[50vw] w-full" />}>
          {isbn && <BookDetail isbn={isbn} />}
        </Suspense>
      </main>
    </>
  );
};

export default BirthDayBookDetailpage;
