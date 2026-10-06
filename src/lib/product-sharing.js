export function getProductShareUrl(productId, origin) {
  if (!/^[a-f\d]{24}$/i.test(productId)) {
    throw new Error("Invalid product ID");
  }
  return new URL(`/p/${productId}`, origin).toString();
}

export async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Try selection-based copying when clipboard access is unavailable.
    }
  }

  const previousFocus = document.activeElement;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  try {
    textarea.select();
    if (!document.execCommand("copy")) {
      throw new Error("Could not copy share link");
    }
  } finally {
    textarea.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}
