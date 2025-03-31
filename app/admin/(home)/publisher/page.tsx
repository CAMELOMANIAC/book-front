import { redirect } from "next/navigation";
import AdminPageDataProvider from "@/app/admin/AdminPageDataProvider";
import AdminRowControllerContainer from "@/components/adminRowController/AdminRowControllerContainer";
import AdminRowList from "@/components/adminRowList/AdminRowList";
import AdminPaginationController from "@/components/adminPaginationController/AdminPaginationController";
import { AdminPublisherInputs } from "@/components/popupProvider/adminForm/AdminPublisherForm";
import { Publisher as DTOPublisher } from "@/types/dto/publisher";
import { dehydrate, QueryClient } from "@tanstack/react-query";

const Publisher = async ({ searchParams }: { searchParams: Promise<{ keyword?: string }> }) => {
  if (false) {
    //서버에서 권한 인증 통신에 성공하지 못한경우 리다이렉트
    redirect("/admin/login");
  }
  const { keyword } = await searchParams;
  console.log("searchParams 테스트", keyword);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["adminPublishers"], queryFn: fetchAdminPublishers });
  const dehydratedState = dehydrate(queryClient);

  return (
    <AdminPageDataProvider<AdminPublisherInputs[]>
      state={dehydratedState}
      initialData={[
        {
          publisherName: "test",
          instagramId: "test",
          urls: [{ value: "test", type: "Link" }],
          memo: "test",
          tag: "test",
        },
      ]}
    >
      <AdminRowControllerContainer />
      <AdminRowList<AdminPublisherInputs[]>
        keys={[
          "id",
          "name",
          "description",
          "websiteUrl",
          "logoUrl",
          "newsletterUrl",
          "playlistUrl",
          "createdAt",
          "updatedAt",
        ]}
      ></AdminRowList>
      <AdminPaginationController />
    </AdminPageDataProvider>
  );
};

export default Publisher;

const fetchAdminPublishers = async (): Promise<DTOPublisher[]> => {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/publishers");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
