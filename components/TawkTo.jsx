// "use client";

// import { useEffect, useState } from "react";

// const TawkTo = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const propertyId = process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID;
//     const widgetId = process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID;


//     if (!propertyId || !widgetId) {
//       console.error("Tawk.to IDs not found");
//       return;
//     }

//     if (window.Tawk_API) {
//       setIsLoaded(true);
//       return;
//     }


//     const script = document.createElement("script");
//     script.async = true;
//     script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
//     script.charset = "UTF-8";
//     script.setAttribute("crossorigin", "*");

//     script.onload = () => {
//       setIsLoaded(true);
//     };

//     script.onerror = () => {
//       console.error("Failed to load Tawk.to");
//       setIsLoaded(false);
//     };

//     document.head.appendChild(script);

//     return () => {
//       if (document.head.contains(script)) {
//         document.head.removeChild(script);
//       }
//     };
//   }, []);

//   return null;
// };

// export default TawkTo;
