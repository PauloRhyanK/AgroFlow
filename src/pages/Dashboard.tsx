import { motion } from 'framer-motion';
import { KpiRow } from '@/components/dashboard/KpiChip';
import { AICopilotWidget } from '@/components/dashboard/AICopilotWidget';
import { InventoryClimateChart } from '@/components/dashboard/InventoryClimateChart';
import { OriginDonut } from '@/components/dashboard/OriginDonut';
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline';

export default function Dashboard() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between gap-4 flex-wrap"
      >
        <div>
          <p className="text-xs font-medium text-muted-foreground capitalize">{today}</p>
          <h1 className="text-2xl md:text-[28px] font-bold tracking-tight mt-0.5">
            Bom dia, Rafael 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Você tem <span className="font-semibold text-foreground">3 sugestões</span> da IA e{' '}
            <span className="font-semibold text-ai">2 alertas de validade</span> hoje.
          </p>
        </div>
      </motion.header>

      {/* KPIs */}
      <KpiRow />

      {/* AI Copilot — hero */}
      <AICopilotWidget />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <InventoryClimateChart />
        </div>
        <OriginDonut />
      </div>

      {/* Activity */}
      <ActivityTimeline />
    </div>
  );
}
