export interface Vehicle {
  id: string;
  placa: string;
  motorista: string;
  capacidade_max_kg: number;
}

export type CargoStatus = 'pendente' | 'incompleto' | 'concluido';

export interface Fornecedor {
  nome: string;
  qtd_disponivel: number;
}

export interface CargoItem {
  id: string;
  pedido_id: string;
  cliente: string;
  produto: string;
  qtd_esperada: number;
  qtd_conferida: number;
  peso_unitario_kg: number;
  status: CargoStatus;
  fornecedores: Fornecedor[];
}

export const vehicles: Vehicle[] = [
  { id: 'v1', placa: 'ABC-1D23', motorista: 'Carlos Silva', capacidade_max_kg: 3000 },
  { id: 'v2', placa: 'DEF-4G56', motorista: 'Roberto Almeida', capacidade_max_kg: 4500 },
  { id: 'v3', placa: 'GHI-7H89', motorista: 'João Pereira', capacidade_max_kg: 3000 },
];

export const cargoItems: CargoItem[] = [
  { id: 'c1', pedido_id: 'PED-1001', cliente: 'Hortifruti Bela Vista', produto: 'Tomate Extra', qtd_esperada: 50, qtd_conferida: 0, peso_unitario_kg: 18, status: 'pendente', fornecedores: [{ nome: 'Fazenda Vale Verde', qtd_disponivel: 50 }, { nome: 'Sítio São José', qtd_disponivel: 20 }] },
  { id: 'c2', pedido_id: 'PED-1001', cliente: 'Hortifruti Bela Vista', produto: 'Alface Crespa', qtd_esperada: 30, qtd_conferida: 0, peso_unitario_kg: 5, status: 'pendente', fornecedores: [{ nome: 'Fazenda Vale Verde', qtd_disponivel: 30 }] },
  { id: 'c3', pedido_id: 'PED-1002', cliente: 'Restaurante Sabor Natural', produto: 'Cenoura Baby', qtd_esperada: 20, qtd_conferida: 0, peso_unitario_kg: 12, status: 'pendente', fornecedores: [{ nome: 'Sítio São José', qtd_disponivel: 15 }, { nome: 'Chácara Boa Vista', qtd_disponivel: 10 }] },
  { id: 'c4', pedido_id: 'PED-1002', cliente: 'Restaurante Sabor Natural', produto: 'Batata Inglesa', qtd_esperada: 40, qtd_conferida: 0, peso_unitario_kg: 25, status: 'pendente', fornecedores: [{ nome: 'Fazenda Vale Verde', qtd_disponivel: 40 }] },
  { id: 'c5', pedido_id: 'PED-1003', cliente: 'Supermercado FreshMart', produto: 'Manga Palmer', qtd_esperada: 25, qtd_conferida: 0, peso_unitario_kg: 14, status: 'pendente', fornecedores: [{ nome: 'Sítio São José', qtd_disponivel: 25 }] },
  { id: 'c6', pedido_id: 'PED-1003', cliente: 'Supermercado FreshMart', produto: 'Banana Prata', qtd_esperada: 60, qtd_conferida: 0, peso_unitario_kg: 22, status: 'pendente', fornecedores: [{ nome: 'Fazenda Vale Verde', qtd_disponivel: 35 }, { nome: 'Chácara Boa Vista', qtd_disponivel: 30 }] },
  { id: 'c7', pedido_id: 'PED-1004', cliente: 'Sacolão do Povo', produto: 'Abóbora Moranga', qtd_esperada: 15, qtd_conferida: 0, peso_unitario_kg: 30, status: 'pendente', fornecedores: [{ nome: 'Sítio São José', qtd_disponivel: 15 }] },
  { id: 'c8', pedido_id: 'PED-1004', cliente: 'Sacolão do Povo', produto: 'Pepino Japonês', qtd_esperada: 35, qtd_conferida: 0, peso_unitario_kg: 8, status: 'pendente', fornecedores: [{ nome: 'Fazenda Vale Verde', qtd_disponivel: 20 }, { nome: 'Sítio São José', qtd_disponivel: 20 }] },
];
