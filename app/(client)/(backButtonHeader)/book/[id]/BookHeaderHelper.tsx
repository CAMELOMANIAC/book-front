"use client";
import { useBackHeader } from "@/context/backHeaderStore";
import { useEffect } from "react";
import ShareIcon from "@/public/icons/shareIcon.svg";
import KakaoInfoTip from "@/components/kakaoInfoTip/KakaoInfoTip";
import { Book } from "@/types/dto/book";

type Props = { bookData: Book | undefined };
const BookHeaderHelper = ({ bookData }: Readonly<Props>) => {
  const { setTitle, setEtcButton } = useBackHeader();

  useEffect(() => {
    if (typeof bookData?.title !== "string") return;
    setTitle(
      <h1 className="flex max-w-[50vw] flex-row items-center justify-start text-lg font-semibold lg:max-w-[40vw]">
        <span className="truncate">{bookData.title}</span>
        {bookData?.id && <KakaoInfoTip />}
      </h1>
    );

    const sharedHandler = () => {
      if (navigator.share) {
        navigator
          .share({
            title: "HBD 책 소개",
            text: bookData.title,
            url: window.location.href,
          })
          .then(() => console.log("공유 성공"))
          .catch((error) => console.log("공유 실패", error));
      } else {
        alert("죄송합니다 현재 브라우저가 Web Share API를 지원하지 않습니다.");
      }
    };
    setEtcButton(<ShareIcon className="text-[var(--sub-color)]" onClick={sharedHandler} />);
    return () => {
      setTitle("");
      setEtcButton(null);
    };
  }, [setTitle, setEtcButton, bookData]);
  return null;
};

export default BookHeaderHelper;
