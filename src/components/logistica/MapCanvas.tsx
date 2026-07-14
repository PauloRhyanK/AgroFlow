import { motion } from 'framer-motion';
import { Truck, Thermometer, Gauge, MapPin, Clock, TrendingDown } from 'lucide-react';
import type { DeliveryRoute } from '@/lib/types';

export function MapCanvas({ route }: { route: DeliveryRoute }) {
  // Map normalized 0–1 coords into a viewBox (1000×600).
  const W = 1000;
  const H = 600;
  const pts = route.paradas.map((p) => ({ ...p, cx: p.x * W, cy: p.y * H }));
  const pathD = pts
    .map((p, i) => (i === 0 ? `M ${p.cx} ${p.cy}` : `L ${p.cx} ${p.cy}`))
    .join(' ');

  return (
    <div className="relative rounded-2xl overflow-hidden border border-border bg-slate-900 dot-grid h-[560px]">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 40%, hsl(158 64% 40% / 0.18), transparent 55%), radial-gradient(ellipse at 75% 70%, hsl(239 84% 67% / 0.12), transparent 55%)' }}
      />

      {/* HUD — floating card */}
      <motion.div
        key={route.id + '-hud'}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-10 glass-dark rounded-xl p-3.5 min-w-[240px] shadow-xl"
      >
        <div className="flex items-center gap-2.5 mb-3">
          <div className="h-9 w-9 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
            <Truck className="h-[18px] w-[18px]" />
          </div>
          <div>
            <div className="text-[13px] font-semibold text-white leading-tight">{route.caminhao}</div>
            <div className="text-[11px] text-white/60">{route.motorista}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-white/70">
              <Thermometer className="h-3 w-3" /> Cold Chain
            </span>
            <span className="font-semibold text-white">{route.temperatura}°C</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-white/70">
              <Gauge className="h-3 w-3" /> Capacidade
            </span>
            <span className="font-semibold text-white">{route.capacidade_pct}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              key={route.id + '-cap'}
              initial={{ width: 0 }}
              animate={{ width: `${route.capacidade_pct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-primary-glow"
            />
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        key={route.id + '-legend'}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 right-4 z-10 glass-dark rounded-xl p-3.5 min-w-[220px] shadow-xl"
      >
        <div className="grid grid-cols-2 gap-3 text-[11px]">
          <div>
            <div className="flex items-center gap-1 text-white/60">
              <MapPin className="h-3 w-3" /> Distância
            </div>
            <div className="text-sm font-bold text-white mt-0.5">{route.km_total} km</div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-white/60">
              <Clock className="h-3 w-3" /> Tempo
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {Math.floor(route.tempo_min / 60)}h{route.tempo_min % 60}
            </div>
          </div>
          <div className="col-span-2 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1 text-white/60">
              <TrendingDown className="h-3 w-3 text-primary-glow" /> Economia vs baseline
            </div>
            <div className="text-sm font-bold text-primary-glow mt-0.5">-{route.economia_km} km</div>
          </div>
        </div>
      </motion.div>

      {/* SVG route */}
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="routeGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(158 64% 52%)" />
            <stop offset="100%" stopColor="hsl(239 84% 67%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          key={route.id + '-path'}
          d={pathD}
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="1 0"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {pts.map((p, i) => {
          const isStart = i === 0;
          const isEnd = i === pts.length - 1;
          const fill = isStart ? 'hsl(158 64% 52%)' : isEnd ? 'hsl(239 84% 67%)' : '#ffffff';
          return (
            <motion.g
              key={p.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.12 }}
            >
              <circle cx={p.cx} cy={p.cy} r={18} fill={fill} opacity={0.18} />
              <circle cx={p.cx} cy={p.cy} r={7} fill={fill} stroke="hsl(222 47% 8%)" strokeWidth={2.5} />
              <text
                x={p.cx}
                y={p.cy - 16}
                textAnchor="middle"
                className="fill-white/80"
                fontSize={11}
                fontWeight={600}
              >
                {p.cliente}
              </text>
              <text
                x={p.cx}
                y={p.cy + 26}
                textAnchor="middle"
                className="fill-white/50"
                fontSize={10}
              >
                ETA {p.eta}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
