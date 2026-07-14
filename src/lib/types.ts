export type OrderOrigin = 'WhatsApp IA' | 'Portal B2B' | 'Vendedor';
export type PaymentStatus = 'pago' | 'pendente' | 'faturado';
export type KanbanStatus = 'triagem' | 'aprovado' | 'montagem';
export type ClientTier = 'VIP' | 'Regular';

export interface InventoryItem {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string;
  validade_horas: number;
  temperatura_ideal: number; // °C
  categoria: 'Folhosos' | 'Frutas' | 'Legumes' | 'Tubérculos';
}

export interface OrderItem {
  nome: string;
  quantidade: number;
  at_risk?: boolean;
}

export interface Order {
  id: string;
  cliente: string;
  clienteTipo: ClientTier;
  itens: OrderItem[];
  valor: number;
  status_pagamento: PaymentStatus;
  origem: OrderOrigin;
  status_kanban: KanbanStatus;
  risco_perecivel: boolean;
  created_at: string; // ISO
  regiao: string;
}

export type InsightType = 'pricing' | 'logistics' | 'upsell';
export type InsightSeverity = 'alta' | 'media' | 'baixa';

export interface AIInsight {
  id: string;
  tipo: InsightType;
  severidade: InsightSeverity;
  titulo: string;
  descricao: string;
  impacto: string;
  cta: string;
}

export interface RouteStop {
  id: string;
  cliente: string;
  // normalized 0–1 coordinates for SVG
  x: number;
  y: number;
  eta: string;
}

export interface DeliveryRoute {
  id: string;
  caminhao: string;
  motorista: string;
  paradas: RouteStop[];
  km_total: number;
  tempo_min: number;
  capacidade_pct: number;
  temperatura: number;
  economia_km: number;
}

export interface Cliente {
  id: string;
  nome: string;
  tipo: ClientTier;
  ultima_compra: string;
}

export interface ChartPoint {
  dia: string;
  giro: number;
  temperatura: number;
  chuva: number;
}

export type StatusLogistico = 'A Caminho' | 'Recebido' | 'Cancelado';
export type StatusFinanceiro = 'Fechado' | 'Pendente';
export type QualidadeGrau = 'A' | 'B' | 'C';

export interface Purchase {
  id: string;
  fornecedor: string;
  produto: string;
  data_compra: string;
  data_entrega_prevista: string;
  status_logistico: StatusLogistico;
  qtd_comprada: number;
  qtd_recebida_real: number;
  status_financeiro: StatusFinanceiro;
  valor_total: number;
  qualidade?: QualidadeGrau;
}
