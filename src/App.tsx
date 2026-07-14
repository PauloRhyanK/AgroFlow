import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Vendas from "./pages/Vendas";
import Suprimentos from "./pages/Suprimentos";
import Cargas from "./pages/Cargas";
import Roteirizacao from "./pages/Roteirizacao";
import PortalCliente from "./pages/PortalCliente";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vendas" element={<Vendas />} />
            <Route path="/suprimentos" element={<Suprimentos />} />
            <Route path="/cargas" element={<Cargas />} />
            <Route path="/roteirizacao" element={<Roteirizacao />} />
            <Route path="/portal-cliente" element={<PortalCliente />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
