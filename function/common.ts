export const formatDateToKorean = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const fetchbookDetailData = async (id?: string) => {
  if (!id) throw new Error("id가 필요합니다");
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/detail/` + id, {
      cache: "force-cache",
      next: { revalidate: 86400, tags: ["bookDetail", id] },
    });
    if (!response.ok) throw new Error("통신 실퍠:" + response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("에러발생", error);
    throw error;
  }
};
