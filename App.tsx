import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Vehicle,
  VehicleCategory,
  CityRegion,
  Language,
  BookingRequest,
  VehicleStatus,
  ShiftSchedule
} from './types';
import { MOCK_VEHICLES, INITIAL_BOOKINGS, CITIES } from './constants';
import { TRANSLATIONS } from './translations';
import { Navbar } from './components/Navbar';
import { BottomNav, TabType } from './components/BottomNav';
import { CategorySelector } from './components/CategorySelector';
import { RegionalFilter } from './components/RegionalFilter';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetailView } from './components/VehicleDetailView';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { OwnerLogin } from './components/OwnerLogin';
import { DriverPortal } from './components/DriverPortal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { playBookingChime } from './components/AudioAlert';
import { SearchIcon, BusIcon, CarIcon, StarIcon, MapPinIcon, ShieldCheckIcon } from './components/icons';

const App: React.FC = () => {
  // Splash Screen reveal state (instant smooth launch animation)
  const [showSplash, setShowSplash] = useState(true);

  // Localization state (Phase 5)
  const [language, setLanguage] = useState<Language>('en');
  const t = TRANSLATIONS[language];

  // Dynamically update document direction for Arabic RTL support (Phase 5)
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Dismiss splash automatically after clean enterprise reveal (1.8s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Global Fleet and Bookings State (100% online in-memory state)
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [bookings, setBookings] = useState<BookingRequest[]>(INITIAL_BOOKINGS);

  // Owner Authentication State
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false);
  const [ownerManagerName, setOwnerManagerName] = useState('App Owner / Manager');

  // Navigation & View Routing State (Phase 1, 2, 3, 4, 7, 10, 11)
  const [currentTab, setCurrentTab] = useState<TabType>('explore');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);

  // Filtering State (Phase 2 & 9)
  const [activeCategory, setActiveCategory] = useState<VehicleCategory | 'all'>('all');
  const [selectedCity, setSelectedCity] = useState<CityRegion | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Unread Bookings Count for Real-Time Admin Alerts (Phase 11)
  const unreadCount = useMemo(() => {
    return bookings.filter(b => b.unread).length;
  }, [bookings]);

  // Counts for Category & Regional selectors
  const schoolCount = useMemo(() => {
    return vehicles.filter(v => v.category === 'school_bus').length;
  }, [vehicles]);

  const universityCount = useMemo(() => {
    return vehicles.filter(v => v.category === 'university_car').length;
  }, [vehicles]);

  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = { all: vehicles.length };
    CITIES.forEach(c => {
      counts[c] = vehicles.filter(v => v.city === c).length;
    });
    return counts;
  }, [vehicles]);

  // Filtered vehicles list (Phase 2, 3, 9)
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Category filter
      if (activeCategory !== 'all' && v.category !== activeCategory) return false;
      // City filter
      if (selectedCity !== 'all' && v.city !== selectedCity) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesModel = v.carModel.toLowerCase().includes(q);
        const matchesDriver = v.driverName.toLowerCase().includes(q);
        const matchesPlate = v.plateNumber.toLowerCase().includes(q);
        const matchesCity = v.city.toLowerCase().includes(q);
        const matchesInst = v.institutionAffiliation?.toLowerCase().includes(q) || false;
        if (!matchesModel && !matchesDriver && !matchesPlate && !matchesCity && !matchesInst) {
          return false;
        }
      }
      return true;
    });
  }, [vehicles, activeCategory, selectedCity, searchQuery]);

  // Real-Time Driver Status Toggle (Phase 10)
  const handleToggleDriverStatus = useCallback((vehicleId: number) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) {
        const nextStatus = v.driverStatus === 'online' ? 'offline' : 'online';
        return {
          ...v,
          driverStatus: nextStatus
        };
      }
      return v;
    }));

    // If currently viewing details of this vehicle, update detail view too
    setSelectedVehicle(prev => {
      if (prev && prev.id === vehicleId) {
        return {
          ...prev,
          driverStatus: prev.driverStatus === 'online' ? 'offline' : 'online'
        };
      }
      return prev;
    });
  }, []);

  // Admin Fleet Management: Add Vehicle (Phase 7)
  const handleAddVehicle = useCallback((newVehicle: Vehicle) => {
    setVehicles(prev => [newVehicle, ...prev]);
  }, []);

  // Admin Fleet Management: Delete Vehicle (Phase 8)
  const handleDeleteVehicle = useCallback((id: number) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
    if (selectedVehicle?.id === id) {
      setSelectedVehicle(null);
    }
  }, [selectedVehicle]);

  // Booking Requests & Instant Admin Alert Submission (Phase 11)
  const handleBookingSubmit = useCallback((bookingData: Omit<BookingRequest, 'id' | 'createdAt' | 'unread' | 'status'>) => {
    const nextBookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: BookingRequest = {
      ...bookingData,
      id: nextBookingId,
      status: 'pending',
      createdAt: 'Just now',
      unread: true
    };

    // Play instant sound alert
    playBookingChime();

    // Add to alerts inbox
    setBookings(prev => [newBooking, ...prev]);
  }, []);

  // Update Booking Status & Mark as Read
  const handleUpdateBookingStatus = useCallback((id: string, status: BookingRequest['status']) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status,
          unread: false
        };
      }
      return b;
    }));
  }, []);

  // Switch Tab Handler
  const handleSelectTab = (tab: TabType) => {
    setSelectedVehicle(null);
    setCurrentTab(tab);
  };

  const handleOwnerLoginSuccess = (name: string) => {
    setOwnerManagerName(name);
    setIsOwnerAuthenticated(true);
  };

  const handleOwnerLogout = () => {
    setIsOwnerAuthenticated(false);
    setCurrentTab('explore');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* App Launch Splash Screen - Clean Enterprise Minimalist (Phase 1) */}
      {showSplash && (
        <div
          className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-fade-in select-none"
        >
          {/* Centered Shield Logo with Subtle Enterprise Glow */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 mb-4 animate-pulse-fast">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <img
              src="/logo.svg"
              alt="Easy Bus Emblem"
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_30px_rgba(234,179,8,0.35)]"
            />
          </div>

          <div className="space-y-1 relative z-10">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
              <span>Easy</span>
              <span className="text-amber-400">Bus</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              {t.appTagline}
            </p>
          </div>
        </div>
      )}

      {/* Top App Navbar (shown when not in detail view) */}
      {!selectedVehicle && (
        <Navbar
          currentLanguage={language}
          onLanguageChange={setLanguage}
          onOpenAdmin={() => setCurrentTab('admin')}
          onOpenDriver={() => setCurrentTab('driver')}
          unreadBookingsCount={unreadCount}
          t={t}
        />
      )}

      {/* Main App Container */}
      <main className="flex-1 w-full max-w-2xl mx-auto">
        {/* Phase 4: Full Vehicle Detail View */}
        {selectedVehicle ? (
          <VehicleDetailView
            vehicle={selectedVehicle}
            onBack={() => setSelectedVehicle(null)}
            onBook={(v) => setBookingVehicle(v)}
            onToggleDriverStatus={handleToggleDriverStatus}
            t={t}
          />
        ) : currentTab === 'admin' ? (
          /* Owner / Manager Portal with Authentication Gate */
          isOwnerAuthenticated ? (
            <AdminDashboard
              vehicles={vehicles}
              bookings={bookings}
              onAddVehicle={handleAddVehicle}
              onDeleteVehicle={handleDeleteVehicle}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              onToggleDriverStatus={handleToggleDriverStatus}
              onLogout={handleOwnerLogout}
              onBack={() => setCurrentTab('explore')}
              managerName={ownerManagerName}
              t={t}
            />
          ) : (
            <OwnerLogin
              onLoginSuccess={handleOwnerLoginSuccess}
              onCancel={() => setCurrentTab('explore')}
              t={t}
            />
          )
        ) : currentTab === 'driver' ? (
          /* Phase 10: Real-Time Driver Status Portal */
          <DriverPortal
            vehicles={vehicles}
            onToggleDriverStatus={handleToggleDriverStatus}
            onBack={() => setCurrentTab('explore')}
            t={t}
          />
        ) : (
          /* Primary Explore & Category Directory (Phases 1, 2, 3, 9, 10) */
          <div className="px-4 py-4 pb-28 space-y-4">
            {/* Phase 1: PWA Browser Install Banner */}
            <PwaInstallPrompt t={t} />

            {/* Phase 2: Category Selection Interface (School Bus vs University Car) */}
            <CategorySelector
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              t={t}
              schoolCount={schoolCount}
              universityCount={universityCount}
            />

            {/* Phase 9: Regional Filtering & Multi-Location Support */}
            <RegionalFilter
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
              t={t}
              cityCounts={cityCounts}
            />

            {/* Search Input Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <SearchIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Vehicle Listings Header */}
            <div className="flex items-center justify-between pt-1 px-1">
              <span className="text-xs font-extrabold text-white">
                {activeCategory === 'school_bus'
                  ? t.schoolBus
                  : activeCategory === 'university_car'
                    ? t.universityCar
                    : t.allCategories}
                {selectedCity !== 'all' && ` • ${t.cityRegions[selectedCity]}`}
              </span>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                {filteredVehicles.length} Vehicles Available
              </span>
            </div>

            {/* Phase 3 & 4: Vehicle Cards Grid (tap opens detail view) */}
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onSelect={(v) => setSelectedVehicle(v)}
                    onBook={(v) => setBookingVehicle(v)}
                    t={t}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 px-6 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-2">
                <BusIcon className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-extrabold text-white">
                  {t.noVehiclesFound}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  {t.noVehiclesFoundDesc}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setSelectedCity('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Phase 11: Booking Modal */}
      <BookingModal
        isOpen={!!bookingVehicle}
        onClose={() => setBookingVehicle(null)}
        onSubmitBooking={handleBookingSubmit}
        vehicle={bookingVehicle}
        t={t}
      />

      {/* Phase 6: Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp t={t} lang={language} />

      {/* Native Mobile App Bottom Navigation Bar (hidden on detail view) */}
      {!selectedVehicle && (
        <BottomNav
          activeTab={currentTab}
          onSelectTab={handleSelectTab}
          unreadCount={unreadCount}
          t={t}
        />
      )}
    </div>
  );
};

export default App;
