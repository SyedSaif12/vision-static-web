// Data ke hisaab se FAQs: jo cheez bank data mein hi nahi, uska sawal bhi nahi dikhega.
export function getFaqs({ hasZeroMarkup, hasIslamic }) {
  return [
    {
      q: "Do I need a credit card?",
      a: "Yes. Instalment plans run on the credit card of one of the supported banks. The bank converts your purchase into monthly payments. If you do not have a partner-bank credit card, you can still pay by cash on delivery or bank transfer.",
    },
    hasZeroMarkup && {
      q: "Is there really 0% markup?",
      a: "Yes, on the plans marked Free in the comparison table. You pay exactly the sticker price, split into equal monthly payments. Longer plans carry a bank markup.",
    },
    {
      q: "How is the markup charged?",
      a: "The markup is a one-time percentage added to the full price for the plan you choose. The total is then split into equal monthly payments. It is not charged per month, and longer plans cost more.",
    },
    {
      q: "Which products can I buy on instalments?",
      a: "Most products on WeGot are eligible as long as the order is above your bank's minimum instalment amount. Choose 'Pay in instalments' at checkout, or message us if you are unsure about a product.",
    },
    hasIslamic && {
      q: "Are Islamic instalment plans available?",
      a: "Yes. Our Islamic banking partners offer Shariah-compliant plans that use a profit rate instead of interest. They are marked Islamic in the comparison table.",
    },
    {
      q: "What if I want to pay it off early?",
      a: "Early settlement rules and any charges are set by your bank. Please check with your bank before closing the plan, or message us and we will guide you.",
    },
  ].filter(Boolean);
}
