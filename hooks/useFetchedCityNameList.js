/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

export const useFetchCityNameList = () => {
    const [isListLoading, setIsListLoading] = useState(false)
    const [cityNameList, setCityNameList] = useState([])

    useEffect(() => {
        if (isListLoading) return
        ;(async () => {
            setIsListLoading(true)
           try {
             const response = await fetch('https://gist.githubusercontent.com/fazalCodeSwifter/eaf018332d269b6133c0c2c8912b65ab/raw/e343ae221fb0330dda08d45d38012f4dfa6540d1/pakistan-city-name.json')
             const data = await response.json()
             setCityNameList(data)
           } catch (error) {
            console.error('Error:', error)
           } finally {
            setIsListLoading(false)
           }
        })();
    }, [])

    return { isListLoading, cityNameList }
}