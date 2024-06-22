"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DialogForm } from "../types";

const DialogForm: React.FC<DialogForm> = (props) => {
  const {
    mutate,
    mutateSapras,
    isLoadingSapras,
    dataSarpras,
    isPending,
    isPinjam,
    setIsPinjam,
    saranaSelected,
    setSaranaSelected,
    saranaForm,
    setSaranaForm,
    form,
    checkKetersediaan,
    setCheckKetersediaan,
    handleKetersedian,
    isPendingCheck,
  } = props;

  return (
    <Dialog
      open={isPinjam}
      onOpenChange={(isOpen) => {
        setIsPinjam(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Proses peminjaman ruangan</DialogTitle>
          <DialogDescription>
            Silahkan isi form dibawah ini untuk meminjam ruangan
          </DialogDescription>
        </DialogHeader>
        {isPinjam && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((value) => {
                mutate(value);
              })}
            >
              <ScrollArea className="h-[80vh] px-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col px-1">
                      <FormLabel>
                        Tanggal Peminjaman{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pilih tanggal</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                            onDayClick={() => {
                              setCheckKetersediaan(false);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-5 px-1 pt-3">
                  <FormField
                    control={form.control}
                    name="startHour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Jam Mulai <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            min="08:00"
                            max="17:00"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endHour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Jam Selesai <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            min="08:00"
                            max="18:00"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="employeeName"
                    render={({ field }) => (
                      <FormItem className="px-1 pt-3">
                        <FormLabel>
                          Nama Karyawan <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="eg: Max Bison"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="employeeDivision"
                  render={({ field }) => (
                    <FormItem className="px-1 pt-3">
                      <FormLabel>
                        Divisi Karyawan <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="eg: IT, HRD, dll"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employeeNik"
                  render={({ field }) => (
                    <FormItem className="px-1 pt-3">
                      <FormLabel>
                        Nomor Karyawan <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="eg: 1234567890"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employeeEmail"
                  render={({ field }) => (
                    <FormItem className="px-1 pt-3">
                      <FormLabel>
                        Email Karyawan <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          type="email"
                          placeholder="eg: example@email.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employeePhone"
                  render={({ field }) => (
                    <FormItem className="px-1 pt-3">
                      <FormLabel>
                        Nomor HP Karyawan{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="eg: 08"
                          className="w-full"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="people"
                  render={({ field }) => (
                    <FormItem className="px-1 pt-3">
                      <FormLabel>
                        Jumlah Orang <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg: 10"
                          type="number"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="necessity"
                  render={({ field }) => (
                    <FormItem className="px-1 pt-3">
                      <FormLabel>
                        Keperluan <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="eg: Rapat, Seminar, dll"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additional"
                  render={({ field }) => (
                    <FormItem className="px-1 pt-3">
                      <FormLabel>
                        Informasi Tambahan{" "}
                        <span className="text-xs">(optional / isikan -)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          placeholder="eg: Snack, Air Mineral, dll"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {saranaSelected.length > 0 && (
                  <div className="px-1 pt-3">
                    <FormLabel>Sarana dan Prasarana Tambahan</FormLabel>
                    <div className="flex flex-col gap-2">
                      {saranaSelected.map((sarana: any) => (
                        <div
                          key={sarana.id}
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={sarana.images || "/images/placeholder.jpg"}
                              alt={sarana.name}
                              width={50}
                              height={50}
                            />
                            <p className="text-xs sm:text-sm lg:text-base">
                              {sarana.name}
                            </p>
                          </div>
                          <div className="flex flex-1 items-center gap-2">
                            <Input
                              type="number"
                              placeholder="Jumlah yang dipinjam"
                              className="min-w-28 text-xs sm:text-sm lg:text-base"
                              min="1"
                              max={
                                saranaSelected.find(
                                  (item: any) => item.id === sarana.id,
                                ).ammount
                              }
                              value={
                                saranaForm.find(
                                  (item: any) => item.idSapras === sarana.id,
                                )?.quantity
                              }
                              onChange={(e) => {
                                setSaranaForm((prev: any) =>
                                  prev.map((item: any) =>
                                    item.idSapras === sarana.id
                                      ? {
                                          ...item,
                                          quantity: e.target.value,
                                        }
                                      : item,
                                  ),
                                );
                              }}
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                setSaranaSelected((prev: any) =>
                                  prev.filter((item: any) => item !== sarana),
                                );
                                setSaranaForm((prev: any) =>
                                  prev.filter(
                                    (item: any) => item.idSapras !== sarana.id,
                                  ),
                                );
                              }}
                            >
                              <X className={cn("h-4 w-4")} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="px-1 pb-10 pt-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          mutateSapras();
                        }}
                      >
                        Sarana dan Prasarana
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="flex flex-col gap-5 px-4 py-2">
                        {isLoadingSapras ? (
                          <div>Loading...</div>
                        ) : (
                          dataSarpras?.data?.map((sarpras: any) => (
                            <div
                              key={sarpras.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={sarpras.name}
                                checked={
                                  saranaSelected.find(
                                    (item: any) => item.id === sarpras.id,
                                  ) !== undefined
                                }
                                disabled={
                                  saranaSelected.find(
                                    (item: any) => item.id === sarpras.id,
                                  ) !== undefined
                                }
                                onCheckedChange={() => {
                                  setSaranaSelected((prev: any) =>
                                    prev.includes(sarpras)
                                      ? prev.filter(
                                          (item: any) => item !== sarpras,
                                        )
                                      : [...prev, sarpras],
                                  );

                                  setSaranaForm((prev: any) =>
                                    prev.includes(sarpras)
                                      ? prev.filter(
                                          (item: any) => item !== sarpras,
                                        )
                                      : [
                                          ...prev,
                                          {
                                            idSapras: sarpras.id,
                                            quantity: "1",
                                          },
                                        ],
                                  );
                                }}
                              />
                              <label htmlFor={sarpras.name}>
                                {sarpras.name}
                              </label>
                              <p>({sarpras.ammount})</p>
                              <Image
                                src={
                                  sarpras.images || "/images/placeholder.jpg"
                                }
                                alt={sarpras.name}
                                width={50}
                                height={50}
                              />
                            </div>
                          ))
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </ScrollArea>
              <div className="flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleKetersedian}
                  className={`${checkKetersediaan ? "bg-green-500 hover:bg-green-500/80" : "bg-sky-500 hover:bg-sky-500/80"} text-white`}
                  disabled={
                    !form.getValues("date") ||
                    !form.getValues("startHour") ||
                    !form.getValues("endHour") ||
                    isPendingCheck
                  }
                >
                  Check Ketersediaan Ruangan
                </Button>
                <Button
                  type="submit"
                  disabled={isPending || !checkKetersediaan}
                  className="w-full"
                >
                  Prosess
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
