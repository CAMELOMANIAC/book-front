import { BookDto } from "@/types/dto";

const fetchBookDetail = async (isbn: number) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/book/" + isbn, {
      next: { revalidate: 86400, tags: ["book", isbn.toString()] },
    });
    if (response.ok) {
      const result: BookDto = await response.json();
      return result;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default fetchBookDetail;
