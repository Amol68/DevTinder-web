import { twMerge } from "tailwind-merge";

export default function classNames(...classes) {
  return twMerge(classes.filter(Boolean).join(" "));
}
