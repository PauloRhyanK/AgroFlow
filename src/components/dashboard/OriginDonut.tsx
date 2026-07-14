import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { originDistribution } from '@/lib/mockData';

export function OriginDonut() {
  const total = originDistribution.reduce((sum, d) => sum + d.valor, 0);
  return (
    <div className="bg-card border border-border rounded-xl shadow-card p-5 h-full flex flex-col">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-foreground">Origem dos Pedidos</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Distribuição dos últimos 30 dias</p>
      </div>
      <div className="flex-1 min-h-[240px] flex items-center">
        <div className="flex-1 h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={originDistribution}
                dataKey="valor"
                nameKey="nome"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                strokeWidth={0}
              >
                {originDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold tracking-tight">{total}%</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">canais</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 pr-2">
          {originDistribution.map((item) => (
            <div key={item.nome} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: item.fill }} />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-medium text-foreground">{item.nome}</span>
                <span className="text-[11px] text-muted-foreground">{item.valor}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
