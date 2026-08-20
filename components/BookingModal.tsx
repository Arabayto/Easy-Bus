import React, { useState, useEffect } from 'react';
import { Vehicle, BookingRequest, ShiftSchedule, CityRegion } from '../types';
import { Translations } from '../translations';
import { 
  CloseIcon, 
  BusIcon, 
  CarIcon, 
  MapPinIcon, 
  ClockIcon, 
  CheckCircleIcon,
  PhoneIcon,
  UserIcon
} from './icons';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitBooking: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'unread' | 'status'>) => void;
  vehicle: Vehicle | null;
  t: Translations;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSubmitBooking,
  vehicle,
  t
}) => {
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [shift, setShift] = useState<ShiftSchedule>('both');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && vehicle) {
      setClientName('');
      setPhoneNumber('');
      setInstitutionName(vehicle.institutionAffiliation || '');
      setPickupLocation('');
      setShift(vehicle.shift || 'both');
      setNotes('');
      setError('');
      setIsSuccess(false);
    }
  }, [isOpen, vehicle]);

  if (!isOpen || !vehicle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !phoneNumber.trim() || !institutionName.trim() || !pickupLocation.trim()) {
      setError('Please fill in all required fields marked with *');
      return;
    }

    setError('');
    
    onSubmitBooking({
      vehicleId: vehicle.id,
      vehicleModel: vehicle.carModel,
      vehiclePlate: vehicle.plateNumber,
      category: vehicle.category,
      clientName: clientName.trim(),
      phoneNumber: phoneNumber.trim(),
      institutionName: institutionName.trim(),
      city: vehicle.city,
      shift: shift,
      pickupLocation: pickupLocation.trim(),
      notes: notes.trim()
    });

    setIsSuccess(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between sticky top-0 z-10 safe-pt">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
              {vehicle.category === 'school_bus' ? <BusIcon className="w-5 h-5" /> : <CarIcon className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                {t.bookingTitle}
              </h2>
              <p className="text-[11px] text-slate-400">
                {vehicle.carModel} • {vehicle.plateNumber}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircleIcon className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white mb-1">
                  {t.bookingSuccess}
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  {t.bookingSuccessDesc}
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Client:</span>
                  <span className="font-bold text-white">{clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Institution:</span>
                  <span className="font-bold text-white">{institutionName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="font-bold text-orange-400">{vehicle.carModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-bold text-white">{pickupLocation}, {t.cityRegions[vehicle.city]}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-orange-500 text-white font-extrabold text-sm hover:bg-orange-600 active:scale-95 transition-all shadow-lg shadow-orange-500/25"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Vehicle Preview Banner */}
              <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.carModel}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{vehicle.carModel}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span>Driver: {vehicle.driverName}</span>
                    <span>•</span>
                    <span className="text-orange-400">{t.cityRegions[vehicle.city]}</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
                  {error}
                </div>
              )}

              {/* Client Name Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {t.clientName} <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., Mohamed Cali"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {t.phoneNumber} <span className="text-orange-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+252 63 440 0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
                />
              </div>

              {/* School or University Name Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {t.institutionName} <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder={t.institutionPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              {/* Shift Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {t.preferredShift}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['morning', 'afternoon', 'both'] as ShiftSchedule[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShift(s)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-extrabold border transition-all ${
                        shift === s
                          ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {s === 'morning' ? t.morning : s === 'afternoon' ? t.afternoon : t.bothShifts}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pickup Location Field */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {t.pickupLocation} <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder={t.pickupPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {t.notes}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              <div className="pt-2 safe-pb">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 active:scale-95 transition-all"
                >
                  {t.confirmBooking}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
