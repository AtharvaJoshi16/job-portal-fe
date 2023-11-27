/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export function useEffectAsync(effect, inputs: Array<any>) {
  useEffect(() => {
    return effect();
  }, inputs);
}
