import type {
  AIInsight,
  ChartPoint,
  Cliente,
  DeliveryRoute,
  InventoryItem,
  Order,
  Purchase,
} from './types';

export const inventory: InventoryItem[] = [
  { id: 'inv-1', nome: 'Alface Crespa', quantidade: 30, unidade: 'caixas', validade_horas: 22, temperatura_ideal: 4, categoria: 'Folhosos' },
  { id: 'inv-2', nome: 'Tomate Italiano', quantidade: 120, unidade: 'caixas', validade_horas: 96, temperatura_ideal: 8, categoria: 'Legumes' },
  { id: 'inv-3', nome: 'Morango', quantidade: 45, unidade: 'bandejas', validade_horas: 40, temperatura_ideal: 2, categoria: 'Frutas' },
  { id: 'inv-4', nome: 'Rúcula', quantidade: 18, unidade: 'caixas', validade_horas: 18, temperatura_ideal: 4, categoria: 'Folhosos' },
  { id: 'inv-5', nome: 'Batata Doce', quantidade: 220, unidade: 'sacos', validade_horas: 480, temperatura_ideal: 12, categoria: 'Tubérculos' },
  { id: 'inv-6', nome: 'Manga Palmer', quantidade: 60, unidade: 'caixas', validade_horas: 72, temperatura_ideal: 10, categoria: 'Frutas' },
  { id: 'inv-7', nome: 'Pimentão Vermelho', quantidade: 40, unidade: 'caixas', validade_horas: 60, temperatura_ideal: 8, categoria: 'Legumes' },
];

export const orders: Order[] = [
  {
    id: 'PED-4820', cliente: 'Supermercado Aurora', clienteTipo: 'VIP',
    itens: [{ nome: 'Alface Crespa', quantidade: 10, at_risk: true }, { nome: 'Tomate Italiano', quantidade: 15 }, { nome: 'Rúcula', quantidade: 6, at_risk: true }],
    valor: 2480.50, status_pagamento: 'pago', origem: 'WhatsApp IA', status_kanban: 'triagem',
    risco_perecivel: true, created_at: '2026-04-30T08:12:00Z', regiao: 'Sul',
  },
  {
    id: 'PED-4821', cliente: 'Hortifruti do Zé', clienteTipo: 'Regular',
    itens: [{ nome: 'Morango', quantidade: 8 }, { nome: 'Manga Palmer', quantidade: 12 }],
    valor: 890.00, status_pagamento: 'pendente', origem: 'Portal B2B', status_kanban: 'triagem',
    risco_perecivel: false, created_at: '2026-04-30T08:45:00Z', regiao: 'Centro',
  },
  {
    id: 'PED-4822', cliente: 'Rede Verde Vida', clienteTipo: 'VIP',
    itens: [{ nome: 'Alface Crespa', quantidade: 20, at_risk: true }, { nome: 'Pimentão Vermelho', quantidade: 10 }],
    valor: 3120.75, status_pagamento: 'faturado', origem: 'WhatsApp IA', status_kanban: 'triagem',
    risco_perecivel: true, created_at: '2026-04-30T09:02:00Z', regiao: 'Sul',
  },
  {
    id: 'PED-4810', cliente: 'Mercado Bom Preço', clienteTipo: 'Regular',
    itens: [{ nome: 'Batata Doce', quantidade: 30 }, { nome: 'Tomate Italiano', quantidade: 20 }],
    valor: 1650.00, status_pagamento: 'pago', origem: 'Vendedor', status_kanban: 'aprovado',
    risco_perecivel: false, created_at: '2026-04-30T07:30:00Z', regiao: 'Norte',
  },
  {
    id: 'PED-4811', cliente: 'Padaria Real', clienteTipo: 'Regular',
    itens: [{ nome: 'Tomate Italiano', quantidade: 5 }, { nome: 'Alface Crespa', quantidade: 3 }],
    valor: 420.30, status_pagamento: 'pago', origem: 'Portal B2B', status_kanban: 'aprovado',
    risco_perecivel: false, created_at: '2026-04-30T07:55:00Z', regiao: 'Centro',
  },
  {
    id: 'PED-4812', cliente: 'Buffet Jardim', clienteTipo: 'VIP',
    itens: [{ nome: 'Morango', quantidade: 15 }, { nome: 'Manga Palmer', quantidade: 8 }, { nome: 'Rúcula', quantidade: 4, at_risk: true }],
    valor: 2890.00, status_pagamento: 'faturado', origem: 'WhatsApp IA', status_kanban: 'aprovado',
    risco_perecivel: true, created_at: '2026-04-30T06:40:00Z', regiao: 'Sul',
  },
  {
    id: 'PED-4805', cliente: 'Restaurante Ponto Verde', clienteTipo: 'VIP',
    itens: [{ nome: 'Pimentão Vermelho', quantidade: 12 }, { nome: 'Tomate Italiano', quantidade: 25 }, { nome: 'Manga Palmer', quantidade: 6 }],
    valor: 4200.00, status_pagamento: 'pago', origem: 'Vendedor', status_kanban: 'montagem',
    risco_perecivel: false, created_at: '2026-04-30T05:20:00Z', regiao: 'Norte',
  },
  {
    id: 'PED-4806', cliente: 'Mercadinho Luz', clienteTipo: 'Regular',
    itens: [{ nome: 'Batata Doce', quantidade: 20 }, { nome: 'Tomate Italiano', quantidade: 10 }],
    valor: 980.00, status_pagamento: 'pago', origem: 'Portal B2B', status_kanban: 'montagem',
    risco_perecivel: false, created_at: '2026-04-30T05:45:00Z', regiao: 'Leste',
  },
];

