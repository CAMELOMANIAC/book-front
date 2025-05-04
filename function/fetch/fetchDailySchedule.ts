import { PageResponseEventDto } from "@/types/dto";

//캐싱 정책에따른 분리
const fetchDailySchedule = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events?limit=3}`, {
      next: { revalidate: 86400, tags: ["daily-schedule"] },
    });
    if (response.ok) {
      const result: PageResponseEventDto = await response.json();
      return result.items;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchDailySchedule;
