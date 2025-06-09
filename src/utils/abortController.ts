import { MutableRefObject } from "react";

export const resetAbortController = (ref: MutableRefObject<AbortController | null>): AbortController => {
  ref.current?.abort();
  const controller = new AbortController();
  ref.current = controller;
  return controller;
};
