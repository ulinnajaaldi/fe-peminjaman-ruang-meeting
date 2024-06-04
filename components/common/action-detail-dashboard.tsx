import React from "react";
import Link from "next/link";
import { ChevronLeft, SquarePen, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ActionDetailDashboardProps {
  urlBack: string;
  urlEdit: string;
  handleDelete: () => void;
}

const ActionDetailDashboard: React.FC<ActionDetailDashboardProps> = (props) => {
  const { urlBack, urlEdit, handleDelete } = props;

  return (
    <div className="absolute right-0 top-0 flex flex-col items-center justify-center gap-2">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" asChild>
              <Link href={urlBack}>
                <ChevronLeft />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Kembali</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" asChild>
              <Link href={urlEdit}>
                <SquarePen />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialog>
        <AlertDialogTrigger>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <div>
                    <Trash />
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionDetailDashboard;
