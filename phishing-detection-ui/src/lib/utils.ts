import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Combine Tailwind and other classes.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
