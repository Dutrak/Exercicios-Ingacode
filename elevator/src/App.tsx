import { FloorComponent } from "./components/FloorComponent"

const floors = ["1", "2", "3", "4"]

export function App() {

  return (
    <main className="flex flex-col gap-20 mx-auto mt-10 max-w-3xl">
      <section className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">Elevator - Simulando um elevador</h1>
        <span>
          Esta aplicação faz parte do desafio proposto pela Ingacode, o desafio consiste em um Simulador de um elevador,
          podendo ele processar os pedidos e se mover de acordo.
        </span>
      </section>

      <section className="flex gap-40">

        <div className="flex flex-col justify-center border border-slate-400 w-40 relative">
          {floors.map((value) => {
            return <FloorComponent floor={value} />
          })}
          <div className="flex justify-center box-border absolute bottom-0 w-full h-floor z-0">
            <div className="w-7 bg-black h-full rounded-sm"></div>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-4 h-fit self-center">
          {floors.map((value, index) => {
            return <button key={index} className="rounded-full bg-slate-300 w-10 h-10
             hover:bg-slate-400 transition-all">{value}</button>
          })}
        </div>
      </section>
    </main>
  )
}
