import { SearchBar } from '../components/shared/SearchBar';
import { BottomNav } from '../components/layout/BottomNav';
import MapPlaceholder from '../components/map/MapPlaceholder';
import { BusLocationProvider } from '../context/BusLocationContext';

export function HomePage() {
  return (
    <BusLocationProvider>
      <div className="fixed inset-0 flex flex-col">
        {/* Full-screen Map */}
        <div className="absolute inset-0 z-0">
          <MapPlaceholder />
        </div>

        {/* Floating Controls */}
        <div className="relative z-10 flex flex-col h-full pointer-events-none">
          {/* Search Bar */}
          <div className="pointer-events-auto px-4 mt-4">
            <div className="max-w-xl mx-auto">
              <SearchBar />
            </div>
          </div>

          {/* Bottom Navigation - Floating */}
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

