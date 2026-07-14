import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { OrderCard } from './OrderCard';
import type { KanbanStatus, Order } from '@/lib/types';

const columnMeta: Record<KanbanStatus, { title: string; subtitle: string; accent: string; tagCls: string }> = {
  triagem: {
    title: 'Triagem (IA)',
    subtitle: 'Classificação automática',
    accent: 'from-ai/15 to-transparent',
    tagCls: 'bg-ai/15 text-ai',
  },
  aprovado: {
    title: 'Aprovados',
    subtitle: 'Prontos para separação',
    accent: 'from-primary/15 to-transparent',
    tagCls: 'bg-primary/15 text-primary',
  },
  montagem: {
    title: 'Montagem de Carga',
    subtitle: 'Em preparação para rota',
    accent: 'from-accent/15 to-transparent',
    tagCls: 'bg-accent/15 text-accent',
  },
};

export function KanbanColumn({ status, orders }: { status: KanbanStatus; orders: Order[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const meta = columnMeta[status];
  const total = orders.reduce((sum, o) => sum + o.valor, 0);
  const alerts = orders.filter((o) => o.risco_perecivel).length;

  return (
    <div className="flex flex-col min-w-[320px] w-[340px] flex-1 max-w-[420px] bg-muted/40 rounded-2xl border border-border/60 overflow-hidden">
      <div className={`px-4 py-3.5 bg-gradient-to-r ${meta.accent} border-b border-border/60`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold tracking-tight">{meta.title}</h3>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${meta.tagCls}`}>{orders.length}</span>
          </div>
          {alerts > 0 && (
            <span className="text-[10px] font-semibold text-ai flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-ai animate-pulse" />
              {alerts} alerta{alerts > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-[11px] text-muted-foreground">{meta.subtitle}</p>
          <p className="text-[11px] font-semibold text-foreground">
            R$ {total.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      <motion.div
        ref={setNodeRef}
        animate={{ backgroundColor: isOver ? 'hsl(var(--primary) / 0.06)' : 'transparent' }}
        className="flex-1 p-3 space-y-3 min-h-[500px] transition-colors"
      >
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
        {orders.length === 0 && (
          <div className="h-full min-h-[120px] flex items-center justify-center text-xs text-muted-foreground/70 border-2 border-dashed border-border/60 rounded-xl">
            Arraste pedidos aqui
          </div>
        )}
      </motion.div>
    </div>
  );
}
