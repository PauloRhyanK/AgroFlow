import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Truck, TrendingDown, AlertTriangle, Search,
  CheckCircle2, Clock, XCircle, ChevronRight, Sparkles, MessageCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { purchases as initialPurchases } from '@/lib/mockData';
import type { Purchase, StatusLogistico, QualidadeGrau } from '@/lib/types';

/* ─── KPI card ─── */
function KpiCard({ label, value, icon: Icon, tone, subtitle }: {
  label: string; value: string; icon: React.ElementType;
  tone: 'primary' | 'ai' | 'accent' | 'destructive'; subtitle?: string;
}) {
  const toneStyles: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    ai: 'bg-ai/15 text-[hsl(var(--ai))]',
    accent: 'bg-accent/10 text-accent',
    destructive: 'bg-destructive/10 text-destructive',
  };
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="shadow-card hover:shadow-md transition-shadow">
        <CardContent className="p-4 flex items-start gap-3">
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${toneStyles[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="text-xl font-bold tracking-tight text-foreground">{value}</p>
            {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── Status badges ─── */
function LogisticoBadge({ status }: { status: StatusLogistico }) {
  const map: Record<StatusLogistico, { cls: string; icon: React.ElementType }> = {
    'A Caminho': { cls: 'bg-accent/10 text-accent border-accent/20', icon: Truck },
    'Recebido': { cls: 'bg-primary/10 text-primary border-primary/20', icon: CheckCircle2 },
    'Cancelado': { cls: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle },
  };
  const { cls, icon: StatusIcon } = map[status];
  return (
    <Badge variant="outline" className={`gap-1 font-medium ${cls}`}>
      <StatusIcon className="h-3 w-3" />{status}
    </Badge>
  );
}

function FinanceiroBadge({ status }: { status: string }) {
  const isFechado = status === 'Fechado';
  return (
    <Badge variant="outline" className={`font-medium ${isFechado ? 'bg-primary/10 text-primary border-primary/20' : 'bg-ai/15 text-[hsl(var(--ai))] border-[hsl(var(--ai)/0.25)]'}`}>
      {isFechado ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
      {status}
    </Badge>
  );
}

/* ─── Quebra micro-bar ─── */
function QuebraMicro({ comprada, recebida, status }: { comprada: number; recebida: number; status: StatusLogistico }) {
  if (status !== 'Recebido') return <span className="text-xs text-muted-foreground">—</span>;
  const pct = Math.round(((comprada - recebida) / comprada) * 100);
  const fillPct = Math.round((recebida / comprada) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-primary" style={{ width: `${fillPct}%` }} />
      </div>
      <span className="text-xs font-medium text-foreground">{recebida}/{comprada}</span>
      {pct > 0 && <span className="text-[10px] font-semibold text-destructive">-{pct}%</span>}
    </div>
  );
}

/* ─── Adjust Receipt Dialog ─── */
function AjustarDialog({ purchase, open, onClose, onSave }: {
  purchase: Purchase; open: boolean;
  onClose: () => void;
  onSave: (id: string, qtd: number, qual: QualidadeGrau) => void;
}) {
  const [qtd, setQtd] = useState(purchase.qtd_recebida_real || purchase.qtd_comprada);
  const [qual, setQual] = useState<QualidadeGrau>(purchase.qualidade || 'A');
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Ajustar Recebimento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-sm text-muted-foreground">{purchase.produto} — {purchase.fornecedor}</p>
          <div className="space-y-1.5">
            <Label>Qtd Recebida</Label>
            <Input type="number" value={qtd} onChange={e => setQtd(Number(e.target.value))} max={purchase.qtd_comprada} min={0} />
            <p className="text-[11px] text-muted-foreground">Comprada: {purchase.qtd_comprada}</p>
          </div>
          <div className="space-y-1.5">
            <Label>Qualidade</Label>
            <Select value={qual} onValueChange={v => setQual(v as QualidadeGrau)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A — Excelente</SelectItem>
                <SelectItem value="B">B — Regular</SelectItem>
                <SelectItem value="C">C — Abaixo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => { onSave(purchase.id, qtd, qual); onClose(); }}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Main Page ─── */
export default function Suprimentos() {
  const [data, setData] = useState<Purchase[]>(initialPurchases);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFornecedor, setFilterFornecedor] = useState<string>('all');
  const [editPurchase, setEditPurchase] = useState<Purchase | null>(null);

  const fornecedores = useMemo(() => [...new Set(data.map(p => p.fornecedor))], [data]);

  const filtered = useMemo(() => {
    return data.filter(p => {
      const matchSearch = !search || p.produto.toLowerCase().includes(search.toLowerCase()) || p.fornecedor.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || p.status_logistico === filterStatus;
      const matchForn = filterFornecedor === 'all' || p.fornecedor === filterFornecedor;
      return matchSearch && matchStatus && matchForn;
    });
  }, [data, search, filterStatus, filterFornecedor]);

  /* KPI calculations */
  const totalCompradoHoje = data.filter(p => p.data_compra === '2026-05-01').reduce((s, p) => s + p.valor_total, 0);
  const cargasACaminho = data.filter(p => p.status_logistico === 'A Caminho').length;
  const recebidos = data.filter(p => p.status_logistico === 'Recebido');
  const quebraMedia = recebidos.length > 0
    ? Math.round(recebidos.reduce((s, p) => s + ((p.qtd_comprada - p.qtd_recebida_real) / p.qtd_comprada) * 100, 0) / recebidos.length)
    : 0;

  const handleSaveReceipt = (id: string, qtd: number, qual: QualidadeGrau) => {
    setData(prev => prev.map(p => p.id === id ? { ...p, qtd_recebida_real: qtd, qualidade: qual, status_logistico: 'Recebido' as const, status_financeiro: 'Fechado' as const } : p));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Suprimentos</h1>
          <p className="text-sm text-muted-foreground">Torre de Controle de Compras — visão consolidada</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 border-[hsl(var(--ai)/0.3)] text-[hsl(var(--ai))] hover:bg-ai/10">
              <Sparkles className="h-4 w-4" /> Smart Sourcing
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[380px] sm:w-[420px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[hsl(var(--ai))]" /> Smart Sourcing IA
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-[hsl(var(--ai)/0.25)] bg-[var(--gradient-ai)] p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-[hsl(var(--ai))] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Déficit detectado: Cenoura</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Faltam 50cx de Cenoura para cobrir os pedidos de amanhã. Baseado no histórico, a IA sugere:
                    </p>
                  </div>
                </div>
                <div className="space-y-2 pl-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">1. Fazenda Vale Verde</span>
                    <span className="text-muted-foreground">R$ 40/cx</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">2. Sítio São José</span>
                    <span className="text-muted-foreground">R$ 42/cx</span>
                  </div>
                </div>
                <Button size="sm" className="w-full gap-1.5 bg-primary hover:bg-primary/90">
                  <MessageCircle className="h-4 w-4" /> Gerar Pedido de Compra no WhatsApp
                </Button>
              </div>
              <div className="rounded-xl border p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">Rúcula — estoque baixo</p>
                <p className="text-xs text-muted-foreground">
                  Estoque atual: 18cx. Consumo médio diário: 12cx. Reposição sugerida em até 24h.
                </p>
                <Button variant="outline" size="sm" className="w-full gap-1.5">
                  <MessageCircle className="h-4 w-4" /> Contatar Sítio Boa Vista
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Section A: KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Total Comprado (Hoje)" value={`R$ ${(totalCompradoHoje / 1000).toFixed(1)}k`} icon={ShoppingCart} tone="primary" />
        <KpiCard label="Cargas a Caminho" value={String(cargasACaminho)} icon={Truck} tone="accent" subtitle="Previsão até 03/05" />
        <KpiCard label="Índice de Quebra" value={`${quebraMedia}%`} icon={TrendingDown} tone={quebraMedia > 10 ? 'destructive' : 'primary'} subtitle="Perda média no recebimento" />
        <KpiCard label="Déficit Crítico" value="2 itens" icon={AlertTriangle} tone="ai" subtitle="⚠️ Cenoura e Rúcula em falta" />
      </div>

      {/* Section B: Purchases Table */}
      <Card className="shadow-card">
        <CardContent className="p-0">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 p-4 border-b">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar produto ou fornecedor…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px] h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="A Caminho">A Caminho</SelectItem>
                <SelectItem value="Recebido">Recebido</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterFornecedor} onValueChange={setFilterFornecedor}>
              <SelectTrigger className="w-[200px] h-9"><SelectValue placeholder="Fornecedor" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Fornecedores</SelectItem>
                {fornecedores.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[90px]">ID</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Recebimento</TableHead>
                <TableHead>Logístico</TableHead>
                <TableHead>Financeiro</TableHead>
                <TableHead className="text-right w-[100px]">Valor</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">{p.id}</TableCell>
                  <TableCell className="font-medium text-sm">{p.fornecedor}</TableCell>
                  <TableCell className="text-sm">{p.produto}</TableCell>
                  <TableCell className="text-right">
                    <QuebraMicro comprada={p.qtd_comprada} recebida={p.qtd_recebida_real} status={p.status_logistico} />
                  </TableCell>
                  <TableCell><LogisticoBadge status={p.status_logistico} /></TableCell>
                  <TableCell><FinanceiroBadge status={p.status_financeiro} /></TableCell>
                  <TableCell className="text-right font-medium text-sm">R$ {p.valor_total.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    {p.status_logistico === 'A Caminho' && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditPurchase(p)}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">Nenhuma compra encontrada.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Adjust Receipt Dialog */}
      {editPurchase && (
        <AjustarDialog
          purchase={editPurchase}
          open={!!editPurchase}
          onClose={() => setEditPurchase(null)}
          onSave={handleSaveReceipt}
        />
      )}
    </div>
  );
}
