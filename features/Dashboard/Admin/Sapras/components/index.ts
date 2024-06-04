import dynamic from "next/dynamic";

export const AlertDialogDelete = dynamic(
  () =>
    import("@/features/Dashboard/Admin/Sapras/components/alert-dialog-delete"),
);
