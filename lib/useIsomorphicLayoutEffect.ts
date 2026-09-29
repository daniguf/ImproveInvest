"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` warns ("does nothing on the server") when a client component
 * is server-rendered, which these pages now are. The server falls back to
 * `useEffect`; the browser keeps the layout effect, so GSAP still sets up before
 * paint.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export default useIsomorphicLayoutEffect;
