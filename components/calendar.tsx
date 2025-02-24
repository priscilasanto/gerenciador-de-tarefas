"use client"

import { Card } from "@/components/ui/card"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import type { Task } from "./main-dashboard"

interface CalendarProps {
  tasks: Task[]
}

export function Calendar({ tasks }: CalendarProps) {
  const events = tasks.map((task) => ({
    title: task.title,
    start: task.dueDate,
    backgroundColor: task.completed ? "#94a3b8" : getPriorityColor(task.priority),
    textColor: "#ffffff",
    extendedProps: {
      description: task.description,
    },
  }))

  function getPriorityColor(priority: string) {
    switch (priority) {
      case "high":
        return "#ef4444"
      case "medium":
        return "#eab308"
      case "low":
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
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <div className="font-medium">{eventInfo.event.title}</div>
            {eventInfo.view.type !== "dayGridMonth" && (
              <div className="text-xs">{eventInfo.event.extendedProps.description}</div>
            )}
          </div>
        )}
        height="auto"
        aspectRatio={1.5}
      />
    </Card>
  )
}

