"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Tarefa } from "./painel-principal"

interface FormularioTarefaProps {
  onAdicionarTarefa: (tarefa: Tarefa) => void
}

export function FormularioTarefa({ onAdicionarTarefa }: FormularioTarefaProps) {
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [dataVencimento, setDataVencimento] = useState("")
  const [prioridade, setPrioridade] = useState<"baixa" | "media" | "alta">("media")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tarefa: Tarefa = {
      id: Math.random().toString(36).substr(2, 9),
      titulo,
      descricao,
      dataVencimento: new Date(dataVencimento),
      prioridade,
      concluida: false,
    }
    onAdicionarTarefa(tarefa)
    setTitulo("")
    setDescricao("")
    setDataVencimento("")
    setPrioridade("media")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Nova Tarefa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="data-vencimento">Data de Vencimento</Label>
              <Input
                id="data-vencimento"
                type="datetime-local"
                value={dataVencimento}
                onChange={(e) => setDataVencimento(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prioridade">Prioridade</Label>
              <Select value={prioridade} onValueChange={(value: any) => setPrioridade(value)}>
                <SelectTrigger id="prioridade">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Adicionar Tarefa
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

