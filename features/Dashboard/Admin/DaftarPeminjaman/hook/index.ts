"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

const useDaftarPeminjamanFeature = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);

  return {
    page,
    setPage,
    limit,
    setLimit,
    status,
    setStatus,
    search,
    setSearch,
    value,
  };
};

export default useDaftarPeminjamanFeature;
