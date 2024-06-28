interface FloorComponentProps {
  floor: string
}

export function FloorComponent({ floor }: FloorComponentProps) {
  return (
    <div className="flex p-5 h-floor border border-slate-400 gap-4 items-center z-10" data-floor={floor}>
      <button className=" rounded-full bg-slate-300 h-8 w-8
             hover:bg-slate-400 transition-all text-center cursor-pointer">↑</button>
      <div className="flex-auto"></div>
      <button className="rounded-full bg-slate-300 h-8 w-8
             hover:bg-slate-400 transition-all text-center cursor-pointer">↓</button>
    </div>
  )
}