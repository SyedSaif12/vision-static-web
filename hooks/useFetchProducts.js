/* eslint-disable react-hooks/exhaustive-deps */
import {
  useGetFiltersMutation,
  useGetProductsQuery,
} from "@/redux/product/productSlice";
import { useEffect, useState } from "react";

// create custom hook for handling all filtered products
export function useFetchProducts(category, subCategory) {
  const [filters, setFilters] = useState({});
  const [select, setSelect] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    // reset effects
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
      subCategory,
      ...(select && { name: select }),
      ...(Object.entries(filters).length > 0 && {
        ...filters,
        paginate: false,
      }),
      page,
      limit,
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 0,
    },
  );

  useEffect(() => {
    // handle all filters are here.
    if (data?.data && data?.total !== undefined) {
      if (Object.entries(filters).length > 0 && page === 1) {
        setProducts([]);
      }
      setProducts((prev) => {
        const updatedProducts = [...prev, ...data?.data?.list];

        if (updatedProducts.length >= data.total) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        return updatedProducts;
      });
    }
  }, [data, reset, filters]);

  return {
    setFilters,
    totalProducts: data?.total,
    setPage,
    setLimit,
    select,
    hasMore,
    setSelect,
    isLoading,
    isError,
    products,
    isFetching,
    setReset,
  };
}

// create custom hook for fetch all chips as main product title and filter sets
export function useFetchAllChips(category, subCategory) {
  const [getFilters, { data: filters }] = useGetFiltersMutation();
  useEffect(() => {
    if (category) {
      getFilters({ category, subCategory });
    }
  }, [category, getFilters]);
  const { isLoading, data } = useGetProductsQuery({
    category,
    subCategory,
  });

  return {
    loading: isLoading,
    chips: data,
    filters,
  };
}
