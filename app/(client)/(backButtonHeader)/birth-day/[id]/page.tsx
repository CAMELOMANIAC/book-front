import React, { Suspense } from "react";
import BookHeaderHelper from "../../book/[id]/BookHeaderHelper";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import BookDetail from "@/components/bookDetail/BookDetail";
import { Book } from "@/types/dto/book";
import { fetchbookDetailData } from "@/function/common";

export const dynamic = "force-static";
export const revalidate = 86400; // 캐시를 너무 오래 저장하면 더 중요한 캐시 정보(getBirthdayBook 함수처럼 무거운거)가 제거될 수 있으므로 생일도서가 변경되는 24시간만 유효하도록 설정함

const BirthDayBookDetailpage = async ({ params }: { params: Promise<{ id?: string }> }) => {
  const { id } = await params;
  const suspenseResource = fetchBookDataSuspense(id);
  return (
    <>
      <BookHeaderHelper bookData={undefined} />
      <main className="flex size-full flex-1 items-center gap-8">
        <Suspense fallback={<LoadingSpinner className="h-[50vw] w-full" />}>
          <BookDetail suspenseResource={suspenseResource} />
        </Suspense>
      </main>
    </>
  );
};

export default BirthDayBookDetailpage;

export type SuspenseResource = {
  read: () => Book;
};
const fetchBookDataSuspense = (id?: string): SuspenseResource => {
  let data: Book | undefined;
  let promise: Promise<Book | undefined>;
  return {
    read: () => {
      if (data) return data;
      if (!promise) promise = fetchbookDetailData(id).then((result) => (data = result));
      throw promise;
    },
  };
};
