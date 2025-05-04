import { ListResponseRecommendedBookDto } from "@/types/dto";

const fetchTodayLibrary = async (): Promise<ListResponseRecommendedBookDto | undefined> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/book/library", {
      next: { revalidate: 86400, tags: ["today-library"] },
    });
    if (response.ok) {
      const result: ListResponseRecommendedBookDto = await response.json();
      return result;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchTodayLibrary;
