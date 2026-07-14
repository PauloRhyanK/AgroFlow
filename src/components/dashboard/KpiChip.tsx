import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Package, DollarSign, Truck, AlertTriangle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface KpiChipProps {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  tone?: 'primary' | 'ai' | 'accent' | 'default';
}

const toneMap = {
  primary: 'bg-primary/10 text-primary',
  ai: 'bg-ai/15 text-ai',
  accent: 'bg-accent/10 text-accent',
  default: 'bg-muted text-muted-foreground',
};

export function KpiChip({ label, value, delta, trend, icon: Icon, tone = 'default' }: KpiChipProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : TrendingUp;
  const trendColor = trend === 'up' ? 'text-primary' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 min-w-[180px] bg-card border border-border rounded-xl p-4 shadow-card hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${toneMap[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className={`flex items-center gap-0.5 text-xs font-semibold ${trendColor}`}>
          <TrendIcon className="h-3 w-3" />
          {delta}
        </div>
      </div>
      <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </motion.div>
  );
}

export function KpiRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <KpiChip label="Pedidos hoje" value="127" delta="+18%" trend="up" icon={Package} tone="primary" />
      <KpiChip label="Receita do dia" value="R$ 84,2k" delta="+12%" trend="up" icon={DollarSign} tone="primary" />
      <KpiChip label="Em rota" value="14" delta="+3" trend="up" icon={Truck} tone="accent" />
      <KpiChip label="Risco de perda" value="R$ 3,1k" delta="-22%" trend="down" icon={AlertTriangle} tone="ai" />
    </div>
  );
}
