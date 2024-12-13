import React from 'react';
import { Home, Bus, Navigation2, User } from 'lucide-react';
import { NavigationButton } from '../shared/NavigationButton';
import { Card } from "@/components/ui/card";

export function BottomNav() {
  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Bus, label: 'Live Buses' },
    { icon: Navigation2, label: 'Nearest' },
    { icon: User, label: 'Login' }
  ];

  return (
    <Card className="border-0 bg-white/95 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-center gap-3 rounded-full px-2 py-2">
        {navItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <NavigationButton icon={item.icon} label={item.label} />
            {index < navItems.length - 1 && (
              <div className="h-8 w-px bg-slate-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
}

