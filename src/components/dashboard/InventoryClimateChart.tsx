import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { chartData } from '@/lib/mockData';

export function InventoryClimateChart() {
  return (
    <div className="bg-card border border-border rounded-xl shadow-card p-5 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Giro de Estoque × Clima</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Últimos 14 dias · correlação temperatura</p>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-primary" />
            <span className="text-muted-foreground">Giro (cx)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-ai" />
            <span className="text-muted-foreground">Temp. (°C)</span>
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="dia" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 10,
                fontSize: 12,
                boxShadow: '0 10px 30px -12px hsl(222 47% 11% / 0.18)',
              }}
              cursor={{ fill: 'hsl(var(--muted) / 0.5)' }}
            />
            <Bar yAxisId="left" dataKey="giro" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} maxBarSize={22} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="temperatura"
              stroke="hsl(var(--ai))"
              strokeWidth={2.5}
              dot={{ r: 3, fill: 'hsl(var(--ai))', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
