import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Crown, MessageCircle, Store, User, AlertTriangle } from 'lucide-react';
import type { Order } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const origemConfig = {
  'WhatsApp IA': { Icon: MessageCircle, cls: 'bg-primary/10 text-primary border-primary/20' },
  'Portal B2B': { Icon: Store, cls: 'bg-accent/10 text-accent border-accent/20' },
  'Vendedor': { Icon: User, cls: 'bg-muted text-muted-foreground border-border' },
};

const paymentConfig = {
  pago: { label: 'Pago', cls: 'bg-primary/10 text-primary' },
  pendente: { label: 'Pendente', cls: 'bg-ai/15 text-ai' },
  faturado: { label: 'Faturado', cls: 'bg-accent/10 text-accent' },
};

export function OrderCard({ order, dragging = false }: { order: Order; dragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: order.id,
    data: { order },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  const OrigemIcon = origemConfig[order.origem].Icon;
  const pay = paymentConfig[order.status_pagamento];
  const atRisk = order.risco_perecivel;

  return (
    <motion.div layout layoutId={dragging ? undefined : order.id}>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`relative bg-card border border-border rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing
          ${atRisk ? 'ring-2 ring-ai/50 shadow-glow-ai' : ''}
          ${dragging ? 'rotate-2 shadow-xl' : ''}`}
      >
        {atRisk && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-ai flex items-center justify-center shadow-md ring-2 ring-card">
                  <AlertTriangle className="h-3 w-3 text-ai-foreground" strokeWidth={2.5} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">Item com validade &lt; 24h</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-muted-foreground">{order.id}</span>
          <Badge variant="outline" className={`h-5 px-1.5 text-[10px] gap-1 font-medium ${origemConfig[order.origem].cls}`}>
            <OrigemIcon className="h-2.5 w-2.5" />
            {order.origem}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <h4 className="text-sm font-semibold text-foreground truncate">{order.cliente}</h4>
          {order.clienteTipo === 'VIP' && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-ai/15 text-ai">
              <Crown className="h-2.5 w-2.5" strokeWidth={2.5} />
              VIP
            </span>
          )}
        </div>

        <ul className="text-[12px] text-muted-foreground space-y-0.5 mb-3">
          {order.itens.slice(0, 2).map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span className={`h-1 w-1 rounded-full ${item.at_risk ? 'bg-ai' : 'bg-muted-foreground/40'}`} />
              <span className="truncate">{item.quantidade}× {item.nome}</span>
            </li>
          ))}
          {order.itens.length > 2 && (
            <li className="text-[11px] text-muted-foreground/70">+{order.itens.length - 2} outros itens</li>
          )}
        </ul>

        <div className="flex items-center justify-between pt-2.5 border-t border-border/60">
          <span className="text-sm font-bold tracking-tight">
            R$ {order.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${pay.cls}`}>
            {pay.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
