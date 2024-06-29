import { MouseEvent } from "react"

interface FloorComponentProps {
  floor: number
  onClickEvent: (event: MouseEvent<HTMLButtonElement>) => void
}

export function FloorComponent({ floor, onClickEvent }: FloorComponentProps) {
  return (
    <div className="flex p-5 h-floor border border-slate-400 gap-4 items-center z-10" data-floor={floor}>

      {floor < 4 &&
        <button className=" rounded-full bg-slate-300 h-8 w-8 hover:bg-slate-400 transition-all text-center cursor-pointer" onClick={onClickEvent}>↑</button>
      }

      <div className="flex-auto"></div>

      {floor > 1 &&
        <button className="rounded-full bg-slate-300 h-8 w-8 hover:bg-slate-400 transition-all text-center cursor-pointer" onClick={onClickEvent}>↓</button>
      }

    </div>
  )
}