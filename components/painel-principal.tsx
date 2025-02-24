"use client"

import { useState } from "react"
import { Calendario } from "@/components/calendario"
import { ListaTarefas } from "@/components/lista-tarefas"
import { FormularioTarefa } from "@/components/formulario-tarefa"
import { AlternarTema } from "@/components/alternar-tema"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, ListTodo } from "lucide-react"

export function PainelPrincipal() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])

  const adicionarTarefa = (tarefa: Tarefa) => {
    setTarefas([...tarefas, tarefa])
    // Solicitar permissão para notificações
    if (Notification.permission === "default") {
      Notification.requestPermission()
    }
    // Mostrar notificação
    if (Notification.permission === "granted") {
      new Notification("Nova Tarefa Adicionada", {
        body: tarefa.titulo,
        icon: "/favicon.ico",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold">Gerenciador de Tarefas</h1>
          <AlternarTema />
        </div>
      </header>
      <main className="container py-6">
        <Tabs defaultValue="tarefas" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tarefas" className="space-x-2">
              <ListTodo className="h-4 w-4" />
              <span>Tarefas</span>
            </TabsTrigger>
            <TabsTrigger value="calendario" className="space-x-2">
              <CalendarDays className="h-4 w-4" />
              <span>Calendário</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tarefas" className="space-y-6">
            <FormularioTarefa onAdicionarTarefa={adicionarTarefa} />
            <ListaTarefas tarefas={tarefas} setTarefas={setTarefas} />
          </TabsContent>
          <TabsContent value="calendario">
            <Calendario tarefas={tarefas} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export interface Tarefa {
  id: string
  titulo: string
  descricao: string
  dataVencimento: Date
  prioridade: "baixa" | "media" | "alta"
  concluida: boolean
}