export const ai_insights: AIInsight[] = [
  {
    id: 'ins-1', tipo: 'pricing', severidade: 'alta',
    titulo: 'Risco de perda: Alface Crespa',
    descricao: '30 caixas de Alface vencem amanhã. IA sugere aplicar 20% de desconto e notificar 15 clientes recorrentes.',
    impacto: 'Recuperar até R$ 2.400 em receita',
    cta: 'Executar Campanha',
  },
  {
    id: 'ins-2', tipo: 'logistics', severidade: 'media',
    titulo: 'Otimização de Rota — Região Sul',
    descricao: 'Consolidar pedidos da Região Sul em uma única carga economiza 12 km de frota e 38 min.',
    impacto: 'Economia de R$ 180 em combustível',
    cta: 'Aplicar Rota',
  },
  {
    id: 'ins-3', tipo: 'upsell', severidade: 'baixa',
    titulo: 'Oportunidade de Upsell',
    descricao: '5 clientes compraram alface sem tomate nas últimas 3 semanas. Cross-sell via WhatsApp.',
    impacto: 'Potencial de +R$ 1.120 no mês',
    cta: 'Gerar Sugestão',
  },
];

export const routes: DeliveryRoute[] = [
  {
    id: 'RT-001', caminhao: 'Caminhão 01', motorista: 'João Silva',
    paradas: [
      { id: 's0', cliente: 'CD Central', x: 0.1, y: 0.85, eta: '06:00' },
      { id: 's1', cliente: 'Supermercado Aurora', x: 0.28, y: 0.62, eta: '06:45' },
      { id: 's2', cliente: 'Rede Verde Vida', x: 0.45, y: 0.48, eta: '07:30' },
      { id: 's3', cliente: 'Buffet Jardim', x: 0.62, y: 0.35, eta: '08:20' },
      { id: 's4', cliente: 'Hortifruti do Zé', x: 0.82, y: 0.22, eta: '09:10' },
    ],
    km_total: 78, tempo_min: 195, capacidade_pct: 90, temperatura: 4, economia_km: 12,
  },
  {
    id: 'RT-002', caminhao: 'Caminhão 02', motorista: 'Marina Costa',
    paradas: [
      { id: 's0', cliente: 'CD Central', x: 0.1, y: 0.85, eta: '06:00' },
      { id: 's1', cliente: 'Mercado Bom Preço', x: 0.3, y: 0.7, eta: '06:50' },
      { id: 's2', cliente: 'Padaria Real', x: 0.5, y: 0.55, eta: '07:35' },
      { id: 's3', cliente: 'Mercadinho Luz', x: 0.7, y: 0.4, eta: '08:25' },
    ],
    km_total: 62, tempo_min: 160, capacidade_pct: 72, temperatura: 8, economia_km: 6,
  },
  {
    id: 'RT-003', caminhao: 'Caminhão 03', motorista: 'Carlos Mendes',
    paradas: [
      { id: 's0', cliente: 'CD Central', x: 0.1, y: 0.85, eta: '05:30' },
      { id: 's1', cliente: 'Restaurante Ponto Verde', x: 0.35, y: 0.5, eta: '06:20' },
      { id: 's2', cliente: 'Feira do Bairro', x: 0.55, y: 0.32, eta: '07:05' },
      { id: 's3', cliente: 'Cantina Itália', x: 0.78, y: 0.18, eta: '07:55' },
    ],
    km_total: 95, tempo_min: 220, capacidade_pct: 85, temperatura: 6, economia_km: 9,
  },
];

export const clientes: Cliente[] = [
  { id: 'c1', nome: 'Supermercado Aurora', tipo: 'VIP', ultima_compra: '2026-04-29' },
  { id: 'c2', nome: 'Rede Verde Vida', tipo: 'VIP', ultima_compra: '2026-04-28' },
  { id: 'c3', nome: 'Hortifruti do Zé', tipo: 'Regular', ultima_compra: '2026-04-27' },
];

