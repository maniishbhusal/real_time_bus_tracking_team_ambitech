import { BottomNav } from "../components/layout/BottomNav";
import MapPlaceholder from "../components/map/MapPlaceholder";
import { BusLocationProvider } from "../context/BusLocationContext";
import { useAuth } from '../context/AuthContext';
import DriverControls from "../components/DriverControls";

export function HomePage() {
  const { isAuthenticated } = useAuth(); // Check authentication state

  return (
      <BusLocationProvider>
        <div className="fixed inset-0 flex flex-col">
          {/* Full-screen Map */}
          <div className="absolute inset-0 z-0">
            <MapPlaceholder />
          </div>

          {/* Floating Controls */}
          <div className="relative z-10 flex flex-col h-full pointer-events-none">
            {/* Conditionally render DriverControls for authenticated users */}
            {isAuthenticated && (
              <div className="pointer-events-auto mt-auto mb-6 px-4">
                <DriverControls />
              </div>
            )}
            
            {/* Bottom Navigation - Always visible */}
            <div className="pointer-events-auto mt-auto mb-6 px-4">
              <div className="max-w-xl mx-auto">
                <BottomNav />
              </div>
            </div>
          </div>
        </div>
      </BusLocationProvider>
  );
}
