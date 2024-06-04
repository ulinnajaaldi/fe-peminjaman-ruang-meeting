"use client";

import { IRuanganSchema, RuanganSchema } from "@/domain/Ruangan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useDashboardRuanganAdd = () => {
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState("");

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [image6, setImage6] = useState("");

  const [IsImageUpload, setIsImageUpload] = useState(false);

  const form = useForm<IRuanganSchema>({
    resolver: zodResolver(RuanganSchema),
    defaultValues: {
      name: "",
      capacity: 0 as number,
    },
  });

  const imagesArray = [image1, image2, image3, image4, image5, image6].filter(
    Boolean,
  );
  const handleImageUpload = () => {
    setIsImageUpload(true);
  };

  return {
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
  };
};

export default useDashboardRuanganAdd;
