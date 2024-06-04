import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const NotFoundPageDetails = () => {
  const router = useRouter();

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold">
        Oops! Halaman tidak ditemukan
      </h2>
      <p>Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <div className="mt-8 flex justify-center gap-2">
        <Button
          id="button-back"
          onClick={() => router.back()}
          variant="default"
          size="lg"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPageDetails;
