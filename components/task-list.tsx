"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { Task } from "./main-dashboard"

interface TaskListProps {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}

export function TaskList({ tasks, setTasks }: TaskListProps) {
  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground">No tasks yet</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                      {task.title}
                    </h3>
                    <Badge variant="secondary" className={`${getPriorityColor(task.priority)} text-white`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <p className="text-sm text-muted-foreground">Due: {new Date(task.dueDate).toLocaleString()}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

