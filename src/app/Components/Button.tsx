"use client"

import { useRef } from "react"

export function Button(
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) {
  const glowBgEl = useRef<HTMLDivElement>(null)
  const onMouseMove = (e: React.MouseEvent) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowBgEl.current!.style.setProperty("--x", `${x}px`)
    glowBgEl.current!.style.setProperty("--y", `${y}px`)
  }
  return (
    <button
      {...props}
      className="group relative px-10 py-3 bg-black text-white rounded-2xl overflow-hidden"
      onMouseMove={onMouseMove}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(225.44deg,#fff,hsla(0,0%,100%,.2) 25%,hsla(0,0%,100%,.2) 75%,hsla(0,0%,100%,.5))",
          }}
        ></div>
        <div className="absolute inset-0 bg-white transition-opacity opacity-0 group-hover:opacity-10"></div>
        <div
          className="absolute inset-px rounded-2xl bg-black"
          style={{
            backgroundImage:
              "linear-gradient(238.51deg,hsla(0,0%,100%,0) 1.7%,hsla(0,0%,100%,.1) 43.93%,hsla(0,0%,100%,0) 109.83%)",
          }}
        ></div>
        <div
          ref={glowBgEl}
          className="absolute inset-px rounded-2xl opacity-0 group-hover:opacity-50"
          style={{
            background: "radial-gradient( circle at var(--x) var(--y), #666, #0000000f )",
            transition: "opacity 0.5s",
          }}
        ></div>
      </div>
      <div className="relative z-10"> {props.children} </div>
    </button>
  )
}
