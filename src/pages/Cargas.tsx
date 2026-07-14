import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Truck, Weight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter,
} from '@/components/ui/drawer';
import { toast } from 'sonner';
import { vehicles as vehiclesMock, cargoItems as cargoItemsMock } from '@/lib/mockDataCargas';
import type { CargoItem } from '@/lib/mockDataCargas';
import CustomNumpad from '@/components/cargas/CustomNumpad';

export default function Cargas() {
  const vehicle = vehiclesMock[2]; // GHI-7H89
  const [items, setItems] = useState<CargoItem[]>(cargoItemsMock.map(i => ({ ...i })));
  const [activeItem, setActiveItem] = useState<CargoItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [numpadValue, setNumpadValue] = useState('');
  const [selectedFornecedor, setSelectedFornecedor] = useState<string | null>(null);

  const pesoCarregado = useMemo(
    () => items.filter(i => i.status !== 'pendente')
      .reduce((sum, i) => sum + i.qtd_conferida * i.peso_unitario_kg, 0),
    [items],
  );

  const capacidadePct = Math.min((pesoCarregado / vehicle.capacidade_max_kg) * 100, 100);
  const progressColor =
    capacidadePct > 95 ? 'bg-red-500' :
    capacidadePct > 80 ? 'bg-amber-500' : 'bg-emerald-500';

  const openDrawer = useCallback((item: CargoItem) => {
    setActiveItem(item);
    setNumpadValue(item.qtd_conferida > 0 ? String(item.qtd_conferida) : '');
    setSelectedFornecedor(item.fornecedores[0]?.nome ?? null);
    setDrawerOpen(true);
  }, []);

  const confirmar = useCallback(() => {
    if (!activeItem) return;
    const qtd = parseInt(numpadValue) || 0;
    setItems(prev => prev.map(item => {
      if (item.id !== activeItem.id) return item;
      const status: CargoItem['status'] = qtd >= item.qtd_esperada ? 'concluido' : qtd > 0 ? 'incompleto' : 'pendente';
      return { ...item, qtd_conferida: qtd, status };
    }));
    toast.success(`${activeItem.produto}: ${qtd} cx conferidas`);
    setDrawerOpen(false);
    setActiveItem(null);
    setNumpadValue('');
  }, [activeItem, numpadValue]);

  const todosConferidos = items.every(i => i.status !== 'pendente');

  const finalizarCarga = () => {
    if (!todosConferidos) {
      toast.error('Confira todos os itens antes de liberar.');
      return;
    }
    toast.success('🚚 Caminhão liberado com sucesso!', {
      description: `${vehicle.placa} · ${vehicle.motorista} · ${pesoCarregado} kg`,
    });
  };

  const faltam = activeItem ? activeItem.qtd_esperada - (parseInt(numpadValue) || 0) : 0;

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto pb-28">
      {/* ── HEADER MINIMAL ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Truck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Placa {vehicle.placa} • {vehicle.motorista}
            </h1>
            <p className="text-sm text-muted-foreground">
              {items.filter(i => i.status !== 'pendente').length}/{items.length} itens conferidos
            </p>
          </div>
        </div>

        {/* Capacidade */}
        <div className="w-full sm:w-80">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Weight className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Capacidade</span>
            </div>
            <span className="text-sm font-bold text-foreground">{capacidadePct.toFixed(0)}%</span>
          </div>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className={`h-full rounded-full ${progressColor}`}
              animate={{ width: `${capacidadePct}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-bold text-foreground">{pesoCarregado.toLocaleString('pt-BR')}</span>
            {' / '}{vehicle.capacidade_max_kg.toLocaleString('pt-BR')} kg
          </p>
        </div>
      </div>

      {/* ── LISTA SEMÁFORO ── */}
      <div className="space-y-3">
        {items.map(item => {
          const borderClass =
            item.status === 'concluido' ? 'border-l-8 border-l-emerald-500 bg-emerald-50/60' :
            item.status === 'incompleto' ? 'border-l-8 border-l-amber-400 bg-amber-50/60' :
            'border-l-8 border-l-slate-300 bg-card';

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                className={`shadow-sm rounded-xl cursor-pointer active:scale-[0.98] transition-transform ${borderClass}`}
                onClick={() => openDrawer(item)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-foreground truncate">{item.produto}</p>
                    <p className="text-sm text-muted-foreground">{item.cliente} · {item.pedido_id}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-muted-foreground">Conferido</p>
                    <p className="text-xl font-bold tabular-nums text-foreground">
                      {item.qtd_conferida} <span className="text-muted-foreground font-normal text-base">/ {item.qtd_esperada}</span>
                    </p>
                  </div>
                  {item.status === 'concluido' && (
                    <CheckCircle2 className="h-7 w-7 text-emerald-500 shrink-0" />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* ── BOTTOM SHEET / DRAWER ── */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="max-h-[60vh]">
          {activeItem && (
            <>
              <DrawerHeader className="text-left pb-2">
                <DrawerTitle className="text-xl font-bold">{activeItem.produto}</DrawerTitle>
                <p className="text-sm text-muted-foreground">
                  {activeItem.cliente} · Meta: {activeItem.qtd_esperada} cx
                  {faltam > 0 && <span className="text-amber-600 font-semibold"> · Faltam {faltam} cx</span>}
                </p>
              </DrawerHeader>

              <div className="px-4 pb-4 overflow-y-auto space-y-4">
                {/* Fornecedores */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Fornecedor</p>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.fornecedores.map(f => (
                      <button
                        key={f.nome}
                        onClick={() => setSelectedFornecedor(f.nome)}
                        className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-colors touch-manipulation ${
                          selectedFornecedor === f.nome
                            ? 'bg-slate-900 text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {f.nome}: {f.qtd_disponivel}cx
                      </button>
                    ))}
                  </div>
                </div>

                {/* Numpad */}
                <CustomNumpad value={numpadValue} onChange={setNumpadValue} />
              </div>

              <DrawerFooter className="pt-0">
                <Button
                  className="h-16 text-lg font-bold rounded-xl w-full touch-manipulation gap-2"
                  onClick={confirmar}
                  disabled={!numpadValue}
                >
                  <CheckCircle2 className="h-6 w-6" />
                  Confirmar Conferência
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* ── FAB ── */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        <Button
          className="h-16 px-8 text-lg rounded-2xl shadow-lg gap-3 touch-manipulation"
          onClick={finalizarCarga}
        >
          <Truck className="h-7 w-7" />
          Finalizar e Liberar
        </Button>
      </motion.div>
    </div>
  );
}
