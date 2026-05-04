/* eslint-disable react-hooks/exhaustive-deps */
import { useGetProductsQuery } from "@/redux/product/productSlice";
import { useEffect, useRef, useState } from "react";

// create custom hook for handling all filtered products
export function useFetchProducts(
  category,
  subCategory = '',
  initialData = [],
  initialTotal = 0,
  selectedPills = "",
) {
  const [filters, setFilters] = useState({});
  const [select, setSelect] = useState(selectedPills);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [products, setProducts] = useState(initialData);
  const [hasMore, setHasMore] = useState(initialData.length < initialTotal);
  const [reset, setReset] = useState(false);
  const [skip, setSkip] = useState(true);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (initialData.length === 0 && initialTotal > 0) {
        setSkip(false);
      }
      return;
    }
    // reset effects
    setSkip(false);
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setReset(false);
  }, [select, category, subCategory, reset]);
  // redux RTK query to get peramerters
  const {
    isLoading,
    isFetching,
    isError,
    currentData: data,
  } = useGetProductsQuery(
    {
      // required peramerters pass
      category,
      ...(subCategory.length && { subCategory }),
      ...(select && { name: select }),
      ...(Object.keys(filters).length > 0 && {
        ...filters,
        paginate: true,
      }),
      page,
      limit,
    },
    {
      skip: skip,
      refetchOnMountOrArgChange: true,
      pollingInterval: 0,
    },
  );

  useEffect(() => {
    if (data?.data?.list) {
      if (page === 1) {
        setProducts(data?.data?.list);
      } else {
        setProducts((prev) => [...prev, ...data?.data?.list]);
      }
      setHasMore(
        products?.length + data?.data?.list?.length < (data?.total || 0),
      );
    }
  }, [data]);

  return {
    filters,
    setFilters,
    select,
    setSelect,
    hasMore,
    setHasMore,
    products,
    setProducts,
    page,
    setPage,
    skip,
    setSkip,
    isLoading,
    isError,
    isFetching,
    setLimit,
    setReset,
    totalProducts: data?.total || initialTotal,
  };
}
