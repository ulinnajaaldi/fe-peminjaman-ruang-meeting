"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

const useDashboardRuanganFeature = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);

  return {
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    value,
  };
};

export default useDashboardRuanganFeature;
