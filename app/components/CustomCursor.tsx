"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "active";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      // мгновенно, без React
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      const target = e.target as HTMLElement;
      const pointer = !!target.closest(
        "a, button, [role='button'], [data-cursor='pointer']"
      );

      setIsPointer(pointer);

      if (state !== "active") {
        setState(pointer ? "hover" : "default");
      }
    };

    const down = () => {
      if (isPointer) setState("active");
    };

    const up = () => {
      setState(isPointer ? "hover" : "default");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [isPointer, state]);

  const isHover = state === "hover" || state === "active";

  const size = isHover ? 32 : 40;
  const thickness = isHover ? 6 : 2;
  const color = state === "active" ? "#3F3E3D" : "#0100F4";
  const borderRadius = isHover ? 4 : 0;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
    >
      {/* Horizontal */}
      <div
        style={{
          position: "absolute",
          width: size,
          height: thickness,
          backgroundColor: color,
          borderRadius,
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.1s cubic-bezier(0.4, 0, 0.2, 1), height 0.1s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.1s, border-radius 0.1s",
        }}
      />
      {/* Vertical */}
      <div
        style={{
          position: "absolute",
          width: thickness,
          height: size,
          backgroundColor: color,
          borderRadius,
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.1s cubic-bezier(0.4, 0, 0.2, 1), height 0.1s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.1s, border-radius 0.1s",
        }}
      />
    </div>
  );
}
