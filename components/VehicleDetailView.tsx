import React, { useState } from 'react';
import { Vehicle, VehicleStatus } from '../types';
import { Translations } from '../translations';
import { DEFAULT_WHATSAPP_NUMBER } from '../constants';
import { 
  ChevronLeftIcon, 
  ShareIcon, 
  StarIcon, 
  UsersIcon, 
  ClockIcon, 
  MapPinIcon, 
  BusIcon, 
  CarIcon, 
  IdBadgeIcon, 
  PhoneIcon, 
  WhatsAppIcon, 
  ShieldCheckIcon,
  CheckCircleIcon,
  CloseIcon
} from './icons';

interface VehicleDetailViewProps {
  vehicle: Vehicle;
  onBack: () => void;
  onBook: (vehicle: Vehicle) => void;
  onToggleDriverStatus?: (vehicleId: number) => void;
  t: Translations;
}

export const VehicleDetailView: React.FC<VehicleDetailViewProps> = ({
  vehicle,
  onBack,
  onBook,
  onToggleDriverStatus,
  t
}) => {
  // Combine cover image and additional images for guaranteed 4+ photos gallery
  const allImages = [
    vehicle.imageUrl,
    ...(vehicle.additionalImages && vehicle.additionalImages.length > 0
      ? vehicle.additionalImages
      : [
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=900&auto=format&fit=crop&q=80'
        ])
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${vehicle.carModel} - Easy Bus`,
      text: `Ride with ${vehicle.driverName} in ${vehicle.city}. Model: ${vehicle.carModel} (${vehicle.plateNumber}). Rated ${vehicle.rating}/5.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2500);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  const getWhatsAppUrl = () => {
    const msg = encodeURIComponent(
      `Hello Easy Bus! I am interested in booking vehicle: ${vehicle.carModel} (Plate: ${vehicle.plateNumber}) driven by ${vehicle.driverName} in ${vehicle.city}.`
    );
    return `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${msg}`;
  };

  const getStatusBadge = () => {
    switch (vehicle.status) {
      case VehicleStatus.Available:
        return (
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {t.statusAvailable}
          </span>
        );
      case VehicleStatus.InUse:
        return (
          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            {t.statusInUse}
          </span>
        );
      case VehicleStatus.Maintenance:
        return (
          <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            {t.statusMaintenance}
          </span>
        );
    }
  };

  const getShiftLabel = () => {
    switch (vehicle.shift) {
      case 'morning':
        return t.morning;
      case 'afternoon':
        return t.afternoon;
      case 'both':
        return t.bothShifts;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-28 animate-fade-in text-slate-100">
      {/* Top Floating App Header */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex items-center justify-between safe-pt">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 active:scale-95 transition-all shadow-md"
          aria-label="Back"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <div className="text-center px-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-orange-400">
            {vehicle.category === 'school_bus' ? t.schoolBus : t.universityCar}
          </span>
          <h2 className="text-sm font-extrabold text-white truncate max-w-[200px]">
            {vehicle.carModel}
          </h2>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 active:scale-95 transition-all shadow-md"
          aria-label="Share"
        >
          <ShareIcon className="w-4 h-4" />
        </button>
      </div>

      {copiedNotification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl animate-fade-in flex items-center gap-1.5">
          <CheckCircleIcon className="w-4 h-4" />
          <span>Vehicle link copied to clipboard!</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-5">
        {/* Phase 4: Image Gallery (Min 4 Photos) */}
        <div className="space-y-3">
          {/* Main Active Photo with Zoom trigger */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl cursor-pointer group"
          >
            <img
              src={allImages[selectedImageIndex]}
              alt={`${vehicle.carModel} Photo ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Tap to expand hint */}
            <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-orange-400">
                <path d="M13.28 7.78l3.22-3.22v2.69a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.69l-3.22 3.22a.75.75 0 001.06 1.06zM2 17.25v-4.5a.75.75 0 011.5 0v2.69l3.22-3.22a.75.75 0 011.06 1.06L4.56 16.5h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
              </svg>
              <span>{t.viewAllPhotos} ({allImages.length})</span>
            </div>

            {/* Active image indicator badge */}
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full border border-white/10 shadow-lg">
              {selectedImageIndex + 1} / {allImages.length}
            </div>
          </div>

          {/* Thumbnail Carousel (Min 4 Photos Selector) */}
          <div className="grid grid-cols-4 gap-2">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative h-16 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all active:scale-95 shadow-md ${
                  selectedImageIndex === idx
                    ? 'border-orange-500 ring-2 ring-orange-500/50 scale-[1.02]'
                    : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Header & Quick Badges */}
        <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-black uppercase tracking-wider bg-orange-500/15 text-orange-400 px-2.5 py-0.5 rounded-full border border-orange-500/30">
                  {vehicle.category === 'school_bus' ? t.schoolBus : t.universityCar}
                </span>
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <MapPinIcon className="w-3.5 h-3.5 text-orange-400" />
                  {t.cityRegions[vehicle.city]}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {vehicle.carModel}
              </h1>
              <p className="text-xs font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-lg inline-block mt-1.5 border border-slate-800">
                {vehicle.plateNumber}
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-end gap-2">
              {getStatusBadge()}
              <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-2xl text-amber-400 font-black text-sm">
                <StarIcon className="w-4 h-4 fill-amber-400" />
                <span>{vehicle.rating.toFixed(1)}</span>
                <span className="text-[10px] text-slate-400 font-medium">({vehicle.reviewsCount})</span>
              </div>
            </div>
          </div>

          {vehicle.institutionAffiliation && (
            <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheckIcon className="w-5 h-5 text-orange-400 shrink-0" />
              <div>
                <span className="text-slate-400 text-[10px] block">Assigned Institution / Campus</span>
                <span className="font-bold text-white">{vehicle.institutionAffiliation}</span>
              </div>
            </div>
          )}
        </div>

        {/* Phase 4: Driver Information Card */}
        <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <IdBadgeIcon className="w-4 h-4 text-orange-400" />
              <span>{t.driverInfo}</span>
            </h3>

            {/* Real-time Driver Status Indicator */}
            <div className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full ${
              vehicle.driverStatus === 'online'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                vehicle.driverStatus === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
              }`} />
              <span>{vehicle.driverStatus === 'online' ? t.driverIsOnline : t.driverIsOffline}</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800">
            <div className="relative shrink-0">
              <img
                src={vehicle.driverAvatar}
                alt={vehicle.driverName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
              />
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-950 ${
                vehicle.driverStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'
              }`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-base font-extrabold text-white truncate">
                  {vehicle.driverName}
                </h4>
                <ShieldCheckIcon className="w-4 h-4 text-sky-400 shrink-0" title="Vetted & Verified Driver" />
              </div>
              
              {/* Driver National ID (Phase 4 requirement) */}
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="text-slate-400 text-[11px] font-medium">{t.driverNationalId}:</span>
                <span className="font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                  {vehicle.driverNationalId}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Direct Communication Buttons for Driver */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${vehicle.driverPhoneNumber}`}
              className="py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-700 active:scale-95 shadow-md"
            >
              <PhoneIcon className="w-4 h-4 text-emerald-400" />
              <span>{t.directCall}</span>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 transition-all border border-emerald-500/30 active:scale-95 shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Driver</span>
            </a>
          </div>

          {/* Toggle Driver Availability Button (Phase 10) */}
          {onToggleDriverStatus && (
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">{t.toggleDriverStatus}</span>
              <button
                type="button"
                onClick={() => onToggleDriverStatus(vehicle.id)}
                className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all active:scale-95 shadow-md ${
                  vehicle.driverStatus === 'online'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                }`}
              >
                Switch to {vehicle.driverStatus === 'online' ? t.offline : t.online}
              </button>
            </div>
          )}
        </div>

        {/* Phase 4: Vehicle Specifications & Operational Status */}
        <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">
            {t.vehicleSpecs} & {t.operationalStatus}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Total Seat Capacity */}
            <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800">
              <UsersIcon className="w-5 h-5 text-orange-400 mb-1.5" />
              <span className="text-[10px] text-slate-400 block font-medium">{t.seatCapacity}</span>
              <span className="text-base font-extrabold text-white">{vehicle.seats} Passenger Seats</span>
            </div>

            {/* Shift Schedule */}
            <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800">
              <ClockIcon className="w-5 h-5 text-orange-400 mb-1.5" />
              <span className="text-[10px] text-slate-400 block font-medium">{t.shiftSchedule}</span>
              <span className="text-sm font-extrabold text-white">{getShiftLabel()}</span>
            </div>

            {/* Operating City */}
            <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 col-span-2 sm:col-span-1">
              <MapPinIcon className="w-5 h-5 text-orange-400 mb-1.5" />
              <span className="text-[10px] text-slate-400 block font-medium">{t.city}</span>
              <span className="text-sm font-extrabold text-white">{t.cityRegions[vehicle.city]}</span>
            </div>
          </div>

          {/* Features / Amenities */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              {t.features}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {vehicle.features.map((feature, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 p-2.5 bg-slate-950/50 rounded-xl border border-slate-800/80 text-xs text-slate-200"
                >
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800 px-4 py-3 safe-pb">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {/* Quick WhatsApp Button */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 active:scale-95 transition-all shrink-0"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-6 h-6" />
          </a>

          {/* Primary Book Now Button (Phase 11 trigger) */}
          <button
            type="button"
            onClick={() => onBook(vehicle)}
            disabled={vehicle.status !== VehicleStatus.Available}
            className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl active:scale-98 ${
              vehicle.status === VehicleStatus.Available
                ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white hover:opacity-95 shadow-orange-500/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <BusIcon className="w-5 h-5" />
            <span>{vehicle.status === VehicleStatus.Available ? t.bookNow : t.statusInUse}</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Image Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="flex items-center justify-between text-white safe-pt">
            <span className="text-sm font-bold">
              {selectedImageIndex + 1} of {allImages.length} Photos
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-center flex-1 my-4">
            <img
              src={allImages[selectedImageIndex]}
              alt="Enlarged vehicle view"
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Bottom Lightbox Thumbnail Ribbon */}
          <div className="flex justify-center gap-2 overflow-x-auto pb-4 safe-pb" onClick={(e) => e.stopPropagation()}>
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImageIndex === idx ? 'border-orange-500 scale-105' : 'border-transparent opacity-50'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
