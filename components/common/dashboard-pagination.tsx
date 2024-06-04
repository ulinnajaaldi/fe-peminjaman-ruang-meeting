import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DashboardPaginationProps {
  page: number;
  limit: number;
  data: any;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const DashboardPagination: React.FC<DashboardPaginationProps> = (props) => {
  const { page, limit, data, handlePrevPage, handleNextPage } = props;

  return (
    <div className="flex items-center justify-between">
      <Button
        className="flex items-center justify-center"
        variant="outline"
        disabled={page === 1}
        onClick={handlePrevPage}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      <Button
        className="flex items-center justify-center"
        variant="outline"
        disabled={data?.data.length < limit}
        onClick={handleNextPage}
      >
        <ChevronRight className="mr-2 h-4 w-4" /> Next
      </Button>
    </div>
  );
};

export default DashboardPagination;
