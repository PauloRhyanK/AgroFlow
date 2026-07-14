
# Módulo de Orquestração de Carga (`/cargas`)

Interface touch-first otimizada para tablet landscape, usada por conferentes em pé.

## Arquivos a criar/editar

### 1. `src/lib/mockDataCargas.ts` — Mock de dados
- `vehicles`: array com 3 veículos (`id`, `placa`, `motorista`, `capacidade_max_kg`, `capacidade_atual_kg`)
- `cargo_items`: array com ~8 itens (`id`, `pedido_id`, `cliente`, `produto`, `qtd_esperada`, `qtd_conferida`, `peso_unitario_kg`, `status: "pendente" | "ok" | "divergente"`)

### 2. `src/pages/Cargas.tsx` — Página principal

Layout landscape dividido em 3 zonas:

**A. Header de Operação (topo)**
- Esquerda: Selects grandes (veículo + motorista) com altura `h-14` e texto `text-base`
- Direita: Card de capacidade com `Progress` animado (framer-motion). Cores semânticas: verde <80%, laranja 80-95%, vermelho >95%. Texto grande: "2.100 kg / 3.000 kg (70%)"

**B. Área Principal — Checklist de Conferência**
- Cards largos (100% width) com `min-h-[80px]`, linhas bem espaçadas
- Cada card: Cliente, Produto, Qtd Esperada
- Controle de quantidade: botões `[-]` e `[+]` com `h-14 w-14` (alvos touch grandes), input numérico central `w-20 h-14 text-2xl text-center`
- Botão "Confirmar" `h-14` com ícone Check. Ao confirmar:
  - Linha ganha `bg-emerald-50` com animação framer-motion (flash verde)
  - Ícone CheckCircle aparece
  - Peso somado na barra de capacidade
  - Se qtd_conferida != qtd_esperada, fundo `bg-red-50` + badge "Divergente"

**C. Painel Inferior — Integração & Transparência**
- Card "Status de Hardware" com visual tech: botão "Conectar Balança / Contador Digital" com ícone Wifi
- Toggle Switch destacado: "Transparência em Tempo Real" com subtexto sobre WhatsApp automático

**D. FAB (Floating Action Button)**
- Botão fixo `fixed bottom-6 right-6` com `h-16 px-8 text-lg rounded-2xl`: "🚚 Finalizar e Liberar Caminhão"
- Toast de sucesso ao clicar

### 3. `src/App.tsx` — Adicionar rota `/cargas`

### 4. `src/components/layout/AppSidebar.tsx` — Adicionar link "Cargas" com ícone `Truck`

## Stack utilizada
- shadcn/ui: Progress, Select, Badge, Switch, Card, Button
- Lucide React: ícones `w-6 h-6` e `w-8 h-8`
- Framer Motion: animação da barra de progresso + flash verde nas linhas confirmadas
- Sonner: toasts de feedback
- Design tokens existentes do index.css (semantic colors)

## Detalhes de UX
- Zero modais com teclado — tudo via botões touch
- Padding generoso (`p-4 md:p-6`), gap entre elementos `gap-4`
- Todos os botões interativos com min `h-12` para alvos touch confortáveis
- Estado gerenciado com `useState` local (sem Zustand necessário para esta tela)
