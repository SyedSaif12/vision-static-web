import { baseURL } from "@/redux/utils";
import { useEffect, useState } from "react";

export function useCardCategoryWithImage() {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        ;(async () => {
            try {
               setIsLoading(true)
                const response = await fetch(`${baseURL}category?web=true`,{
                    cache: 'no-store',
                    method: 'GET'
                })
                const responseData = await response.json()
                if(response.ok) {
                    setData(responseData?.data)
                }
            } catch (error) {
                setData([])
            } finally {
                setIsLoading(false)
        }
        })();
    }, [])

    return {
        isLoading,
        data
    }
}