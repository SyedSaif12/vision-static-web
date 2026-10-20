/**
 * Policy pages ka data. Naya page banana ho to bas ek naya object banayein.
 *
 * {
 *   title, subtitle, updated,
 *   metadata: { title, description },
 *   breadcrumbs: [{ label, href? }],
 *   highlights: [{ title, text }],
 *   sections: [{
 *     id,            // sidebar anchor
 *     title,
 *     intro?,        // paragraph (list se pehle)
 *     text?,         // paragraph
 *     items?,        // ["text"] ya [{ label, text }]
 *     note?,         // blue callout box
 *     actions?,      // [{ label, href, variant: "whatsapp" | "outline" }]
 *   }]
 * }
 */

export const privacyPolicy = {
  metadata: {
    title: "Privacy Policy | WeGot",
    description:
      "What we collect, why we need it, and who sees it. In plain words.",
  },
  title: "Privacy Policy",
  subtitle: "What we collect, why we need it, and who sees it. In plain words.",
  updated: "Last updated: to be set on launch",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Why Us", href: "/why-us/why-wegot" },
    { label: "Privacy Policy" },
  ],
  highlights: [
    {
      title: "Only what we need",
      text: "to process your order, deliver it and support you after",
    },
    {
      title: "No selling",
      text: "we do not sell your personal information to anyone",
    },
    {
      title: "Your choice",
      text: "ask us to see, correct or delete your details at any time",
    },
  ],
  sections: [
    {
      id: "what-we-collect",
      title: "What we collect",
      items: [
        {
          label: "Contact details:",
          text: "name, mobile or WhatsApp number, email.",
        },
        {
          label: "Delivery details:",
          text: "addresses you save or enter at checkout.",
        },
        {
          label: "Order details:",
          text: "what you bought, payment method chosen, delivery and warranty records.",
        },
        {
          label: "Device details for services:",
          text: "serial numbers and condition notes for repairs, warranty claims and Trade-In.",
        },
        {
          label: "Website data:",
          text: "pages visited and basic device and browser information.",
        },
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use it",
      items: [
        "To confirm, pack, deliver and track your order.",
        "To send your product video, serial number and delivery updates.",
        "To handle returns, warranty claims, repairs and Trade-In.",
        "To manage Prime membership and member prices.",
        "To improve our website and prevent fraud.",
        "To send offers, only if you agree. You can stop them at any time.",
      ],
    },
    {
      id: "who-we-share-it-with",
      title: "Who we share it with",
      intro: "Only with the people needed to complete your order:",
      items: [
        "Delivery and courier partners, who get your name, number and address.",
        "Payment and instalment partners, who process your payment.",
        "Authorities, when the law requires it.",
      ],
      note: "We do not sell or rent your personal information.",
    },
    {
      id: "payments",
      title: "Payments",
      text: "Card payments are processed by our payment partner. We do not store your full card number. For bank transfers, we keep the payment slip you send us as a record of the order.",
    },
    {
      id: "whatsapp-and-messages",
      title: "WhatsApp and messages",
      text: "When you message us on WhatsApp, we keep the chat to help with your order and after-sales support. Photos and videos you send for a return or warranty claim are used only for that request.",
    },
    {
      id: "cookies",
      title: "Cookies",
      text: "We use cookies and similar storage to keep you signed in, remember your cart and city, and understand how the site is used. You can clear them in your browser settings. Some features, like the cart, may not work without them.",
    },
    {
      id: "how-long-we-keep-it",
      title: "How long we keep it",
      text: "We keep order and warranty records for as long as your warranty runs and as long as required for tax and accounting. Other information is deleted when it is no longer needed.",
    },
    {
      id: "your-choices",
      title: "Your choices",
      items: [
        "Ask for a copy of the information we hold about you.",
        "Correct wrong details, or update them in My account.",
        "Ask us to delete your account and data, except records we must keep by law.",
        "Opt out of offers and marketing messages.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      text: "Questions about your data: contact@wegot.pk, or WhatsApp +92 326 0220581. Store: Shop 29, SAASI Arcade, Block 7, Clifton, Karachi.",
      actions: [
        {
          label: "Ask on WhatsApp",
          href: "https://wa.me/923260220581",
          variant: "whatsapp",
        },
        { label: "Contact us", href: "/contact", variant: "outline" },
      ],
    },
  ],
};

/* TODO: apni asal return policy ka content yahan likhein (same shape). */

export const returnPolicy = {
  metadata: {
    title: "Return Policy | WeGot",
    description: "Simple rules, checked before your parcel leaves our store.",
  },
  title: "Return Policy",
  subtitle: "Simple rules, checked before your parcel leaves our store.",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Why Us", href: "/why-us/why-wegot" },
    { label: "Return Policy" },
  ],
  highlights: [
    {
      title: "7 days",
      text: "to request a return, counted from the day of delivery",
    },
    {
      title: "Unused",
      text: "in original condition, with all packaging, seals and accessories",
    },
    {
      title: "Sealed",
      text: "products cannot be returned once the seal is opened",
    },
  ],
  sections: [
    {
      id: "return-window",
      title: "Return window",
      navLabel: "Return window",
      text: "You can request a return within 7 days of delivery. Requests made after 7 days are not accepted.",
    },
    {
      id: "conditions",
      title: "Conditions for a return",
      navLabel: "Conditions",
      items: [
        "The product is unused and in its original condition.",
        "All original packaging, seals and accessories are with it.",
        "There are no signs of use or damage.",
      ],
      outro:
        "Our team reviews every request. A return is approved only when it meets these conditions.",
    },
    {
      id: "sealed-products",
      title: "Sealed products",
      navLabel: "Sealed products",
      text: "New products come sealed. Once a seal is opened, the product cannot be returned, because opening it reduces its resale value.",
      note: {
        tone: "warning",
        text: "Please check the product video and serial number we send you on WhatsApp before you open the seal.",
      },
    },
    {
      id: "how-to-request",
      title: "How to request a return",
      navLabel: "How to request",
      items: [
        "Message us on WhatsApp within 7 days of delivery with your order number.",
        "Share photos of the product, its packaging and accessories.",
        "Our team checks your request and replies with the next steps.",
      ],
      actions: [
        {
          label: "Request on WhatsApp",
          href: "https://wa.me/923260220581",
          variant: "whatsapp",
        },
        { label: "Contact us", href: "/contact", variant: "outline" },
      ],
    },
    {
      id: "before-we-dispatch",
      title: "What we do before we dispatch",
      navLabel: "Before we dispatch",
      intro:
        "To avoid surprises, every order is checked with you before it leaves:",
      items: [
        "A video of your actual product",
        "A video of it being packed",
        "Serial number verification",
        "Tracking details and the dispatch slip",
      ],
      note: "In Karachi, open-parcel delivery lets you check the product before you pay the rider.",
    },
    {
      id: "returns-vs-warranty",
      title: "Returns vs warranty",
      navLabel: "Returns vs warranty",
      text: "A return is for an unused product within 7 days. If a product develops a fault during its warranty period, use a warranty claim instead.",
      actions: [
        {
          label: "Start a warranty claim",
          href: "/warranty-claim",
          variant: "outline",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      navLabel: "Contact",
      text: "WhatsApp or call +92 326 0220581 or 0331 2405800. Email contact@wegot.pk. Store: Shop 29, SAASI Arcade, Block 7, Clifton, Karachi. Mon to Sat, 9am to 5:30pm.",
    },
  ],
};
