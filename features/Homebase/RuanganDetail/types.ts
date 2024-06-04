import type { IDetailPeminjamanRuanganSchema } from "@/domain/Ruangan";
import type { UseMutateFunction } from "@tanstack/react-query";
import React, { SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

export interface DialogForm {
  mutate: UseMutateFunction<
    any,
    Error,
    IDetailPeminjamanRuanganSchema,
    unknown
  >;
  mutateSapras: UseMutateFunction<any, Error, void, unknown>;
  dataSarpras: any;
  isLoadingSapras: boolean;
  isPending: boolean;
  isPinjam: boolean;
  setIsPinjam: React.Dispatch<SetStateAction<boolean>>;
  saranaSelected: any;
  setSaranaSelected: React.Dispatch<any>;
  saranaForm: any;
  setSaranaForm: React.Dispatch<any>;
  form: UseFormReturn<IDetailPeminjamanRuanganSchema, any, undefined>;
}
