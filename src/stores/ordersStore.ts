import { create } from 'zustand';
import { orders as initialOrders } from '@/lib/mockData';
import type { KanbanStatus, Order } from '@/lib/types';

interface OrdersState {
  orders: Order[];
  moveOrder: (orderId: string, to: KanbanStatus) => void;
  getByStatus: (status: KanbanStatus) => Order[];
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: initialOrders,
  moveOrder: (orderId, to) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, status_kanban: to } : o)),
    })),
  getByStatus: (status) => get().orders.filter((o) => o.status_kanban === status),
}));
