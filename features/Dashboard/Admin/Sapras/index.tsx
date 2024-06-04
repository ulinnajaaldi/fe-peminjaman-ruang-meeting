"use client";

import React from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import Image from "next/image";

import {
  useCreateSapras,
  useDeleteSapras,
  useGetAllSapras,
  useUpdateSapras,
} from "@/useCases/SaprasUseCases";
import { UploadButton } from "@/lib/uploadthings";
import { quillFormats, quillModules } from "@/constants/quill";
import { ActionChangeImage } from "@/components/common";
import DashboardPagination from "@/components/common/dashboard-pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialogDelete } from "./components";
import useSaprasFeature from "./hook";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const SaprasFeature = () => {
  const {
    page,
    limit,
    search,
    value,
    selectedData,
    isDelete,
    isDialogOpen,
    isEdit,
    description,
    images,
    isImageUpload,
    form,
    handleAdd,
    handleSelected,
    handleImageUpload,
    handleDelete,
    handleNextPage,
    handlePrevPage,
    setIsDialogOpen,
    setIsImageUpload,
    setIsDelete,
    setDescription,
    setImages,
    setSearch,
  } = useSaprasFeature();

  const { data, isLoading, refetch } = useGetAllSapras(page, limit, value);

  const { mutate: mutateAdd, isPending: isPendingAdd } = useCreateSapras(
    description,
    images,
    setIsDialogOpen,
    refetch,
  );

  const { mutate: mutateEdit, isPending: isPendingEdit } = useUpdateSapras(
    selectedData,
    description,
    images,
    setIsDialogOpen,
    refetch,
  );

  const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteSapras(
    selectedData,
    setIsDialogOpen,
    setIsDelete,
    refetch,
  );

  return (
    <div>
      <h1 className="text-4xl font-semibold">
        Sapras <span className="text-base font-normal">(Sarana Prasarana)</span>
      </h1>
      <div className="mt-10 flex items-center justify-between">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAdd}>Tambah Sapras</Button>
      </div>
      <ScrollArea className="mt-5 h-[80vh]">
        <div className="">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              Loading...
            </div>
          ) : data?.data.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              Tidak ada data
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {data?.data.map((item: any) => (
                <div
                  key={item.id}
                  className="flex cursor-pointer flex-col rounded-lg border bg-white p-3 transition duration-300 ease-in-out hover:shadow-md"
                  onClick={() => {
                    handleSelected(item);
                  }}
                >
                  <div className="h-40">
                    <Image
                      src={item.images || "/images/placeholder.jpg"}
                      alt="ruangan-gambar-1"
                      width={400}
                      height={400}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="mt-3">
                    <h1 className="text-lg font-semibold">{item.name}</h1>
                    <p className="text-sm text-gray-500">{item.ammount} pcs</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {data?.totalPage > 1 && (
          <DashboardPagination
            page={page}
            limit={limit}
            data={data}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        )}
        <Dialog
          open={isDialogOpen}
          onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}
        >
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Edit" : "Tambah"}
                Barang
              </DialogTitle>
              <DialogDescription>
                {isEdit
                  ? "Edit/ Hapus barang apabila tidak diperlukan"
                  : "Tambahkan sapras baru untuk kebutuhan peminjaman ruangan"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => {
                  isEdit ? mutateEdit(data) : mutateAdd(data);
                })}
                className="pl-1 pr-3"
              >
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input placeholder="eg. Sapras A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ammount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jumlah</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="h-full space-y-2">
                    <FormLabel>Deskripsi </FormLabel>
                    <QuillEditor
                      value={description}
                      onChange={(value) => setDescription(value)}
                      modules={quillModules}
                      formats={quillFormats}
                      className="h-[70%] w-full bg-white pb-8"
                    />
                  </div>

                  <div>
                    <FormLabel>Gambar</FormLabel>
                    {images === "" ? (
                      <div className="py-5">
                        <UploadButton
                          endpoint="imageUploader"
                          onUploadBegin={handleImageUpload}
                          onClientUploadComplete={(res) => {
                            setImages(res[0].url);
                            setIsImageUpload(false);
                            toast.success("Gambar berhasil diupload");
                          }}
                          onUploadError={() => {
                            toast.error("Gambar gagal diupload");
                          }}
                        />
                      </div>
                    ) : (
                      <div className="relative flex gap-2 pb-5">
                        <div className="relative h-60">
                          <Image
                            src={images || "/images/placeholder.jpg"}
                            alt="ruangan-gambar-1"
                            width={400}
                            height={400}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="absolute right-0 top-0 m-2">
                          <ActionChangeImage
                            action={(e) => {
                              e.preventDefault();
                              setImages("");
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {isEdit ? (
                  <div className="flex items-center justify-between">
                    <Button
                      disabled={
                        isPendingEdit || isImageUpload || isPendingDelete
                      }
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      Hapus Barang
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        isPendingEdit || isImageUpload || isPendingDelete
                      }
                    >
                      Submit Edit
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isPendingAdd || isImageUpload}
                  >
                    Submit
                  </Button>
                )}
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <AlertDialogDelete
          isDelete={isDelete}
          setIsDelete={setIsDelete}
          mutateDelete={mutateDelete}
        />
      </ScrollArea>
    </div>
  );
};

export default SaprasFeature;
