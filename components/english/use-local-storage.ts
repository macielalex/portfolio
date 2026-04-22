"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch {
      // ignore corrupted/localStorage-unavailable values
    }
  }, [key]);

  const set = (nextValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next = typeof nextValue === "function" ? (nextValue as (p: T) => T)(prev) : nextValue;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore local storage write failures
      }
      return next;
    });
  };

  return [value, set] as const;
}
