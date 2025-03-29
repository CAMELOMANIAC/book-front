import React, { Suspense } from "react";
import BookHeaderHelper from "./BookHeaderHelper";
import BookDetail from "@/components/bookDetail/BookDetail";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Book } from "@/types/dto/book";
import { fetchbookDetailData } from "@/function/common";

export const dynamic = "force-static";
export const revalidate = 86400; // 24시간 동안 캐시 유지

const BookDetailpage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const suspenseResource = fetchBookSuspense(id);

  return (
    <>
      <BookHeaderHelperContainer suspenseResource={suspenseResource} id={id} />
      <main className="flex size-full flex-1 items-center gap-8">
        <Suspense fallback={<LoadingSpinner className="h-[80vw] w-full" />}>
          <BookDetail suspenseResource={suspenseResource} />
        </Suspense>
      </main>
    </>
  );
};
export default BookDetailpage;

export type SuspenseResource = {
  read: () => Book;
};
/**
 * handleFetchKaKaoData 통신이 끝날때까지 렌더링을 중지하면
 * 멈춘것처럼 이전화면에서 대기 해야하므로 통신을 Promise로 저장해서 전달
 */
const fetchBookSuspense = (id?: string): SuspenseResource => {
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

//클라이언트 컴포넌트인 BookHeaderHelper에게 suspenseResource를 전달하기위한 컨테이너
const BookHeaderHelperContainer = ({ suspenseResource }: { suspenseResource: SuspenseResource; id?: string }) => {
  const resource = suspenseResource.read();
  return <BookHeaderHelper bookData={resource} />;
};
