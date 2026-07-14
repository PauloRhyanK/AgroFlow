import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KanbanColumn } from '@/components/vendas/KanbanColumn';
import { OrderCard } from '@/components/vendas/OrderCard';
import { useOrdersStore } from '@/stores/ordersStore';
import type { KanbanStatus, Order } from '@/lib/types';

const columns: KanbanStatus[] = ['triagem', 'aprovado', 'montagem'];

export default function Vendas() {
  const orders = useOrdersStore((s) => s.orders);
  const moveOrder = useOrdersStore((s) => s.moveOrder);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor),
  );

  const handleStart = (e: DragStartEvent) => {
    const o = orders.find((x) => x.id === e.active.id);
    if (o) setActiveOrder(o);
  };

  const handleEnd = (e: DragEndEvent) => {
    setActiveOrder(null);
    const over = e.over;
    if (!over) return;
    const targetStatus = over.id as KanbanStatus;
    if (columns.includes(targetStatus)) {
      moveOrder(String(e.active.id), targetStatus);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between gap-4 flex-wrap mb-6"
      >
        <div>
          <p className="text-xs font-medium text-muted-foreground">Vendas / CRM</p>
          <h1 className="text-2xl md:text-[28px] font-bold tracking-tight mt-0.5">Kanban de Pedidos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Arraste os cards entre as colunas. Cards com <span className="text-ai font-semibold">glow âmbar</span> indicam itens próximos do vencimento.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button size="sm" className="gap-1.5 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Novo Pedido
          </Button>
        </div>
      </motion.header>

      <DndContext sensors={sensors} onDragStart={handleStart} onDragEnd={handleEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1">
          {columns.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              orders={orders.filter((o) => o.status_kanban === status)}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeOrder ? (
            <div className="w-[320px]">
              <OrderCard order={activeOrder} dragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
