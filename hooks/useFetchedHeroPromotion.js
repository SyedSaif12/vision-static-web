/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export function useFetchedHeroPromotion() {
  const URL = process.env.NEXT_PUBLIC_SERVER_LINK;
  const [heroPromotions, setHeroPromotions] = useState(null);
  const [isPromoLoading, setIsPromoLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsPromoLoading(true);
      try {
        const response = await fetch(
          `${URL}/api/hero-promotion?paginate=false&isActive=true`,
          {
            method: "GET",
            next: { revalidate: 3600 },
          },
        );
        if (!response.ok) {
          throw new Error("Faild to fetch hero promotion");
        }
        const data = await response.json();
        setHeroPromotions(data?.data);
      } catch (error) {
        console.error("ERROR: ", error);
        return {
          isPromoLoading,
          heroPromotions: heroPromotions || [],
        };
      } finally {
        setIsPromoLoading(false);
      }
    })();
  }, [URL]);

  return {
    isPromoLoading,
    heroPromotions: heroPromotions || [],
  };
}
