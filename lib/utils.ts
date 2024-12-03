import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(timestamp: Date) {
  const now = new Date();
  const time = new Date(timestamp);
  const differenceInMs = now.getTime() - time.getTime();
  const seconds = Math.floor(differenceInMs / 1000);
  const minutes = Math.floor(differenceInMs / (1000 * 60));
  const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
  const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
}
