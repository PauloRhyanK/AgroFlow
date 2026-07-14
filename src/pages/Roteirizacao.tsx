import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RouteCard } from '@/components/logistica/RouteCard';
import { MapCanvas } from '@/components/logistica/MapCanvas';
import { routes } from '@/lib/mockData';
import { toast } from 'sonner';

export default function Roteirizacao() {
  const [activeId, setActiveId] = useState(routes[0].id);
  const active = routes.find((r) => r.id === activeId)!;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between gap-4 flex-wrap mb-6"
      >
        <div>
          <p className="text-xs font-medium text-muted-foreground">Logística</p>
          <h1 className="text-2xl md:text-[28px] font-bold tracking-tight mt-0.5">Roteirização Inteligente</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {routes.length} cargas geradas · economia total de{' '}
            <span className="font-semibold text-primary">
              {routes.reduce((s, r) => s + r.economia_km, 0)} km
            </span>{' '}
            sugerida pela IA.
          </p>
        </div>
        <Button
          onClick={() => toast.success('Todas as rotas foram otimizadas', { description: 'Economia aplicada à frota.' })}
          className="gap-1.5 bg-primary hover:bg-primary/90"
        >
          <Sparkles className="h-4 w-4" />
          Otimizar todas
        </Button>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
        {/* Left: route list */}
        <aside className="space-y-3 order-2 lg:order-1">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-1">Cargas geradas</h2>
          {routes.map((r) => (
            <RouteCard
              key={r.id}
              route={r}
              active={r.id === activeId}
              onClick={() => setActiveId(r.id)}
            />
          ))}
        </aside>

        {/* Right: map */}
        <section className="order-1 lg:order-2">
          <MapCanvas route={active} />
        </section>
      </div>
    </div>
  );
}
