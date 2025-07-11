import { BoxIcon, LayoutGridIcon, ShoppingBasketIcon } from "lucide-react";

import { SidebarButton } from "./sidebar-button";

export function Sidebar() {
  return (
    <div className="w-64 h-full bg-gray-100">
      <div className="px-8 py-6">
        <h1 className="font-bold text-3xl text-emerald-500">Stockly</h1>
      </div>

      <div className="flex flex-col gap-2 p-2 *:px-6 *:py-3 *:justify-start *:cursor-pointer">
        <SidebarButton href="/" label="Início">
          <LayoutGridIcon className="w-5 h-5" />
        </SidebarButton>
        <SidebarButton href="/products" label="Produtos">
          <BoxIcon className="w-5 h-5" />
        </SidebarButton>
        <SidebarButton href="/sales" label="Vendas">
          <ShoppingBasketIcon className="w-5 h-5" />
        </SidebarButton>
      </div>
    </div>
  );
}
