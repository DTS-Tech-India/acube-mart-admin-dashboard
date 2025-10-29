import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Simple confirmation helper for destructive actions
// Returns a Promise<boolean> to make it easy to await in handlers
export function confirmAction(message = "Are you sure you want to proceed? This action is irreversible.") {
  // window.confirm is sufficient here and avoids adding UI coupling in column files
  try {
    // Ensure it also works in server rendering contexts by guarding window
    if (typeof window === "undefined") {
      return Promise.resolve(false)
    }
    const ok = window.confirm(message)
    return Promise.resolve(ok)
  } catch (_) {
    return Promise.resolve(false)
  }
}
