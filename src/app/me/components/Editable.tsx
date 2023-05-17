"use client"

import { useEffect, useRef, useState } from "react"

export function Editable(props: { value?: string; onSubmit?: (value: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState(false)
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])
  return (
    <div>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          className="px-2 text-white bg-white/10 rounded"
          defaultValue={props.value}
          onBlur={(e) => {
            setEditing(false)
            props.onSubmit?.(e.currentTarget.value)
          }}
        />
      ) : (
        <div
          onClick={() => {
            setEditing(true)
          }}
        >
          {props.value}
        </div>
      )}
    </div>
  )
}
