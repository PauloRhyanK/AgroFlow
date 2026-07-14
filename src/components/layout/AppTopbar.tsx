import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Package, Users, Route as RouteIcon } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function AppTopbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header className="h-14 sticky top-0 z-30 flex items-center gap-3 px-4 md:px-6 border-b border-border bg-background/80 backdrop-blur">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      <button
        onClick={() => setOpen(true)}
        className="group flex-1 max-w-xl flex items-center gap-2.5 h-9 px-3 rounded-lg bg-muted/60 hover:bg-muted border border-transparent hover:border-border transition-colors text-left"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Buscar pedidos, clientes, rotas…</span>
        <kbd className="ml-auto hidden sm:inline-flex items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button className="relative h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
          <Bell className="h-[18px] w-[18px] text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-ai ring-2 ring-background" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 h-9 pl-1 pr-2.5 rounded-lg hover:bg-muted transition-colors">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary text-primary-foreground text-[11px] font-semibold">RL</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline text-sm font-medium">Rafael L.</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Rafael Lima</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem>Ajuda</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Digite para buscar em toda a plataforma…" />
        <CommandList>
          <CommandEmpty>Nenhum resultado.</CommandEmpty>
          <CommandGroup heading="Pedidos">
            <CommandItem onSelect={() => go('/vendas')}>
              <Package className="mr-2 h-4 w-4" /> PED-4820 — Supermercado Aurora
            </CommandItem>
            <CommandItem onSelect={() => go('/vendas')}>
              <Package className="mr-2 h-4 w-4" /> PED-4822 — Rede Verde Vida
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Clientes">
            <CommandItem onSelect={() => go('/portal-cliente')}>
              <Users className="mr-2 h-4 w-4" /> Supermercado Aurora (VIP)
            </CommandItem>
            <CommandItem onSelect={() => go('/portal-cliente')}>
              <Users className="mr-2 h-4 w-4" /> Rede Verde Vida (VIP)
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Rotas">
            <CommandItem onSelect={() => go('/roteirizacao')}>
              <RouteIcon className="mr-2 h-4 w-4" /> RT-001 — Caminhão 01
            </CommandItem>
            <CommandItem onSelect={() => go('/roteirizacao')}>
              <RouteIcon className="mr-2 h-4 w-4" /> RT-002 — Caminhão 02
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
