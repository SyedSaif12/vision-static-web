// convert html to plain text format
export function stripHtml(html = '') {
  return html?.replace(/<[^>]+>/g, "");
}