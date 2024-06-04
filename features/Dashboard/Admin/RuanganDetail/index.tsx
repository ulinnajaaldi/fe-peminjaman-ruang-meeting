"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  useDeleteRuangan,
  useGetRuanganBySlug,
} from "@/useCases/RuanganUseCases";
import { ROUTES_PATH } from "@/constants/routes";
import { ActionDetailDashboard } from "@/components/common";
import NotFoundPageDetails from "@/components/layouts/not-found-page-details";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardRuanganDetailFeature = ({
  params,
}: {
  params: { slug: string };
}) => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetRuanganBySlug(params.slug);

  const { mutate } = useDeleteRuangan(params.slug, router);

  if (isLoading)
    return (
      <div className="flex h-[85%] w-full items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  if (isError)
    return (
      <div className="relative h-full w-full">
        <NotFoundPageDetails />
      </div>
    );

  return (
    <div className="relative">
      <ScrollArea className="h-[88vh]">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold">{data?.data?.name}</h1>
          <p className="text-lg font-semibold">
            Kapasitas {data?.data?.capacity} Orang
          </p>
          <article
            className="prose max-w-full"
            dangerouslySetInnerHTML={{ __html: data?.data?.description }}
          ></article>

          <div className="grid grid-cols-3 gap-2">
            {data?.data?.images.map((item: string, index: number) => (
              <div key={index} className="relative">
                <Image
                  src={item}
                  width={500}
                  height={500}
                  alt={data?.data?.name}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
          <article
            className="prose  max-w-full"
            dangerouslySetInnerHTML={{ __html: data?.data?.content }}
          ></article>
          <article
            className="prose  max-w-full"
            dangerouslySetInnerHTML={{ __html: data?.data?.facilities }}
          ></article>
        </div>
      </ScrollArea>
      <ActionDetailDashboard
        urlBack={ROUTES_PATH.dashboardAdmin.ruangan}
        urlEdit={`${ROUTES_PATH.dashboardAdmin.ruanganEdit}/${params.slug}`}
        handleDelete={mutate}
      />
    </div>
  );
};

export default DashboardRuanganDetailFeature;
