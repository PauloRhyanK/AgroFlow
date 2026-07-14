import { Sparkles, Package, Route as RouteIcon } from 'lucide-react';
import { activityFeed } from '@/lib/mockData';

const iconMap = {
  ai: { Icon: Sparkles, cls: 'bg-ai/15 text-ai' },
  order: { Icon: Package, cls: 'bg-primary/15 text-primary' },
  route: { Icon: RouteIcon, cls: 'bg-accent/15 text-accent' },
} as const;

export function ActivityTimeline() {
  return (
    <div className="bg-card border border-border rounded-xl shadow-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Atividade recente</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Últimas ações do sistema e da IA</p>
        </div>
        <button className="text-xs font-semibold text-primary hover:text-primary-glow">Ver tudo</button>
      </div>
      <ul className="space-y-3.5">
        {activityFeed.map((item) => {
          const cfg = iconMap[item.tipo as keyof typeof iconMap];
          return (
            <li key={item.id} className="flex items-start gap-3">
              <div className={`shrink-0 h-8 w-8 rounded-lg flex items-center justify-center ${cfg.cls}`}>
                <cfg.Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-[13px] text-foreground leading-snug">{item.texto}</p>
                <span className="text-[11px] text-muted-foreground">há {item.tempo}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
