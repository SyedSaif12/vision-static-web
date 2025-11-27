// "use client";

// import { useEffect, useState } from "react";

// const TawkTo = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const propertyId = process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID;
//     const widgetId = process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID;

//     console.log("TawkTo: Property ID:", propertyId);
//     console.log("TawkTo: Widget ID:", widgetId);

//     if (!propertyId || !widgetId) {
//       console.error("Tawk.to IDs not found");
//       return;
//     }

//     if (window.Tawk_API) {
//       setIsLoaded(true);
//       return;
//     }

//     console.log("TawkTo: Loading script...");

//     const script = document.createElement("script");
//     script.async = true;
//     script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
//     script.charset = "UTF-8";
//     script.setAttribute("crossorigin", "*");

//     script.onload = () => {
//       console.log("Tawk.to loaded successfully");
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
