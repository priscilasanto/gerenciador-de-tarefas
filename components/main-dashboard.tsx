"use client"

import { useState } from "react"
import { Calendar } from "@/components/calendar"
import { TaskList } from "@/components/task-list"
import { TaskForm } from "@/components/task-form"
import { ModeToggle } from "@/components/mode-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, ListTodo } from "lucide-react"

export function MainDashboard() {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
    // Request notification permission
    if (Notification.permission === "default") {
      Notification.requestPermission()
    }
    // Show notification
    if (Notification.permission === "granted") {
      new Notification("New Task Added", {
        body: task.title,
        icon: "/favicon.ico",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold">Task Manager Pro</h1>
          <ModeToggle />
        </div>
      </header>
      <main className="container py-6">
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tasks" className="space-x-2">
              <ListTodo className="h-4 w-4" />
              <span>Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="space-x-2">
              <CalendarDays className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="space-y-6">
            <TaskForm onAddTask={addTask} />
            <TaskList tasks={tasks} setTasks={setTasks} />
          </TabsContent>
          <TabsContent value="calendar">
            <Calendar tasks={tasks} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export interface Task {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: "low" | "medium" | "high"
  completed: boolean
}

