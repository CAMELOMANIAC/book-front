import { HTMLAttributes } from "react";
import BookItem from "./Bookitem";
import Link from "next/link";
import Image from "next/image";
import birthDayCake from "@/public/birthDayCake.png";
import { BookDto } from "@/types/dto";

type Props = { className?: string; books: BookDto[] } & HTMLAttributes<HTMLDivElement>;
const BookGrid = ({ className, books, ...props }: Readonly<Props>) => {
  return (
    <section
      className={`relative grid w-full grid-cols-2 gap-[10px] p-[var(--client-layout-margin)] ${className || ""}`}
      {...props}
    >
      {books?.map((item) => (
        <Link key={item.isbn} href={`/book/${item.isbn.split(" ")[1]}`} className="relative size-full">
          <BookItem
            imageUrl={item.titleImage}
            bookName={item.title}
            publisher={item.publisher.name}
            author={item.authorList.join(", ")}
          />

          {item.publishedDate &&
            new Date(item.publishedDate).getDate() + 9 * 60 * 60 * 1000 === new Date().getDate() + 9 * 60 * 60 * 1000 &&
            new Date(item.publishedDate).getMonth() + 9 * 60 * 60 * 1000 ===
              new Date().getMonth() + 9 * 60 * 60 * 1000 && (
              <div className="absolute -bottom-1 -right-1 aspect-square w-[30%]">
                <Image alt="bithDayCake" src={birthDayCake} fill sizes="100px" />
              </div>
            )}
        </Link>
      ))}
    </section>
  );
};

export default BookGrid;
