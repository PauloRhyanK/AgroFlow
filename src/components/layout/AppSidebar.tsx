import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Kanban, Route, Smartphone, Leaf, Sparkles, PackageSearch, Truck } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const items = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Vendas / CRM', url: '/vendas', icon: Kanban },
  { title: 'Suprimentos', url: '/suprimentos', icon: PackageSearch },
  { title: 'Cargas', url: '/cargas', icon: Truck },
  { title: 'Roteirização', url: '/roteirizacao', icon: Route },
  { title: 'Portal B2B', url: '/portal-cliente', icon: Smartphone },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { pathname } = useLocation();
  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-hero flex items-center justify-center shadow-[var(--shadow-glow-primary)]">
            <Leaf className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-bold tracking-tight text-sidebar-foreground">AgroFlow</span>
              <span className="text-[11px] text-muted-foreground font-medium">Logística Perecível</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-semibold hover:bg-sidebar-accent/60 h-10 rounded-lg"
                  >
                    <NavLink to={item.url} end={item.url === '/'} className="flex items-center gap-3">
                      <item.icon className="h-[18px] w-[18px] shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className={`rounded-xl border border-primary/20 bg-primary/5 p-3 ${collapsed ? 'flex justify-center' : ''}`}>
          {collapsed ? (
            <div className="relative">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary pulse-ring" />
            </div>
          ) : (
            <div className="flex items-start gap-2.5">
              <div className="relative mt-0.5">
                <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-primary pulse-ring" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-semibold text-foreground">Motor IA ativo</span>
                <span className="text-[10px] text-muted-foreground">Analisando em tempo real</span>
              </div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
