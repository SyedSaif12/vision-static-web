import { useGetProductsQuery } from "@/redux/product/productSlice";
import { useEffect, useState } from "react";

// create custom hook for fetch all chips as main product title and filter sets
function useDebounced(value, delay) {
    const [debounced, setDebounced] = useState('')
  useEffect(() => {
    const debouncedHandler = setTimeout(() => {
        setDebounced(value)
    }, delay);

    return () => clearTimeout(debouncedHandler)
  }, [value, delay]);

  return debounced
}


export function useSearchQuery({ delay }) {
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounced(search, delay)
    const { isLoading, isFetching, data } = useGetProductsQuery(
        {
            searchQuery: debouncedSearch.trim(),
            limit: 6,
            chip: 'false'
        },
        {
            skip: !debouncedSearch.trim()
        }
    )

    return {
        search,
        setSearch,
        isLoading,
        isFetching,
        data
    }
}