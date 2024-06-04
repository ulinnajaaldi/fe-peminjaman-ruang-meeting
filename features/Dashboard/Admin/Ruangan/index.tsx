"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ROUTES_PATH } from "@/constants/routes";
import { useGetRuangan } from "@/useCases/RuanganUseCases";
import { IRuanganSchema } from "@/domain/Ruangan";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useDashboardRuanganFeature from "./hook";

const DashboardRuanganFeature = () => {
  const router = useRouter();

  const { page, limit, search, setSearch, value } =
    useDashboardRuanganFeature();

  const { data, isLoading } = useGetRuangan(value, page, limit);

  return (
    <div>
      <h1 className="text-4xl font-semibold">Ruangan</h1>
      <div className="mt-10 flex items-center justify-between">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button asChild>
          <Link href={ROUTES_PATH.dashboardAdmin.ruanganAdd}>
            Tambah Ruangan
          </Link>
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-5">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-md border bg-neutral-50 p-2"
              >
                <div className="relative h-60 w-full rounded-md bg-neutral-200"></div>
                <div>
                  <div className="mt-2 h-4 w-1/2 bg-neutral-200"></div>
                  <div className="mt-2 h-4 w-1/4 bg-neutral-200"></div>
                </div>
              </div>
            ))
          : data?.data?.map((item: IRuanganSchema) => (
              <button
                key={item.id}
                className="cursor-pointer rounded-md border bg-white p-2 transition-all hover:drop-shadow-md"
                onClick={() => {
                  router.push(
                    `${ROUTES_PATH.dashboardAdmin.ruangan}/${item.slug}`,
                  );
                }}
              >
                <div className="relative h-60 w-full">
                  <Image
                    src={item?.images?.[0] || "/images/placeholders.jpg"}
                    alt={item.name}
                    width={500}
                    height={500}
                    className="h-full w-full rounded-md object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-start text-lg font-semibold">
                    {item.name}
                  </h1>
                  <p className="text-start text-sm">
                    Kapasitas {item.capacity} Orang
                  </p>
                </div>
              </button>
            ))}
      </div>
    </div>
  );
};

export default DashboardRuanganFeature;
