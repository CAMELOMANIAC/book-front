import React, { HTMLAttributes } from "react";
import CommonPillButton from "../common/CommonPillButton";
import Image from "next/image";
import DiscoveryItem from "./DiscoveryItem";
import Link from "next/link";
import EmptyImage from "../common/EmptyImage";
import fetchDailyDiscovery from "@/function/fetch/fetchDailyDiscovery";

enum ContentsType {
  "VIDEO" = "유튜브",
  "ARTICLE" = "글",
  "PODCAST" = "팟캐스트",
  "LINK" = "링크",
  "SNS" = "SNS",
}

type Props = { className?: string } & HTMLAttributes<HTMLDivElement>;
const Discovery = async ({ className, ...props }: Readonly<Props>) => {
  const dailyDiscoveryData = await fetchDailyDiscovery();
  return (
    <section
      className={`relative h-fit w-full px-[var(--client-layout-margin)] py-[var(--content-section-margin)] ${
        className || ""
      }`}
      {...props}
    >
      <div className="relative flex size-full flex-col items-center justify-between">
        <div className="relative flex size-full flex-col items-start justify-center">
          <h2 className="section-title mb-1">디스커버리</h2>
          <p className="section-sub-title mb-4">좋은 책을 발견하는 새로운 관점 </p>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          {dailyDiscoveryData?.[0].image ? (
            <Image alt="discovery" src={dailyDiscoveryData?.[0].image} fill sizes="768px" />
          ) : (
            <EmptyImage />
          )}
        </div>
      </div>
      <ul>
        {dailyDiscoveryData?.map(
          (item, index) =>
            index > 0 &&
            index < 3 && (
              <React.Fragment key={item.id}>
                <DiscoveryItem contentType={ContentsType[item.type]} title={item.title || ""} imageUrl={item.image} />
                {index < 3 - 1 && <div className="border-b" />}
              </React.Fragment>
            )
        )}
      </ul>
      <div className="relative flex w-full justify-center">
        <Link href={"/discovery"}>
          <CommonPillButton className="!size-fit border border-gray-200 bg-white px-4 text-[var(--sub-color)]">
            컨텐츠 더보기
          </CommonPillButton>
        </Link>
      </div>
    </section>
  );
};

export default Discovery;
