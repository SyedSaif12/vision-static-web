import * as senitizeHTML from "sanitize-html";
export default function Seocontent({ content, className = "" }) {
  const cleanedHTML = cleanBrokenChars(content || "");
  const html = senitizeHTML(cleanedHTML);

  return (
    <div className={className}>
      <div
        className="prose max-w-none "
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}

function cleanBrokenChars(text = "") {
  return text
    .replace(/\uFFFD/g, "") // � remove
    .replace(/\?\?/g, "") // ?? remove
    .replace(/[^\x00-\x7F]/g, ""); // non-ASCII remove
}
