"use client";

import React, { useEffect, useState } from "react";
import { ISaprasSchema, SaprasSchema } from "@/domain/Sapras";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

const useSaprasFeature = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [value] = useDebounce(search, 100);

  const [selectedData, setSelectedData] = useState<ISaprasSchema>({
    id: "",
    name: "",
    description: "",
    images: "",
    ammount: "",
  });
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string>("");
  const [isImageUpload, setIsImageUpload] = useState<boolean>(false);

  const form = useForm<ISaprasSchema>({
    resolver: zodResolver(SaprasSchema),
    defaultValues: {
      name: "",
      ammount: "",
    },
  });

  useEffect(() => {
    if (selectedData) {
      form.reset({
        name: selectedData.name,
        ammount: selectedData.ammount,
      });
      setDescription(selectedData.description || "");
      setImages(selectedData.images || "");
    } else {
      form.reset({
        name: "",
        ammount: "",
      });
    }
  }, [selectedData, form]);

  const handleAdd = () => {
    setIsDialogOpen(true);
    setIsEdit(false);
    setDescription("");
    setImages("");
    setSelectedData({
      id: "",
      name: "",
      description: "",
      images: "",
      ammount: "",
    });
  };

  const handleSelected = (item: any) => {
    setSelectedData(item);
    setIsEdit(true);
    setIsDialogOpen(true);
  };

  const handleImageUpload = () => {
    setIsImageUpload(true);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDelete(true);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };

  return {
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
  };
};

export default useSaprasFeature;
