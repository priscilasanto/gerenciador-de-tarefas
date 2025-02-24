"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { Tarefa } from "./painel-principal"

interface ListaTarefasProps {
  tarefas: Tarefa[]
  setTarefas: (tarefas: Tarefa[]) => void
}

export function ListaTarefas({ tarefas, setTarefas }: ListaTarefasProps) {
  const alternarTarefa = (tarefaId: string) => {
    setTarefas(tarefas.map((tarefa) => (tarefa.id === tarefaId ? { ...tarefa, concluida: !tarefa.concluida } : tarefa)))
  }

  const excluirTarefa = (tarefaId: string) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== tarefaId))
  }

  const getCorPrioridade = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-500"
      case "media":
        return "bg-yellow-500"
      case "baixa":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarefas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tarefas.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhuma tarefa ainda</p>
          ) : (
            tarefas.map((tarefa) => (
              <div key={tarefa.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                <Checkbox checked={tarefa.concluida} onCheckedChange={() => alternarTarefa(tarefa.id)} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-medium ${tarefa.concluida ? "line-through text-muted-foreground" : ""}`}>
                      {tarefa.titulo}
                    </h3>
                    <Badge variant="secondary" className={`${getCorPrioridade(tarefa.prioridade)} text-white`}>
                      {tarefa.prioridade}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{tarefa.descricao}</p>
                  <p className="text-sm text-muted-foreground">
                    Vence em: {new Date(tarefa.dataVencimento).toLocaleString()}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => excluirTarefa(tarefa.id)}>
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

