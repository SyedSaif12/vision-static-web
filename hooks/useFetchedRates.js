import { useEffect, useState } from "react";

export function useFetchedRates() {
      const URL = process.env.NEXT_PUBLIC_BANK_RATE_URL
    const [rates, setRates] = useState(null)

    useEffect(() => {
        ;(async () => {
            const response = await fetch(URL, {
                next: { revalidate: 3600 }
            })
            if (!response.ok) {
                throw new Error('Faild to fetch rates')
            }
            const data = await response.json()
            setRates(data)
        })();
    }, [URL])

    return rates
}