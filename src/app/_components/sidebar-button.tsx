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
      className={`flex items-center justify-start w-full bg-gray-50 hover:bg-gray-200 hover:text-gray-700 ${
        pathname === href ? "text-gray-800" : "text-gray-400"
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
