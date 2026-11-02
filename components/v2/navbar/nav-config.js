// ✏️ Yahan apne links add/edit karo
export const supportLinks = [
  { label: "Contact Us", href: "/support-services/contact-us" },
  // { label: "Repair Services", href: "/repair-services" },
  { label: "Warranty Claim", href: "/support-services/warranty-claim" },
];

export const categories = [
  {
    title: "Laptops",
    url: "/products?category=laptops",
    image: "/images/lap-silver.jpg",
  },
  {
    title: "Mobiles",
    url: "/products?category=mobiles",
    image: "/images/phone.jpg",
  },
  {
    title: "Gaming",
    url: "/products?category=gaming-console",
    image: "/images/console.jpg",
  },
  {
    title: "Tablets",
    url: "/products?category=tablets",
    image: "/images/tablet.jpg",
  },
  {
    title: "Printers",
    url: "/products?category=printers",
    image: "/images/printer.avif",
  },
  {
    title: "Wearables",
    url: "/products?category=watches",
    image: "/images/watch.jpg",
  },
  {
    title: "Dyson",
    url: "/products?subCategory=dyson",
    image: "/images/vacuum.jpg",
  },
  {
    title: "Accessories",
    url: "/products?category=accessories",
    image: "/images/mouse.jpg",
  },
  {
    title: "Computers",
    url: "/products?category=computers",
    image: "/images/computer.jpg",
  },
  {
    title: "Drives",
    url: "/products?category=drives",
    image: "/images/ssd.jpg",
  },
  {
    title: "LED Monitors",
    url: "/products?category=led-monitors",
    image: "/images/led.jpg",
  },
  {
    title: "Refurbished",
    url: "/products?tag=refurbished",
    image: "/images/lap-black.jpg",
  },
];

export const mobileNavItems = [
  { id: "shop", label: "Shop", type: "sheet", sheet: "shop", hasArrow: true },
  {
    id: "deals",
    label: "Deals",
    type: "sheet",
    sheet: "deals",
    hasArrow: true,
    accent: true,
  },
  {
    id: "refurbished",
    label: "Refurbished",
    type: "link",
    href: "/products?tag=refurbished",
  },
  {
    id: "laptops",
    label: "Laptops",
    type: "link",
    href: "/products?category=laptops",
  },
  {
    id: "installment",
    label: "Installment",
    type: "link",
    href: "/instalment-plan",
  },
  {
    id: "visit-store",
    label: "Visit Store",
    type: "link",
    href: "/why-us/why-wegot#store",
  },
  // {
  //   id: "tablets",
  //   label: "Tablets",
  //   type: "link",
  //   href: "/products?category=tablets",
  // },
];

export const dealsLink = [
  {
    label: "Featured Products",
    sub: "Handpicked best sellers",
    href: "/products?isFeatured=true",
    icon: "star",
  },
  {
    label: "Deals",
    sub: "Limited-time prices",
    href: "/products?tag=deals",
    icon: "tag",
  },
  {
    label: "Open Box Deals",
    sub: "Box opened, product unused",
    href: "/products?tag=open-box",
    icon: "box",
  },
];

export const whyLinks = [
  { label: "Why WeGot", href: "/why-us/why-wegot" },
  { label: "Privacy Policy", href: "/why-us/privacy-policy" },
  { label: "Return Policy", href: "/why-us/return-policy" },
  { label: "Order Procedure", href: "/why-us/order-procedure" },
];

export const excludeCategory = [
  "hair-dryer",
  "bluetooth-trackers",
  "multi-styler-airwrap",
  "e-book-reader",
  "wireless-earbuds",
  "stylus-pencil",
];

export const categorySequence = [
  "laptops",
  "purifiers",
  "drives",
  "bluetooth-trackers",
  "mobiles",
  "computers",
  "led-monitors",
  "tablets",
  "smartwatches",
  "monitors",
];

// Mobile bottom nav ki height (px). Layout/footer ka padding isi se match hona chahiye.
export const BOTTOM_NAV_HEIGHT = 64;
