"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Ellipsis } from "lucide-react";
import Link from "next/link";

interface DataTableColumnActionMenuItem {
  routePath: string;
  label: string;
}

interface DataTableColumnActionProps {
  id: string;
  detailRoutePath?: string;
  menuItems?: DataTableColumnActionMenuItem[];
  showDetail?: boolean;
  showDetailModal?: boolean;
  showEdit?: boolean;
  getUserById?: any;
  deleteData: any;
  handleDetailModal?: () => void;
  setIsEdit?: (value: boolean) => void;
  setIsDialogOpen?: (value: boolean) => void;
}

const DataTableColumnAction: React.FC<DataTableColumnActionProps> = (props) => {
  const {
    id,
    detailRoutePath,
    menuItems,
    showDetail,
    showDetailModal,
    showEdit,
    getUserById,
    deleteData,
    handleDetailModal,
    setIsEdit,
    setIsDialogOpen,
  } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="sr-only">Open menu</span>
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      {isDropdownOpen && (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {menuItems?.map((item, index) => (
            <DropdownMenuItem key={index}>
              <Link
                href={`${item.routePath}/${id}`}
                className={`w-full text-start `}
              >
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
          {showDetail && (
            <DropdownMenuItem>
              <Link
                href={`${detailRoutePath}/${id}`}
                className="w-full text-start text-green-600"
              >
                Lihat
              </Link>
            </DropdownMenuItem>
          )}
          {showDetailModal && (
            <DropdownMenuItem>
              <button
                onClick={handleDetailModal}
                className="w-full text-start text-green-600"
              >
                Lihat
              </button>
            </DropdownMenuItem>
          )}
          {showEdit && (
            <DropdownMenuItem>
              <button
                onClick={() => {
                  getUserById(id);
                  setIsEdit && setIsEdit(true);
                  setIsDialogOpen && setIsDialogOpen(true);
                }}
                className="w-full text-start text-amber-600"
              >
                Edit Data
              </button>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full text-start text-red-600">
                  Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah anda yakin ingin menghapus data ini?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini tidak bisa dibatalkan. Ini akan menghapus
                    secara permanen data ini.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button variant="destructive" asChild>
                    <AlertDialogAction onClick={() => deleteData(id)}>
                      Delete
                    </AlertDialogAction>
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default DataTableColumnAction;
