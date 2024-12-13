import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white">
      <Search className="h-5 w-5 text-slate-500" />
      <Input 
        type="text" 
        placeholder="Where to?"
        className="w-64 border-0 bg-transparent p-0 focus-visible:ring-0"
      />
    </div>
  );
}

