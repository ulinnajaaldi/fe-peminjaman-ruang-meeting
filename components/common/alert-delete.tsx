import React from "react";

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
import type { AlertDeleteProps } from "@/types/ComponentTypes";

const AlertDelete: React.FC<AlertDeleteProps> = (props) => {
  const {
    title,
    isDialogDeleteOpen,
    setIsDialogDeleteOpen,
    mutateDelete,
    isPendingDelete,
  } = props;

  return (
    <AlertDialog
      open={isDialogDeleteOpen}
      onOpenChange={(isOpen) => setIsDialogDeleteOpen(isOpen)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {title}</AlertDialogTitle>
          <AlertDialogDescription>
            Apabila kamu menghapus {title} ini, data tidak dapat dikembalikan.
            Apakah kamu yakin ingin melanjutkan?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutateDelete();
            }}
            className="bg-red-500 text-white transition-all hover:bg-red-500/80"
          >
            {isPendingDelete ? "Loading..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDelete;
