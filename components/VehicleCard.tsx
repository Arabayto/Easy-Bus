import React from 'react';
import { Vehicle, VehicleStatus } from '../types';
import { Translations } from '../translations';
import { 
  StarIcon, 
  UsersIcon, 
  BusIcon, 
  CarIcon, 
  MapPinIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  ChevronRightIcon 
} from './icons';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  onBook: (vehicle: Vehicle) => void;
  t: Translations;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSelect,
  onBook,
  t
}) => {
  const totalPhotos = 1 + (vehicle.additionalImages?.length || 0);

  const getStatusBadge = () => {
    switch (vehicle.status) {
      case VehicleStatus.Available:
        return (
          <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {t.statusAvailable}
          </span>
        );
      case VehicleStatus.InUse:
        return (
          <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {t.statusInUse}
          </span>
        );
      case VehicleStatus.Maintenance:
        return (
          <span className="bg-rose-500/15 text-rose-400 border border-rose-500/30 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            {t.statusMaintenance}
          </span>
        );
    }
  };

  const getShiftBadge = () => {
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
    <div 
      onClick={() => onSelect(vehicle)}
      className="bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-700/70 shadow-xl hover:border-orange-500/50 hover:shadow-orange-500/10 transition-all duration-300 flex flex-col cursor-pointer active:scale-[0.98] group"
    >
      {/* Vehicle Media Header */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.carModel}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Top Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60 pointer-events-none" />

        {/* Top Badges (Category & Status) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className={`text-[11px] font-black px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-lg ${
              vehicle.category === 'school_bus'
                ? 'bg-amber-500/90 text-slate-950'
                : 'bg-blue-500/90 text-white'
            }`}>
              {vehicle.category === 'school_bus' ? (
                <BusIcon className="w-3.5 h-3.5" />
              ) : (
                <CarIcon className="w-3.5 h-3.5" />
              )}
              {vehicle.category === 'school_bus' ? t.schoolBus : t.universityCar}
            </span>
          </div>

          <div className="backdrop-blur-md">
            {getStatusBadge()}
          </div>
        </div>

        {/* Photo Gallery Count Pill */}
        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-orange-400">
            <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 0v9.5c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-9.5a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75z" clipRule="evenodd" />
            <path d="M7 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3 14l3.5-4.5 2.5 3 4-5.5 4.5 7H3z" />
          </svg>
          <span>{totalPhotos} {t.photos}</span>
        </div>

        {/* City / Location Pill */}
        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10 shadow-lg">
          <MapPinIcon className="w-3 h-3 text-orange-400" />
          <span>{t.cityRegions[vehicle.city]}</span>
        </div>
      </div>

      {/* Vehicle Info Body */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Model & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight leading-snug group-hover:text-orange-400 transition-colors">
                {vehicle.carModel}
              </h3>
              <p className="text-[11px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-md inline-block mt-1 border border-slate-700/50">
                {vehicle.plateNumber}
              </p>
            </div>

            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-xl text-amber-400 font-extrabold text-xs shrink-0">
              <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{vehicle.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Affiliation if any */}
          {vehicle.institutionAffiliation && (
            <p className="text-xs text-orange-400/90 font-medium mb-3 line-clamp-1 flex items-center gap-1">
              <ShieldCheckIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{vehicle.institutionAffiliation}</span>
            </p>
          )}

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-orange-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block leading-tight">{t.seatCapacity}</span>
                <span className="font-bold text-white">{vehicle.seats} seats</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-orange-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block leading-tight">{t.shiftSchedule}</span>
                <span className="font-bold text-white truncate block">{getShiftBadge()}</span>
              </div>
            </div>
          </div>

          {/* Live Driver Card (Phase 10) */}
          <div className="flex items-center justify-between p-2.5 bg-slate-900/40 rounded-2xl border border-slate-700/40 mt-2">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={vehicle.driverAvatar}
                  alt={vehicle.driverName}
                  className="w-8 h-8 rounded-full object-cover border border-slate-600"
                />
                {/* Live pulse dot */}
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
                  vehicle.driverStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'
                }`} />
              </div>

              <div>
                <span className="text-xs font-bold text-slate-200 block leading-tight">
                  {vehicle.driverName}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {vehicle.driverNationalId}
                </span>
              </div>
            </div>

            <div className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
              vehicle.driverStatus === 'online'
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                : 'text-slate-400 bg-slate-800'
            }`}>
              {vehicle.driverStatus === 'online' ? t.online : t.offline}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(vehicle);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-600/50"
          >
            <span>{t.viewDetails}</span>
            <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBook(vehicle);
            }}
            disabled={vehicle.status !== VehicleStatus.Available}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 ${
              vehicle.status === VehicleStatus.Available
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-orange-500/20'
                : 'bg-slate-700/50 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <span>{t.bookNow}</span>
          </button>
        </div>
      </div>
    </div>
  );
};