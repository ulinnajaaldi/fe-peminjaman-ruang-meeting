export interface AlertDeleteProps {
  title: string;
  isDialogDeleteOpen: boolean;
  setIsDialogDeleteOpen: (open: boolean) => void;
  mutateDelete: () => void;
  isPendingDelete: boolean;
}

export interface ActionChangeImageProps {
  action: (e: any) => void;
  title?: string;
}
