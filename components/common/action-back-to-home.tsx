import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

import { ROUTES_PATH } from "@/constants/routes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

const ActionBackToHome = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            asChild
          >
            <Link href={ROUTES_PATH.home}>
              <Home className="h-4 w-4" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Kembali ke homepage</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionBackToHome;
