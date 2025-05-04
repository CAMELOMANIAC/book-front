import { ContentsDto, ListResponseContentsDto } from "@/types/dto";

const fetchDailyDiscovery = async (): Promise<ContentsDto[] | undefined> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/contents/discovery", {
      next: { revalidate: 86400, tags: ["daily-discovery"] },
    });
    if (response.ok) {
      const result: ListResponseContentsDto = await response.json();
      return result.items;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchDailyDiscovery;
