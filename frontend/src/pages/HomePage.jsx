import { BottomNav } from "../components/layout/BottomNav";
import MapPlaceholder from "../components/map/MapPlaceholder";
import { AuthProvider } from "../context/AuthContext";
import { BusLocationProvider } from "../context/BusLocationContext";

export function HomePage() {
  return (
    <BusLocationProvider>
      <AuthProvider>
        <div className="fixed inset-0 flex flex-col">
          {/* Full-screen Map */}
          <div className="absolute inset-0 z-0">
            <MapPlaceholder />
          </div>

          {/* Floating Controls */}
          <div className="relative z-10 flex flex-col h-full pointer-events-none">
            {/* Bottom Navigation - Floating */}
            <div className="pointer-events-auto mt-auto mb-6 px-4">
              <div className="max-w-xl mx-auto">
                <BottomNav />
              </div>
            </div>
          </div>
        </div>
      </AuthProvider>
    </BusLocationProvider>
  );
}
