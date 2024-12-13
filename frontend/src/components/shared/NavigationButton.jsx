import { Button } from "@/components/ui/button";

export function NavigationButton({ icon: Icon, label }) {
  return (
    <Button 
      variant="ghost" 
      className="flex flex-col items-center gap-1 rounded-full px-4 py-3 hover:bg-slate-100"
    >
      <Icon className="h-6 w-6 text-slate-700" />
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
}

