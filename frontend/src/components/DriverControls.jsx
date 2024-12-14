import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bus, MapPin } from 'lucide-react';

const DriverControls = ({ onLocationToggle }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = (checked) => {
    setIsActive(checked);
    onLocationToggle(checked);
  };

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <Card className="w-64 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bus className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-800">Bus Status</h3>
              </div>
              <Switch 
                checked={isActive} 
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between pt-1">
              <Badge 
                variant={isActive ? "default" : "secondary"}
                className={`${isActive 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} 
                  transition-colors duration-200`}
              >
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{isActive ? "Moving" : "Stopped"}</span>
                </div>
              </Badge>
              <span className={`text-sm font-medium ${isActive 
                ? 'text-blue-500' 
                : 'text-gray-500'}`}>
                {isActive ? "On Route" : "Off Route"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverControls;