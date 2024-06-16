"use client";

import React from "react";

import { cn } from "@/lib/utils";
import {
  useGetDetailPeminjamanRuangan,
  useGetRuanganDetail,
} from "@/useCases/RuanganUseCases";
import { useMutateAllSapras } from "@/useCases/SaprasUseCases";
import {
  useProsesPeminjamanRuangan,
  useProsesPinjamCheckPeminjaman,
} from "@/useCases/ProsesPinjamUseCases";
import { BlurImage } from "@/components/common";
import NotFoundPageDetails from "@/components/layouts/not-found-page-details";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import useRuanganDetailFeature from "./hook";
import DialogForm from "./section/DialogForm";

const HomebaseRUanganDetailFeature = ({
  params,
}: {
  params: { slug: string };
}) => {
  const {
    checkKetersediaan,
    setCheckKetersediaan,
    selectedDate,
    setSelectedDate,
    isPinjam,
    setIsPinjam,
    saranaSelected,
    setSaranaSelected,
    saranaForm,
    setSaranaForm,
    form,
  } = useRuanganDetailFeature();

  const {
    data: dataRuangan,
    isLoading: isLoadingRuangan,
    isError,
  } = useGetRuanganDetail(params.slug);

  const {
    data: dataSarpras,
    isPending: isLoadingSapras,
    mutate: mutateSapras,
  } = useMutateAllSapras();

  const { mutate, isPending } = useProsesPeminjamanRuangan(
    dataRuangan?.data?.id,
    saranaForm,
    setIsPinjam,
  );

  const { mutate: mutateCheck, isPending: isPendingCheck } =
    useProsesPinjamCheckPeminjaman(
      dataRuangan?.data?.id,
      form.getValues("date"),
      form.getValues("startHour"),
      form.getValues("endHour"),
      setCheckKetersediaan,
    );

  const { data: dataPeminjamanRuang, mutate: mutateDetailPeminjamanRuangan } =
    useGetDetailPeminjamanRuangan(dataRuangan?.data?.id, selectedDate);

  const bookedDays = dataRuangan?.data?.DetailPeminjamanRuangan?.map(
    (item: any) => {
      return new Date(item.date);
    },
  );

  const handleCheckKetersediaan = () => {
    mutateCheck();
  };

  if (isLoadingRuangan)
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  if (isError)
    return (
      <div className="relative h-[80vh] w-full">
        <NotFoundPageDetails />
      </div>
    );

  return (
    <main className="min-h-[90vh]">
      <h1 className="container py-5 text-3xl font-semibold">
        {dataRuangan?.data?.name}
      </h1>
      <section className="container mt-2 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-9">
          <h2 className="pb-1 font-medium">
            Kapasitas {dataRuangan?.data?.capacity} orang
          </h2>
          <article
            className="prose max-w-full"
            dangerouslySetInnerHTML={{ __html: dataRuangan?.data?.description }}
          ></article>
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {dataRuangan?.data?.images.map((image: string, index: number) => (
                <div key={index} className="relative h-80 w-full">
                  <BlurImage src={image} alt={dataRuangan?.data?.name} />
                </div>
              ))}
            </div>
            <article
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: dataRuangan?.data?.content }}
            ></article>
            <div>
              <h3>Fasilitas yang tersedia</h3>
              <article
                className="prose max-w-full"
                dangerouslySetInnerHTML={{
                  __html: dataRuangan?.data?.facilities,
                }}
              ></article>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 lg:border-l">
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="text-center">Jadwal ruangan yang tersedia</p>
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{ booked: bookedDays }}
                modifiersStyles={{
                  booked: { border: "2px solid currentColor" },
                }}
                onDayClick={() => {
                  mutateDetailPeminjamanRuangan();
                }}
                className="rounded-md border"
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
              />
            </div>
            <div className="w-full px-9 text-sm">
              {dataPeminjamanRuang?.data?.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {dataPeminjamanRuang?.data?.map((item: any) => (
                    <div
                      key={item.idProsessPinjam}
                      className={cn(
                        `flex w-full flex-col rounded-md border border-green-400 bg-green-100/80 p-2`,
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <h4>{item.employeeName}</h4>
                        <p className="text-xs">
                          {item.startHour} - {item.endHour}
                        </p>
                      </div>
                      <p className="text-xs font-light text-gray-700">
                        Division {item.employeeDivision}
                      </p>
                      <p className="line-clamp-2 text-xs font-light text-gray-700">
                        {item.necessity}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center">Belum ada yang meminjam</p>
              )}
            </div>
            <Button variant="outline" onClick={() => setIsPinjam(true)}>
              Pinjam Ruangan
            </Button>
            <DialogForm
              mutate={mutate}
              mutateSapras={mutateSapras}
              dataSarpras={dataSarpras}
              isLoadingSapras={isLoadingSapras}
              isPending={isPending}
              form={form}
              isPinjam={isPinjam}
              saranaForm={saranaForm}
              saranaSelected={saranaSelected}
              setIsPinjam={setIsPinjam}
              setSaranaForm={setSaranaForm}
              setSaranaSelected={setSaranaSelected}
              checkKetersediaan={checkKetersediaan}
              handleKetersedian={handleCheckKetersediaan}
              isPendingCheck={isPendingCheck}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomebaseRUanganDetailFeature;
