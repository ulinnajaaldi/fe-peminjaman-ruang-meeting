import React from "react";
import { Replace } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionChangeImageProps {
  action: (e: any) => void;
}

const ActionChangeImage: React.FC<ActionChangeImageProps> = ({ action }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" onClick={action}>
            <Replace />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Ganti Gambar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionChangeImage;
