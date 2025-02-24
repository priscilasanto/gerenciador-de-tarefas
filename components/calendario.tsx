"use client"

import { Card } from "@/components/ui/card"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import ptBrLocale from "@fullcalendar/core/locales/pt-br"
import type { Tarefa } from "./painel-principal"

interface CalendarioProps {
  tarefas: Tarefa[]
}

export function Calendario({ tarefas }: CalendarioProps) {
  const eventos = tarefas.map((tarefa) => ({
    title: tarefa.titulo,
    start: tarefa.dataVencimento,
    backgroundColor: tarefa.concluida ? "#94a3b8" : getCorPrioridade(tarefa.prioridade),
    textColor: "#ffffff",
    extendedProps: {
      descricao: tarefa.descricao,
    },
  }))

  function getCorPrioridade(prioridade: string) {
    switch (prioridade) {
      case "alta":
        return "#ef4444"
      case "media":
        return "#eab308"
      case "baixa":
        return "#22c55e"
      default:
        return "#64748b"
    }
  }

  return (
    <Card className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={ptBrLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        }}
        events={eventos}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <div className="font-medium">{eventInfo.event.title}</div>
            {eventInfo.view.type !== "dayGridMonth" && (
              <div className="text-xs">{eventInfo.event.extendedProps.descricao}</div>
            )}
          </div>
        )}
        height="auto"
        aspectRatio={1.5}
      />
    </Card>
  )
}

