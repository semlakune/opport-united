import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandom(range = 10, canBeNegative = true) {
  let negativeMulti = 1;
  if (canBeNegative) {
    negativeMulti = Math.random() > 0.5 ? -1 : 1;
  }
  return range * Math.random() * negativeMulti;
}

export function getRandomColor() {
  // random pastel color
  return `hsl(${Math.random() * 360}, 100%, 85%)`;
}
