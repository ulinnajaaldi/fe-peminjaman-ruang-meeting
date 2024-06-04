import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusColor = (status: string) => {
  switch (status) {
    case "Disetujui":
      return "text-green-500";
    case "Ditolak":
      return "text-red-500";
    case "Menunggu Persetujuan":
      return "text-yellow-500";
    default:
      return "text-black";
  }
};

export const getCookie = () => Cookies.get("access_token");
export const setCookie = (value: string) => Cookies.set("access_token", value);
export const removeCookie = () => Cookies.remove("access_token");
