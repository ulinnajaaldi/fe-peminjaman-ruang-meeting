"use client";

import React from "react";
import Link from "next/link";
import { CheckCheck, ChevronLeft, CircleMinus } from "lucide-react";

import {
  useAcceptProsesPinjam,
  useDaftarPinjamDetail,
  useRejectProsesPinjam,
} from "@/useCases/ProsesPinjamUseCases";
import { cn, statusColor } from "@/lib/utils";
import { ROUTES_PATH } from "@/constants/routes";
import NotFoundPageDetails from "@/components/layouts/not-found-page-details";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import useDetailDaftarPeminjamanFeature from "./hook";

const DaftarPeminjamanDetailFeature = ({
  params,
}: {
  params: { id: string };
}) => {
  const { router, alertAccept, setAlertAccept, alertReject, setAlertReject } =
    useDetailDaftarPeminjamanFeature();

  const { data, isLoading, isError } = useDaftarPinjamDetail(params.id);

  const { mutate: mutateAccept, isPending: pendingAccept } =
    useAcceptProsesPinjam(params.id, router);

  const { mutate: mutateReject, isPending: pendingReject } =
    useRejectProsesPinjam(params.id, router);

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
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold text-gray-800">
            Detail Peminjaman Ruangan
          </h1>
          <div className="w-full max-w-[60vw]">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Nama Peminjam</TableCell>
                  <TableCell>
                    {data?.data.detailPeminjamanRuangan[0].employeeName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Divisi Peminjam</TableCell>
                  <TableCell>
                    {data?.data.detailPeminjamanRuangan[0].employeeDivision}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">NIK Karyawan</TableCell>
                  <TableCell>
                    {data?.data.detailPeminjamanRuangan[0].employeeNik}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell>
                    {data?.data.detailPeminjamanRuangan[0].employeeEmail}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Phone</TableCell>
                  <TableCell>
                    {data?.data.detailPeminjamanRuangan[0].employeePhone}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Ruang yang dipinjam
                  </TableCell>
                  <TableCell className="font-medium">
                    {data?.data.detailPeminjamanRuangan[0].ruangan}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Tanggal Peminjaman
                  </TableCell>
                  <TableCell className="font-medium">
                    {new Date(
                      data?.data.detailPeminjamanRuangan[0].date,
                    ).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jam Peminjaman</TableCell>
                  <TableCell className="font-medium">
                    {data?.data.detailPeminjamanRuangan[0].startHour} -{" "}
                    {data?.data.detailPeminjamanRuangan[0].endHour}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jumlah Orang</TableCell>
                  <TableCell>
                    {data?.data.detailPeminjamanRuangan[0].people} Orang
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Keperluan</TableCell>
                  <TableCell>
                    {data?.data.detailPeminjamanRuangan[0].necessity}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tambahan lain</TableCell>
                  <TableCell>
                    {data?.data.detailPeminjamanRuangan[0].additional}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Sapras yang dipinjam
                  </TableCell>
                  <TableCell>
                    {data?.data?.detailPeminjamanRuangan[0].saprasPeminjaman
                      .length > 0 ? (
                      data?.data?.detailPeminjamanRuangan[0].saprasPeminjaman.map(
                        (item: any, index: number) => (
                          <span key={index} className="text-gray-700">
                            {item.name} - {item.quantity} Item
                          </span>
                        ),
                      )
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>
                    {
                      <h3
                        className={cn(
                          `${statusColor(data?.data.status)} font-medium`,
                        )}
                      >
                        <span>{data?.data.status}</span>
                      </h3>
                    }
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </ScrollArea>
      <div className="absolute right-0 top-0 flex flex-col items-end gap-2">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Link href={ROUTES_PATH.dashboardAdmin.daftarPeminjaman}>
                  <ChevronLeft />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Kembali</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {data?.data.status === "Disetujui" ? null : (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="bg-green-400 hover:bg-green-400/80"
                  onClick={() => setAlertAccept(true)}
                >
                  <CheckCheck />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Setujui</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {data?.data.status === "Ditolak" ? null : (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="bg-yellow-400 hover:bg-yellow-400/80"
                  onClick={() => setAlertReject(true)}
                >
                  <CircleMinus />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Tolak</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <AlertDialog
        open={alertAccept}
        onOpenChange={(isOpen) => setAlertAccept(isOpen)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Setujui peminjaman ruang ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan menyetujui peminjaman ruangan ini. Pastikan semua
              informasi sudah benar dan sesuai.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kembali</AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-500 hover:bg-green-500/80"
              disabled={pendingAccept}
              onClick={() => {
                mutateAccept();
              }}
            >
              Konfirmasi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={alertReject}
        onOpenChange={(isOpen) => setAlertReject(isOpen)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tolak peminjaman ruang ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan menolak peminjaman ruangan ini. Pastikan sudah sesuai
              dan benar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kembali</AlertDialogCancel>
            <AlertDialogAction
              className="bg-yellow-500 hover:bg-yellow-500/80"
              disabled={pendingReject}
              onClick={() => {
                mutateReject();
              }}
            >
              Konfirmasi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DaftarPeminjamanDetailFeature;
