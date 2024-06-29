import { CSSProperties, MouseEvent, useRef, useState } from "react"
import { FloorComponent } from "./components/FloorComponent"
import elevatorAudio from './sounds/elevator-audio.wav'

const floors = [4, 3, 2, 1]
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function App() {
  const [currentFloor, setCurrentFloor] = useState(1)
  const isProcessing = useRef<boolean | null>(false)
  const eventQueue = useRef<(() => void)[]>([]);

  const baseHeight = `${96 * (currentFloor - 1)}px`
  const bottomStyle: CSSProperties = { bottom: baseHeight }

  const floorAudio = new Audio(elevatorAudio)

  // Processa uma chamada de um botão
  async function processCall(floor: number) {
    if (currentFloor === floor) return
    setCurrentFloor(floor)
    floorAudio.play()
  }

  // função para lidar com a fila de processos
  async function processQueue() {

    // Retorna se a fila ja estiver em processamento
    if (isProcessing.current) return

    // Retira o processo da fila e o executa, com delay de 5 segundos entre cada execução
    isProcessing.current = true
    while (eventQueue.current.length > 0) {
      const action = eventQueue.current.shift()
      if (action) action()
      await delay(7000) // 2 segundos da animação + 5 segundos do tempo de espera
    }

    // Caso a fila esteja vazia, retorna para o primeiro andar 
    if (eventQueue.current.length === 0) { setCurrentFloor(1) }

    // Muda a referencia de processamento para false
    isProcessing.current = false
  }

  // Manipulador de eventos para os numeros
  function handleNumberFloorClick(event: MouseEvent<HTMLButtonElement>) {
    const newFloor = parseInt(event.currentTarget.innerText)
    eventQueue.current.push(() => processCall(newFloor))
    processQueue()
  }

  // Manipulador de evento para os botoes de cima e baixo
  function handleArrowCickFloor(event: MouseEvent<HTMLButtonElement>) {
    const actualFloor = event.currentTarget?.parentElement?.dataset?.floor
    const arrowType = event.currentTarget.innerText

    if (actualFloor) {

      if (currentFloor != parseInt(actualFloor) && eventQueue.current.length === 0) return

      if (arrowType === '↑') {
        eventQueue.current.push(() => processCall(parseInt(actualFloor) + 1))
        processQueue()
      }

      else if (arrowType === '↓') {
        eventQueue.current.push(() => processCall(parseInt(actualFloor) + -1))
        processQueue()
      }
    }
  }

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
            return <FloorComponent floor={value} key={value} onClickEvent={handleArrowCickFloor} />
          })}
          <div className="flex justify-center box-border absolute w-full h-floor z-0 bottom-[${baseHeight}] bottom-[96px] transition-all duration-[2000ms]" style={bottomStyle}>
            <div className="w-7 bg-black h-full rounded-sm"></div>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-4 h-fit self-center">
          {floors.map((value, index) => {
            return <button key={index} className="rounded-full bg-slate-300 w-10 h-10
             hover:bg-slate-400 transition-all" onClick={event => handleNumberFloorClick(event)}>{value}</button>
          })}
        </div>
      </section>
    </main >
  )
}
