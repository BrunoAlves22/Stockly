"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  href: string;
  children: React.ReactNode;
  label: string;
}

export function SidebarButton({ href, label, children }: SidebarButtonProps) {
  const pathname = usePathname();

  return (
    <Button
      className={`flex items-center justify-start w-full bg-gray-50 hover:bg-emerald-100 hover:text-emerald-700 ${
        pathname === href
          ? "text-emerald-500 bg-emerald-50 ring-1 ring-emerald-200"
          : "text-gray-400 bg-gray-100 ring-1 ring-gray-200"
      }`}
      asChild
    >
      <Link href={href} prefetch>
        {children}
        <span className="sr-only">{label}</span>
        {label}
      </Link>
    </Button>
  );
}
