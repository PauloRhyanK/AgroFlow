import { motion } from 'framer-motion';
import { Truck, Thermometer, Gauge } from 'lucide-react';
import type { DeliveryRoute } from '@/lib/types';

interface RouteCardProps {
  route: DeliveryRoute;
  active: boolean;
  onClick: () => void;
}

export function RouteCard({ route, active, onClick }: RouteCardProps) {
  return (
    <motion.button
      layout
      onClick={onClick}
      whileHover={{ y: -2 }}
      className={`w-full text-left bg-card border rounded-xl p-4 transition-all
        ${active ? 'border-primary shadow-[var(--shadow-glow-primary)] ring-1 ring-primary/30' : 'border-border hover:border-border hover:shadow-card'}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            <Truck className="h-[18px] w-[18px]" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">{route.caminhao}</div>
            <div className="text-[11px] text-muted-foreground">{route.motorista}</div>
          </div>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{route.id}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[11px] mb-3">
        <div>
          <div className="text-muted-foreground">Paradas</div>
          <div className="font-semibold text-foreground text-sm">{route.paradas.length}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Distância</div>
          <div className="font-semibold text-foreground text-sm">{route.km_total} km</div>
        </div>
        <div>
          <div className="text-muted-foreground">Tempo</div>
          <div className="font-semibold text-foreground text-sm">{Math.floor(route.tempo_min / 60)}h{route.tempo_min % 60}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Gauge className="h-3 w-3" /> Capacidade
          </span>
          <span className="font-semibold">{route.capacidade_pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${route.capacidade_pct}%` }}
            className={`h-full ${route.capacidade_pct > 85 ? 'bg-ai' : 'bg-primary'}`}
          />
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Thermometer className="h-3 w-3" /> Cold chain
          </span>
          <span className="text-[11px] font-semibold text-accent">{route.temperatura}°C</span>
        </div>
      </div>
    </motion.button>
  );
}
