"use client"

import { useState } from "react"

export function TextInfo(props: {
  value?: string
  editable?: boolean
  onSubmit?: (value: string) => void
}) {
  const [editing, setEditing] = useState(false)
  return (
    <div>
      {editing ? (
        <input
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
            if (props.editable) {
              setEditing(true)
            }
          }}
        >
          {props.value}
        </div>
      )}
    </div>
  )
}
