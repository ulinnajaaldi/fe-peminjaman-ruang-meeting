import dynamic from "next/dynamic";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableViewOptions } from "./data-table-view-option";

export const AlertDelete = dynamic(
  () => import("@/components/common/alert-delete"),
);
export const ActionBackToHome = dynamic(
  () => import("@/components/common/action-back-to-home"),
);
export const ActionChangeImage = dynamic(
  () => import("@/components/common/action-change-image"),
);
export const BlurImage = dynamic(
  () => import("@/components/common/blur-image"),
);
export const ActionDetailDashboard = dynamic(
  () => import("@/components/common/action-detail-dashboard"),
);
export const DataTableColumnAction = dynamic(
  () => import("@/components/common/data-table-column-action"),
);
export const DataTableLoader = dynamic(
  () => import("@/components/common/data-table-loader"),
);
export const DataTablePagination = dynamic(
  () => import("@/components/common/data-table-pagination"),
);

export { DataTableColumnHeader, DataTableViewOptions };
