import { motion } from 'framer-motion';
import {
  Home,
  ShoppingCart,
  Package,
  User,
  RotateCcw,
  Signal,
  Wifi,
  BatteryFull,
  ChevronRight,
  Leaf,
  CheckCircle2,
  Truck,
  Store,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const recompra = [
  { nome: 'Alface Crespa', emoji: '🥬', ultima: '5 dias', preco: 'R$ 42,00', unidade: 'cx 6kg' },
  { nome: 'Tomate Italiano', emoji: '🍅', ultima: '2 dias', preco: 'R$ 89,00', unidade: 'cx 10kg' },
  { nome: 'Morango', emoji: '🍓', ultima: '7 dias', preco: 'R$ 68,00', unidade: 'bdj 500g' },
];

const catalogo = [
  { nome: 'Manga Palmer', emoji: '🥭', preco: 'R$ 54,00', badge: 'Fresco hoje' },
  { nome: 'Pimentão Vermelho', emoji: '🫑', preco: 'R$ 78,00', badge: 'Fresco hoje' },
  { nome: 'Rúcula', emoji: '🌿', preco: 'R$ 28,00', badge: 'Promoção' },
  { nome: 'Batata Doce', emoji: '🍠', preco: 'R$ 62,00', badge: null },
];

const etapas = [
  { label: 'Colheita', done: true, Icon: Leaf },
  { label: 'Separação', done: true, Icon: CheckCircle2 },
  { label: 'A caminho', done: true, Icon: Truck, active: true },
  { label: 'Entregue', done: false, Icon: Store },
];

function PhoneContent() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-slate-50 to-white overflow-y-auto">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-semibold text-slate-900">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <Signal className="h-3 w-3" />
          <Wifi className="h-3 w-3" />
          <BatteryFull className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Header */}
      <div className="px-5 pt-2 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-slate-500">Bem-vindo(a)</p>
            <h2 className="text-[18px] font-bold text-slate-900 leading-tight">Supermercado Aurora</h2>
          </div>
          <button className="relative h-10 w-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center">
            <ShoppingCart className="h-[18px] w-[18px] text-slate-700" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Traceability card — amber accent */}
      <div className="px-5 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-br from-ai/15 to-ai/5 border border-ai/30 p-4 overflow-hidden relative"
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">🍅</span>
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ai-foreground/70">
                Rastreabilidade
              </p>
              <p className="text-[13px] text-slate-900 font-medium leading-snug mt-0.5">
                Seu tomate foi colhido hoje às 06h na <strong>Fazenda Esperança</strong>.
              </p>
            </div>
          </div>
          {/* Timeline */}
          <div className="relative pt-2">
            <div className="absolute left-3 top-5 right-3 h-0.5 bg-slate-200 rounded-full" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute left-3 top-5 h-0.5 bg-primary rounded-full"
            />
            <div className="relative flex justify-between">
              {etapas.map((e) => (
                <div key={e.label} className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center border-2
                      ${e.done ? 'bg-primary border-primary text-primary-foreground' : 'bg-white border-slate-200 text-slate-300'}
                      ${e.active ? 'ring-4 ring-primary/20' : ''}`}
                  >
                    <e.Icon className="h-3 w-3" strokeWidth={2.5} />
                  </div>
                  <span className={`text-[9px] font-semibold ${e.done ? 'text-slate-900' : 'text-slate-400'}`}>
                    {e.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recompra 1-clique */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-[13px] font-bold text-slate-900">Recompra em 1 clique</h3>
          <button className="text-[11px] font-semibold text-primary flex items-center">
            Ver tudo <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-2 snap-x">
          {recompra.map((r) => (
            <motion.div
              key={r.nome}
              whileTap={{ scale: 0.97 }}
              className="snap-start shrink-0 w-[170px] rounded-2xl bg-white border border-slate-100 shadow-sm p-3"
            >
              <div className="h-20 rounded-xl bg-slate-50 flex items-center justify-center text-3xl mb-2">
                {r.emoji}
              </div>
              <p className="text-[13px] font-semibold text-slate-900 leading-tight truncate">{r.nome}</p>
              <p className="text-[10px] text-slate-500 mb-1">{r.unidade} · {r.ultima}</p>
              <p className="text-[13px] font-bold text-slate-900 mb-2">{r.preco}</p>
              <Button size="sm" className="w-full h-8 text-[11px] gap-1 bg-primary hover:bg-primary/90">
                <RotateCcw className="h-3 w-3" />
                Pedir de novo
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Catálogo */}
      <div className="px-5 pb-24">
        <h3 className="text-[13px] font-bold text-slate-900 mb-2.5">Catálogo rápido</h3>
        <div className="grid grid-cols-2 gap-3">
          {catalogo.map((p) => (
            <motion.div
              key={p.nome}
              whileTap={{ scale: 0.97 }}
              className="rounded-2xl bg-white border border-slate-100 shadow-sm p-3"
            >
              <div className="relative h-24 rounded-xl bg-slate-50 flex items-center justify-center text-4xl mb-2">
                {p.emoji}
                {p.badge && (
                  <span className={`absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider
                    ${p.badge === 'Promoção' ? 'bg-ai text-ai-foreground' : 'bg-primary text-primary-foreground'}`}>
                    {p.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] font-semibold text-slate-900 leading-tight">{p.nome}</p>
              <p className="text-[13px] font-bold text-slate-900 mt-0.5">{p.preco}</p>
              <button className="mt-2 w-full h-8 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-50">
                Adicionar
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur border-t border-slate-100">
        <div className="grid grid-cols-4 py-2.5 pb-5">
          {[
            { Icon: Home, label: 'Início', active: true },
            { Icon: Package, label: 'Pedidos' },
            { Icon: ShoppingCart, label: 'Carrinho' },
            { Icon: User, label: 'Conta' },
          ].map((n) => (
            <button key={n.label} className="flex flex-col items-center gap-0.5">
              <n.Icon className={`h-[18px] w-[18px] ${n.active ? 'text-primary' : 'text-slate-400'}`} />
              <span className={`text-[10px] font-semibold ${n.active ? 'text-primary' : 'text-slate-400'}`}>
                {n.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortalCliente() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-6 text-center">
        <p className="text-xs font-medium text-muted-foreground">Preview</p>
        <h1 className="text-2xl md:text-[28px] font-bold tracking-tight mt-0.5">Portal B2B — Cliente</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-xl mx-auto">
          É isso que o comprador do supermercado vê no celular. Mobile-first, com recompra em 1 clique e rastreabilidade em tempo real.
        </p>
      </div>

      {/* Phone frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[380px] h-[780px] rounded-[3rem] bg-slate-900 p-3 shadow-2xl"
        style={{ boxShadow: '0 40px 80px -20px hsl(222 47% 11% / 0.35), 0 0 0 1px hsl(222 47% 18%) inset' }}
      >
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 h-6 w-28 bg-slate-900 rounded-b-2xl z-20" />
        {/* Screen */}
        <div className="relative h-full w-full rounded-[2.25rem] bg-white overflow-hidden">
          <PhoneContent />
        </div>
      </motion.div>
    </div>
  );
}
