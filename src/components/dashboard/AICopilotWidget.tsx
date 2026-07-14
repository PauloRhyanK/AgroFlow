import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, AlertTriangle, Truck, TrendingUp, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ai_insights } from '@/lib/mockData';
import type { AIInsight, InsightType } from '@/lib/types';

const typeConfig: Record<InsightType, {
  icon: typeof AlertTriangle;
  accent: string;
  ring: string;
  bgSoft: string;
  iconWrap: string;
  label: string;
}> = {
  pricing: {
    icon: AlertTriangle,
    accent: 'before:bg-ai',
    ring: 'hover:ring-ai/30',
    bgSoft: 'bg-ai/5',
    iconWrap: 'bg-ai/15 text-ai',
    label: 'Precificação Dinâmica',
  },
  logistics: {
    icon: Truck,
    accent: 'before:bg-accent',
    ring: 'hover:ring-accent/30',
    bgSoft: 'bg-accent/5',
    iconWrap: 'bg-accent/15 text-accent',
    label: 'Logística',
  },
  upsell: {
    icon: TrendingUp,
    accent: 'before:bg-primary',
    ring: 'hover:ring-primary/30',
    bgSoft: 'bg-primary/5',
    iconWrap: 'bg-primary/15 text-primary',
    label: 'Upsell',
  },
};

function InsightCard({ insight, onDismiss, index }: { insight: AIInsight; onDismiss: (id: string) => void; index: number }) {
  const cfg = typeConfig[insight.tipo];
  const Icon = cfg.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ y: -4 }}
      className={`group relative flex-1 min-w-[300px] bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-lg transition-all ring-1 ring-transparent ${cfg.ring} overflow-hidden
        before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1 ${cfg.accent}`}
    >
      <div className={`absolute inset-0 ${cfg.bgSoft} opacity-60 pointer-events-none`} />
      <div className="relative">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${cfg.iconWrap}`}>
              <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{cfg.label}</div>
              <div className="text-sm font-semibold text-foreground leading-tight">{insight.titulo}</div>
            </div>
          </div>
          <button
            onClick={() => onDismiss(insight.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 rounded-md hover:bg-muted flex items-center justify-center"
            aria-label="Dispensar"
          >
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>

        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{insight.descricao}</p>

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/60">
          <span className="text-[11px] font-semibold text-foreground">{insight.impacto}</span>
          <Button
            size="sm"
            onClick={() => toast.success(`${insight.cta}`, { description: insight.titulo })}
            className="h-8 gap-1.5 bg-foreground hover:bg-foreground/90 text-background shadow-sm"
          >
            {insight.cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function AICopilotWidget() {
  const [insights, setInsights] = useState<AIInsight[]>(ai_insights);
  const dismiss = (id: string) => setInsights((prev) => prev.filter((i) => i.id !== id));

  return (
    <section className="relative rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      {/* Header */}
      <div className="relative px-5 py-4 border-b border-border bg-gradient-to-r from-primary/8 via-ai/5 to-transparent">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-[var(--shadow-glow-primary)]">
              <Sparkles className="h-5 w-5 text-primary-foreground" strokeWidth={2.3} />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-ai ring-2 ring-card pulse-ring" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-bold tracking-tight">Copiloto AgroFlow</h2>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-ai/15 text-ai">IA</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Sugestões baseadas no estoque, clima e histórico de vendas.</p>
            </div>
          </div>
          <button className="text-xs font-semibold text-primary hover:text-primary-glow">Ver todas as sugestões →</button>
        </div>
      </div>

      {/* Insight cards */}
      <div className="p-5">
        {insights.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            Tudo sob controle. Nenhuma sugestão no momento. 🌿
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
            <AnimatePresence mode="popLayout">
              {insights.map((insight, i) => (
                <div key={insight.id} className="snap-start">
                  <InsightCard insight={insight} onDismiss={dismiss} index={i} />
                </div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
