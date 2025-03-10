import Image from "next/image";
import birthDayCake from "@/public/birthDayCake.png";
import { HTMLAttributes } from "react";

type Props = { className?: string; imageUrl: string } & HTMLAttributes<HTMLDivElement>;
const BookDetailImageSection = ({ className, imageUrl, ...props }: Readonly<Props>) => {
  return (
    <section
      className={`relative mx-auto flex aspect-[3/4] size-full max-w-[163px] items-center justify-center ${
        className || ""
      }`}
      {...props}
    >
      <Image alt="book" src={imageUrl} className={`relative size-full rounded-2xl`} fill />
      <Image alt="bithDayCake" src={birthDayCake} width={40} height={40} className="absolute -bottom-2 -right-2" />
    </section>
  );
};

export default BookDetailImageSection;