const diasLabel = ['Sex', 'Sáb', 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom', 'Seg', 'Ter', 'Qua', 'Qui'];
export const chartData: ChartPoint[] = diasLabel.map((dia, i) => ({
  dia,
  giro: Math.round(40 + Math.sin(i / 1.8) * 18 + (i > 9 ? 15 : 0) + Math.random() * 6),
  temperatura: Math.round((22 + Math.cos(i / 2.2) * 4 + Math.random() * 1.2) * 10) / 10,
  chuva: Math.max(0, Math.round(Math.sin(i / 1.5) * 8 + Math.random() * 4)),
}));

export const originDistribution = [
  { nome: 'WhatsApp IA', valor: 48, fill: 'hsl(var(--primary))' },
  { nome: 'Portal B2B', valor: 31, fill: 'hsl(var(--accent))' },
  { nome: 'Vendedor', valor: 21, fill: 'hsl(215 20% 65%)' },
];

export const activityFeed = [
  { id: 'a1', tempo: '2 min', tipo: 'ai', texto: 'IA aplicou desconto de 15% em Rúcula (risco de perda).' },
  { id: 'a2', tempo: '12 min', tipo: 'order', texto: 'Novo pedido via WhatsApp — Supermercado Aurora.' },
  { id: 'a3', tempo: '28 min', tipo: 'route', texto: 'Rota RT-002 otimizada — economia de 6 km.' },
  { id: 'a4', tempo: '44 min', tipo: 'order', texto: 'Pedido PED-4806 faturado e movido para Montagem.' },
  { id: 'a5', tempo: '1 h', tipo: 'ai', texto: 'Copiloto notificou 12 clientes sobre Morango fresco.' },
];

export const purchases: Purchase[] = [
  { id: 'CMP-001', fornecedor: 'Fazenda Vale Verde', produto: 'Cenoura', data_compra: '2026-04-29', data_entrega_prevista: '2026-05-01', status_logistico: 'A Caminho', qtd_comprada: 100, qtd_recebida_real: 0, status_financeiro: 'Pendente', valor_total: 4000 },
  { id: 'CMP-002', fornecedor: 'Sítio São José', produto: 'Alface Crespa', data_compra: '2026-04-28', data_entrega_prevista: '2026-04-30', status_logistico: 'Recebido', qtd_comprada: 80, qtd_recebida_real: 72, status_financeiro: 'Fechado', valor_total: 2400, qualidade: 'A' },
  { id: 'CMP-003', fornecedor: 'Fazenda Esperança', produto: 'Tomate Italiano', data_compra: '2026-04-29', data_entrega_prevista: '2026-05-01', status_logistico: 'A Caminho', qtd_comprada: 150, qtd_recebida_real: 0, status_financeiro: 'Pendente', valor_total: 6750 },
  { id: 'CMP-004', fornecedor: 'Cooperativa Serra Alta', produto: 'Morango', data_compra: '2026-04-27', data_entrega_prevista: '2026-04-29', status_logistico: 'Recebido', qtd_comprada: 60, qtd_recebida_real: 54, status_financeiro: 'Fechado', valor_total: 3600, qualidade: 'B' },
  { id: 'CMP-005', fornecedor: 'Fazenda Vale Verde', produto: 'Cenoura', data_compra: '2026-04-30', data_entrega_prevista: '2026-05-02', status_logistico: 'A Caminho', qtd_comprada: 50, qtd_recebida_real: 0, status_financeiro: 'Pendente', valor_total: 2000 },
  { id: 'CMP-006', fornecedor: 'Sítio Boa Vista', produto: 'Rúcula', data_compra: '2026-04-28', data_entrega_prevista: '2026-04-30', status_logistico: 'Recebido', qtd_comprada: 40, qtd_recebida_real: 38, status_financeiro: 'Fechado', valor_total: 1200, qualidade: 'A' },
  { id: 'CMP-007', fornecedor: 'Fazenda Esperança', produto: 'Manga Palmer', data_compra: '2026-04-30', data_entrega_prevista: '2026-05-02', status_logistico: 'A Caminho', qtd_comprada: 80, qtd_recebida_real: 0, status_financeiro: 'Pendente', valor_total: 4800 },
  { id: 'CMP-008', fornecedor: 'Cooperativa Serra Alta', produto: 'Batata Doce', data_compra: '2026-04-26', data_entrega_prevista: '2026-04-28', status_logistico: 'Recebido', qtd_comprada: 200, qtd_recebida_real: 195, status_financeiro: 'Fechado', valor_total: 5000, qualidade: 'A' },
  { id: 'CMP-009', fornecedor: 'Sítio São José', produto: 'Pimentão Vermelho', data_compra: '2026-04-29', data_entrega_prevista: '2026-05-01', status_logistico: 'Cancelado', qtd_comprada: 30, qtd_recebida_real: 0, status_financeiro: 'Pendente', valor_total: 1350 },
  { id: 'CMP-010', fornecedor: 'Fazenda Vale Verde', produto: 'Cenoura', data_compra: '2026-05-01', data_entrega_prevista: '2026-05-03', status_logistico: 'A Caminho', qtd_comprada: 120, qtd_recebida_real: 0, status_financeiro: 'Pendente', valor_total: 4800 },
];
