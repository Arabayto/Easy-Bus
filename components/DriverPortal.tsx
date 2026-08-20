import React, { useState } from 'react';
import { Vehicle } from '../types';
import { Translations } from '../translations';
import { 
  ChevronLeftIcon, 
  IdBadgeIcon, 
  BusIcon, 
  CarIcon, 
  MapPinIcon, 
  PhoneIcon,
  CheckCircleIcon,
  ShieldCheckIcon
} from './icons';

interface DriverPortalProps {
  vehicles: Vehicle[];
  onToggleDriverStatus: (vehicleId: number) => void;
  onBack: () => void;
  t: Translations;
}

export const DriverPortal: React.FC<DriverPortalProps> = ({
  vehicles,
  onToggleDriverStatus,
  onBack,
  t
}) => {
  const [selectedDriverVehicleId, setSelectedDriverVehicleId] = useState<number>(vehicles[0]?.id || 1);
  const activeVehicle = vehicles.find(v => v.id === selectedDriverVehicleId) || vehicles[0];

  return (
    <div className="min-h-screen bg-slate-950 pb-28 animate-fade-in text-slate-100">
      {/* Driver Header */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex items-center justify-between safe-pt">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 active:scale-95 transition-all"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <IdBadgeIcon className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-extrabold text-white">
              {t.driverPortal}
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            {t.toggleDriverStatus}
          </span>
        </div>

        <div className="w-10" />
      </div>

      <div className="max-w-md mx-auto px-4 pt-5 space-y-5">
        {/* Driver Selection Carousel / Picker */}
        <div className="p-4 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
            Select Active Driver Profile
          </label>
          <select
            value={selectedDriverVehicleId}
            onChange={(e) => setSelectedDriverVehicleId(Number(e.target.value))}
            className="w-full px-3.5 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-orange-500"
          >
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.driverName} — {v.carModel} ({v.plateNumber})
              </option>
            ))}
          </select>
        </div>

        {activeVehicle && (
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl space-y-6 text-center">
            {/* Driver Avatar & Status Ring */}
            <div className="relative w-28 h-28 mx-auto">
              <img
                src={activeVehicle.driverAvatar}
                alt={activeVehicle.driverName}
                className="w-full h-full rounded-3xl object-cover border-4 border-slate-800 shadow-xl"
              />
              <span className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-4 border-slate-900 flex items-center justify-center shadow-lg ${
                activeVehicle.driverStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'
              }`} />
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-xl font-extrabold text-white">
                  {activeVehicle.driverName}
                </h3>
                <ShieldCheckIcon className="w-5 h-5 text-sky-400" />
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                ID: <span className="text-orange-400 font-bold">{activeVehicle.driverNationalId}</span>
              </p>
              <p className="text-xs text-slate-300 mt-1">
                {activeVehicle.carModel} • <span className="font-mono text-slate-400">{activeVehicle.plateNumber}</span>
              </p>
            </div>

            {/* Huge Phase 10 Real-Time Status Switch */}
            <div className={`p-5 rounded-3xl border-2 transition-all ${
              activeVehicle.driverStatus === 'online'
                ? 'bg-emerald-500/10 border-emerald-500 shadow-xl shadow-emerald-500/10'
                : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                    Current Live Availability
                  </span>
                  <span className={`text-base font-black ${
                    activeVehicle.driverStatus === 'online' ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    {activeVehicle.driverStatus === 'online' ? t.online : t.offline}
                  </span>
                </div>

                <div className={`w-3 h-3 rounded-full ${
                  activeVehicle.driverStatus === 'online' ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
                }`} />
              </div>

              <button
                type="button"
                onClick={() => onToggleDriverStatus(activeVehicle.id)}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wide transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${
                  activeVehicle.driverStatus === 'online'
                    ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-rose-600/30'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30'
                }`}
              >
                <span>
                  {activeVehicle.driverStatus === 'online'
                    ? `Click to Go OFFLINE`
                    : `Click to Go ONLINE & Accept Rides`}
                </span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              When set to <strong>Online</strong>, your bus will show a live green pulse across the app in {t.cityRegions[activeVehicle.city]} and clients can submit direct booking requests.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
