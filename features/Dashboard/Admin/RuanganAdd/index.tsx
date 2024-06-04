"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { UploadButton } from "@/lib/uploadthings";
import { useCreateRuangan } from "@/useCases/RuanganUseCases";
import { ROUTES_PATH } from "@/constants/routes";
import { quillFormats, quillModules } from "@/constants/quill";
import { ActionChangeImage } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDashboardRuanganAdd from "./hook";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const DashboardRuanganAddFeature = () => {
  const router = useRouter();

  const {
    description,
    setDescription,
    facilities,
    setFacilities,
    image1,
    setImage1,
    image2,
    setImage2,
    image3,
    setImage3,
    image4,
    setImage4,
    image5,
    setImage5,
    image6,
    setImage6,
    IsImageUpload,
    setIsImageUpload,
    form,
    imagesArray,
    handleImageUpload,
  } = useDashboardRuanganAdd();

  const { mutate, isPending } = useCreateRuangan(
    description,
    imagesArray,
    facilities,
    router,
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Tambah Ruangan Baru</h1>
        <Button variant="outline" size="icon" asChild>
          <Link href={ROUTES_PATH.dashboardAdmin.ruangan}>
            <ChevronLeft />
          </Link>
        </Button>
      </div>

      <ScrollArea className="mt-5 h-[80vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              mutate(data);
            })}
            className="pl-1 pr-3"
          >
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Ruangan</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. Ruang A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="h-full space-y-2">
                <FormLabel>Deskripsi Ruangan</FormLabel>
                <QuillEditor
                  value={description}
                  onChange={(value) => setDescription(value)}
                  modules={quillModules}
                  formats={quillFormats}
                  className="h-[70%] w-full bg-white pb-8"
                />
              </div>

              <div>
                <FormLabel>Gambar Ruangan</FormLabel>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    {image1 === "" ? (
                      <div className="rounded-lg border border-dashed py-10">
                        <UploadButton
                          endpoint="imageUploader"
                          onUploadBegin={handleImageUpload}
                          onClientUploadComplete={(res) => {
                            setImage1(res[0].url);
                            setIsImageUpload(false);
                            toast.success("Gambar 1 berhasil diupload");
                          }}
                          onUploadError={() => {
                            toast.error("Gambar 1 gagal diupload");
                          }}
                        />
                      </div>
                    ) : (
                      <div className="relative flex gap-2">
                        <Image
                          src={image1 || "/images/placeholder.jpg"}
                          alt="ruangan-gambar-1"
                          width={400}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute right-0 top-0 m-2">
                          <ActionChangeImage
                            action={(e) => {
                              e.preventDefault();
                              setImage1("");
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {image2 === "" ? (
                      <div className="rounded-lg border border-dashed py-10">
                        <UploadButton
                          endpoint="imageUploader"
                          onUploadBegin={handleImageUpload}
                          onClientUploadComplete={(res) => {
                            setImage2(res[0].url);
                            setIsImageUpload(false);
                            toast.success("Gambar 2 berhasil diupload");
                          }}
                          onUploadError={() => {
                            toast.error("Gambar 2 gagal diupload");
                          }}
                        />
                      </div>
                    ) : (
                      <div className="relative flex gap-2">
                        <Image
                          src={image2 || "/images/placeholder.jpg"}
                          alt="ruangan-gambar-2"
                          width={400}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute right-0 top-0 m-2">
                          <ActionChangeImage
                            action={(e) => {
                              e.preventDefault();
                              setImage2("");
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {image3 === "" ? (
                      <div className="rounded-lg border border-dashed py-10">
                        <UploadButton
                          endpoint="imageUploader"
                          onUploadBegin={handleImageUpload}
                          onClientUploadComplete={(res) => {
                            setImage3(res[0].url);
                            setIsImageUpload(false);
                            toast.success("Gambar 3 berhasil diupload");
                          }}
                          onUploadError={() => {
                            toast.error("Gambar 3 gagal diupload");
                          }}
                        />
                      </div>
                    ) : (
                      <div className="relative flex gap-2">
                        <Image
                          src={image3 || "/images/placeholder.jpg"}
                          alt="ruangan-gambar-3"
                          width={400}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute right-0 top-0 m-2">
                          <ActionChangeImage
                            action={(e) => {
                              e.preventDefault();
                              setImage3("");
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {image4 === "" ? (
                      <div className="rounded-lg border border-dashed py-10">
                        <UploadButton
                          endpoint="imageUploader"
                          onUploadBegin={handleImageUpload}
                          onClientUploadComplete={(res) => {
                            setImage4(res[0].url);
                            setIsImageUpload(false);
                            toast.success("Gambar 4 berhasil diupload");
                          }}
                          onUploadError={() => {
                            toast.error("Gambar 4 gagal diupload");
                          }}
                        />
                      </div>
                    ) : (
                      <div className="relative flex gap-2">
                        <Image
                          src={image4 || "/images/placeholder.jpg"}
                          alt="ruangan-gambar-4"
                          width={400}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute right-0 top-0 m-2">
                          <ActionChangeImage
                            action={(e) => {
                              e.preventDefault();
                              setImage4("");
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {image5 === "" ? (
                      <div className="rounded-lg border border-dashed py-10">
                        <UploadButton
                          endpoint="imageUploader"
                          onUploadBegin={handleImageUpload}
                          onClientUploadComplete={(res) => {
                            setImage5(res[0].url);
                            setIsImageUpload(false);
                            toast.success("Gambar 5 berhasil diupload");
                          }}
                          onUploadError={() => {
                            toast.error("Gambar 5 gagal diupload");
                          }}
                        />
                      </div>
                    ) : (
                      <div className="relative flex gap-2">
                        <Image
                          src={image5 || "/images/placeholder.jpg"}
                          alt="ruangan-gambar-5"
                          width={400}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute right-0 top-0 m-2">
                          <ActionChangeImage
                            action={(e) => {
                              e.preventDefault();
                              setImage5("");
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {image6 === "" ? (
                      <div className="rounded-lg border border-dashed py-10">
                        <UploadButton
                          endpoint="imageUploader"
                          onUploadBegin={handleImageUpload}
                          onClientUploadComplete={(res) => {
                            setImage6(res[0].url);
                            setIsImageUpload(false);
                            toast.success("Gambar 6 berhasil diupload");
                          }}
                          onUploadError={() => {
                            toast.error("Gambar 6 gagal diupload");
                          }}
                        />
                      </div>
                    ) : (
                      <div className="relative flex gap-2">
                        <Image
                          src={image6 || "/images/placeholder.jpg"}
                          alt="ruangan-gambar-6"
                          width={400}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                        <ActionChangeImage
                          action={(e) => {
                            e.preventDefault();
                            setImage6("");
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="h-full space-y-2">
                <FormLabel>Fasilitas Ruangan</FormLabel>
                <QuillEditor
                  value={facilities}
                  onChange={(value) => setFacilities(value)}
                  modules={quillModules}
                  formats={quillFormats}
                  className="h-[70%] w-full bg-white pb-8"
                />
              </div>

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kapasitas Ruangan (orang)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={IsImageUpload || isPending} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
};

export default DashboardRuanganAddFeature;
