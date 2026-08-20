import React, { useState, useRef } from 'react';
import { Vehicle, BookingRequest, VehicleStatus, VehicleCategory, CityRegion, ShiftSchedule } from '../types';
import { CITIES } from '../constants';
import { Translations } from '../translations';
import { 
  BusIcon, 
  CarIcon, 
  PlusIcon, 
  TrashIcon, 
  BellIcon, 
  PhoneIcon, 
  WhatsAppIcon, 
  CheckCircleIcon, 
  ShieldCheckIcon,
  CloseIcon,
  CheckIcon,
  ChevronLeftIcon,
  UsersIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
  IdBadgeIcon
} from './icons';

interface AdminDashboardProps {
  vehicles: Vehicle[];
  bookings: BookingRequest[];
  onAddVehicle: (vehicle: Vehicle) => void;
  onDeleteVehicle: (id: number) => void;
  onUpdateBookingStatus: (id: string, status: BookingRequest['status']) => void;
  onToggleDriverStatus: (vehicleId: number) => void;
  onLogout: () => void;
  onBack: () => void;
  managerName?: string;
  t: Translations;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  vehicles,
  bookings,
  onAddVehicle,
  onDeleteVehicle,
  onUpdateBookingStatus,
  onToggleDriverStatus,
  onLogout,
  onBack,
  managerName = 'Owner / Manager',
  t
}) => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'vehicles' | 'drivers' | 'settings'>('alerts');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Add Vehicle Form State
  const [category, setCategory] = useState<VehicleCategory>('school_bus');
  const [carModel, setCarModel] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [city, setCity] = useState<CityRegion>('Hargeisa');
  const [shift, setShift] = useState<ShiftSchedule>('both');
  const [seats, setSeats] = useState(22);
  const [driverName, setDriverName] = useState('');
  const [driverNationalId, setDriverNationalId] = useState('');
  const [driverPhoneNumber, setDriverPhoneNumber] = useState('');
  const [institutionAffiliation, setInstitutionAffiliation] = useState('');

  // Uploaded Photos State (Base64 Data URLs from device camera/file picker)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=900&auto=format&fit=crop&q=80'
  ]);
  const [driverAvatarUrl, setDriverAvatarUrl] = useState<string>(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const driverPhotoInputRef = useRef<HTMLInputElement>(null);

  const unreadCount = bookings.filter(b => b.unread).length;
  const onlineDriversCount = vehicles.filter(v => v.driverStatus === 'online').length;
  const schoolBusCount = vehicles.filter(v => v.category === 'school_bus').length;
  const universityCarCount = vehicles.filter(v => v.category === 'university_car').length;

  // Handle local image files upload (converts device pictures to Data URLs)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedPhotos((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Handle driver photo upload
  const handleDriverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setDriverAvatarUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carModel || !plateNumber || !driverName || !driverNationalId || !driverPhoneNumber) {
      alert('Please fill all required fields.');
      return;
    }

    if (uploadedPhotos.length < 4) {
      alert(`Please upload at least 4 photos for the vehicle gallery. You currently have ${uploadedPhotos.length}.`);
      return;
    }

    const nextId = (vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) : 0) + 1;

    const newVehicle: Vehicle = {
      id: nextId,
      category,
      carModel,
      plateNumber,
      seats: Number(seats),
      availableSeats: Number(seats),
      status: VehicleStatus.Available,
      city,
      shift,
      driverName,
      driverNationalId,
      driverPhoneNumber,
      driverStatus: 'online',
      driverAvatar: driverAvatarUrl || `https://images.unsplash.com/photo-${1500000000000 + nextId}?w=200&auto=format&fit=crop&q=80`,
      imageUrl: uploadedPhotos[0],
      additionalImages: uploadedPhotos.slice(1),
      rating: 5.0,
      reviewsCount: 1,
      features: ['Air Conditioning', 'Live GPS Tracking', 'First Aid Kit', 'Individual Seatbelts'],
      institutionAffiliation: institutionAffiliation || undefined
    };

    onAddVehicle(newVehicle);
    setIsAddModalOpen(false);

    // Reset Form
    setCarModel('');
    setPlateNumber('');
    setDriverName('');
    setDriverNationalId('');
    setDriverPhoneNumber('');
    setInstitutionAffiliation('');
  };

  const getWhatsAppClientLink = (booking: BookingRequest) => {
    const text = encodeURIComponent(
      `Hello ${booking.clientName}, regarding your booking request (#${booking.id}) for ${booking.vehicleModel} (${booking.vehiclePlate}) in ${booking.city}, we are pleased to confirm your schedule.`
    );
    const cleanPhone = booking.phoneNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-28 animate-fade-in text-slate-100">
      {/* Top Admin Bar with Official Logo */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 py-2.5 flex items-center justify-between safe-pt shadow-xl">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 active:scale-95 transition-all"
            title="Back to Fleet Explorer"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Easy Bus Logo" className="w-9 h-9 object-contain drop-shadow-md" />
            <div>
              <h2 className="text-xs font-extrabold text-white flex items-center gap-1">
                <span>Easy Bus Control Center</span>
                <span className="text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-black">OWNER</span>
              </h2>
              <p className="text-[10px] text-slate-400 truncate max-w-[140px]">
                {managerName}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="h-9 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
            title={t.addVehicle}
          >
            <PlusIcon className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">{t.addVehicle}</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="h-9 px-2.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700 text-slate-400 text-xs font-bold transition-colors"
            title="Logout"
          >
            {t.logout}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-4 space-y-4">
        {/* Owner Executive Analytics KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Total Fleet */}
          <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">{t.totalFleet}</span>
              <BusIcon className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-black text-white">{vehicles.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {schoolBusCount} School • {universityCarCount} Univ
            </div>
          </div>

          {/* Active Online Drivers */}
          <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">{t.activeDrivers}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-xl font-black text-emerald-400">{onlineDriversCount} Online</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {vehicles.length - onlineDriversCount} Off-duty
            </div>
          </div>

          {/* Incoming Booking Alerts */}
          <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">{t.adminAlerts}</span>
              <BellIcon className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-xl font-black text-white flex items-center gap-1.5">
              <span>{bookings.length}</span>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-extrabold animate-pulse">
                  {unreadCount} New
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {bookings.filter(b => b.status === 'approved').length} Approved
            </div>
          </div>

          {/* Cloudflare Pages Readiness */}
          <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">System Status</span>
              <ShieldCheckIcon className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xs font-black text-sky-400">100% Static PWA</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Cloudflare Pages Ready
            </div>
          </div>
        </div>

        {/* Manager Navigation Tabs */}
        <div className="grid grid-cols-4 p-1 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-black shadow-md">
          <button
            type="button"
            onClick={() => setActiveTab('alerts')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'alerts'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BellIcon className="w-3.5 h-3.5" />
            <span>Alerts</span>
            {unreadCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-black">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vehicles')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'vehicles'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BusIcon className="w-3.5 h-3.5" />
            <span>Fleet</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('drivers')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'drivers'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <IdBadgeIcon className="w-3.5 h-3.5" />
            <span>Drivers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheckIcon className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>

        {/* TAB 1: Real-Time Incoming Booking Alerts */}
        {activeTab === 'alerts' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                {t.incomingBookings} ({bookings.length})
              </h3>
              <span className="text-[11px] text-amber-400 font-bold">
                Instant Sound Alerts Enabled
              </span>
            </div>

            {bookings.length === 0 ? (
              <div className="p-8 text-center bg-slate-900 rounded-3xl border border-slate-800">
                <BellIcon className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-300">{t.noBookingsYet}</h3>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`p-4 rounded-3xl border transition-all ${
                    booking.unread
                      ? 'bg-slate-900/95 border-amber-500/60 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {booking.unread && (
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                            {booking.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            booking.status === 'approved'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : booking.status === 'contacted'
                              ? 'bg-sky-500/20 text-sky-400'
                              : booking.status === 'rejected'
                              ? 'bg-rose-500/20 text-rose-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {booking.status.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-sm font-extrabold text-white mt-1">
                          {booking.clientName}
                        </h4>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {booking.createdAt}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 mb-3">
                    <p><strong className="text-slate-400">Institution:</strong> {booking.institutionName}</p>
                    <p><strong className="text-slate-400">Bus:</strong> <span className="text-amber-400 font-bold">{booking.vehicleModel}</span> ({booking.vehiclePlate})</p>
                    <p><strong className="text-slate-400">Location:</strong> {booking.pickupLocation}, {t.cityRegions[booking.city]}</p>
                    <p><strong className="text-slate-400">Shift:</strong> {booking.shift}</p>
                    {booking.notes && (
                      <p className="text-slate-400 italic mt-1">"{booking.notes}"</p>
                    )}
                  </div>

                  {/* Status & Quick Contact Actions */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      <select
                        value={booking.status}
                        onChange={(e) => onUpdateBookingStatus(booking.id, e.target.value as BookingRequest['status'])}
                        className="bg-slate-950 text-xs font-bold px-2.5 py-1.5 rounded-xl border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="pending">{t.statusPending}</option>
                        <option value="approved">{t.statusApproved}</option>
                        <option value="contacted">{t.statusContacted}</option>
                        <option value="rejected">{t.statusRejected}</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={`tel:${booking.phoneNumber}`}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                        title="Call Client Directly"
                      >
                        <PhoneIcon className="w-4 h-4 text-emerald-400" />
                      </a>

                      <a
                        href={getWhatsAppClientLink(booking)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-md"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span>Chat Client</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: Fleet Management (CRUD) */}
        {activeTab === 'vehicles' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <PlusIcon className="w-4 h-4 text-slate-950" />
              <span>{t.addVehicle} (Upload Real Photos)</span>
            </button>

            {vehicles.map((v) => (
              <div
                key={v.id}
                className="p-3.5 bg-slate-900/90 rounded-3xl border border-slate-800 flex items-center justify-between gap-3 shadow-md"
              >
                <img
                  src={v.imageUrl}
                  alt={v.carModel}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                      v.category === 'school_bus' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {v.category === 'school_bus' ? t.schoolBus : t.universityCar}
                    </span>
                    <span className="text-[10px] text-slate-400">{t.cityRegions[v.city]}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      v.driverStatus === 'online' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {v.driverStatus.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-white truncate mt-0.5">
                    {v.carModel}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {v.plateNumber} • Driver: {v.driverName} ({v.driverNationalId})
                  </p>
                </div>

                {/* Listing Action: Delete */}
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(v.id)}
                  className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 flex items-center justify-center transition-all shrink-0 active:scale-95"
                  title={t.deleteVehicle}
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Driver Dispatch Monitor */}
        {activeTab === 'drivers' && (
          <div className="space-y-3">
            <div className="px-1">
              <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                Fleet Drivers & Live Dispatch Status ({vehicles.length})
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Monitor online drivers, verify national IDs, and toggle active status.
              </p>
            </div>

            {vehicles.map((v) => (
              <div
                key={v.id}
                className="p-4 bg-slate-900/90 rounded-3xl border border-slate-800 flex items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={v.driverAvatar}
                      alt={v.driverName}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                    />
                    <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                      v.driverStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'
                    }`} />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-extrabold text-white">
                        {v.driverName}
                      </h4>
                      <ShieldCheckIcon className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      National ID: <span className="text-amber-400 font-bold">{v.driverNationalId}</span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Assigned: {v.carModel} ({t.cityRegions[v.city]})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleDriverStatus(v.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      v.driverStatus === 'online'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {v.driverStatus === 'online' ? '🟢 Online' : '⚪ Offline'}
                  </button>

                  <a
                    href={`tel:${v.driverPhoneNumber}`}
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                    title="Call Driver"
                  >
                    <PhoneIcon className="w-4 h-4 text-emerald-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Owner App Settings & Cloudflare Architecture */}
        {activeTab === 'settings' && (
          <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              Owner Application Settings & Infrastructure
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold block">Deployment Target</span>
                <span className="text-emerald-400 font-bold">Cloudflare Pages (100% Static SPA)</span>
                <p className="text-[11px] text-slate-400">Build command: <code>vite build</code> (Output: <code>dist/</code>)</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold block">Cloudflare D1 SQL Schema</span>
                <span className="text-sky-400 font-bold">Ready in <code>schema.sql</code></span>
                <p className="text-[11px] text-slate-400">Includes <code>vehicles</code> and <code>bookings</code> tables with city & category indexes.</p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold block">WhatsApp Support Dispatch Hotline</span>
                <span className="text-white font-mono font-bold">+252 63 440 0000</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <TrashIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white">
              {t.deleteVehicle}
            </h3>
            <p className="text-xs text-slate-400">
              {t.deleteConfirm}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteVehicle(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="py-2.5 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30"
              >
                {t.deleteVehicle}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal with Native File Photo Upload (NO URLs NEEDED!) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-slate-800 shadow-2xl max-h-[92vh] flex flex-col animate-slide-up">
            <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between sticky top-0 z-10 safe-pt">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <PlusIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">
                    {t.addVehicle}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Upload photos directly from your phone/camera or device
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:text-white"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 overflow-y-auto space-y-4">
              {/* Category Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Service Category</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory('school_bus')}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold border transition-all ${
                      category === 'school_bus'
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    🎓 {t.schoolBus}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('university_car')}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold border transition-all ${
                      category === 'university_car'
                        ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    🏛️ {t.universityCar}
                  </button>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{t.carModel} *</label>
                  <input
                    type="text"
                    required
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="e.g. Toyota Coaster"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{t.plateNumber} *</label>
                  <input
                    type="text"
                    required
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    placeholder="SL-1234-SB"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>
              </div>

              {/* City, Shift & Seats */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{t.city} *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as CityRegion)}
                    className="w-full px-2.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                  >
                    {CITIES.map(c => <option key={c} value={c}>{t.cityRegions[c]}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{t.shiftSchedule}</label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value as ShiftSchedule)}
                    className="w-full px-2.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                  >
                    <option value="both">{t.bothShifts}</option>
                    <option value="morning">{t.morning}</option>
                    <option value="afternoon">{t.afternoon}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Seats *</label>
                  <input
                    type="number"
                    min="4"
                    max="60"
                    required
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="w-full px-2.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                  />
                </div>
              </div>

              {/* Driver Details with Driver Photo Upload */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block">
                    {t.driverInfo}
                  </span>
                  <button
                    type="button"
                    onClick={() => driverPhotoInputRef.current?.click()}
                    className="text-[11px] text-amber-400 hover:text-white font-bold underline"
                  >
                    📷 Upload Driver Avatar
                  </button>
                  <input
                    ref={driverPhotoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleDriverPhotoUpload}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div 
                    onClick={() => driverPhotoInputRef.current?.click()}
                    className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-dashed border-amber-500/50 hover:border-amber-400 cursor-pointer shrink-0 group"
                  >
                    <img src={driverAvatarUrl} alt="Driver Avatar" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[9px] font-bold">
                      Change
                    </div>
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      required
                      placeholder={`${t.driverName} *`}
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder={`${t.driverNationalId} *`}
                    value={driverNationalId}
                    onChange={(e) => setDriverNationalId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={`${t.driverPhone} *`}
                    value={driverPhoneNumber}
                    onChange={(e) => setDriverPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>
              </div>

              {/* NATIVE PHOTO UPLOADER (MIN 4 PHOTOS) - NO EXTERNAL URL NEEDED */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block">
                      Vehicle Photo Gallery (Min 4 Photos)
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Select photos from your device, phone gallery or camera
                    </span>
                  </div>

                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    uploadedPhotos.length >= 4
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {uploadedPhotos.length >= 4 ? `✅ ${uploadedPhotos.length}/4 Ready` : `⚠️ ${uploadedPhotos.length}/4 Photos`}
                  </span>
                </div>

                {/* Photo Upload Dropzone / Touch Trigger */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-5 border-2 border-dashed border-slate-700 hover:border-amber-500/80 bg-slate-900/60 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer group transition-all"
                >
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                      <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3H4.5a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.152-.177a1.875 1.875 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xs font-extrabold text-white">
                    Tap to Choose Photos from Device / Camera
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Supports JPG, PNG, WEBP (multiple selection supported)
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />

                {/* Uploaded Photos Preview Grid */}
                {uploadedPhotos.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] text-slate-400 font-bold block">
                      Uploaded Vehicle Photos ({uploadedPhotos.length}):
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {uploadedPhotos.map((photo, index) => (
                        <div 
                          key={index}
                          className="relative h-20 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 group shadow-md"
                        >
                          <img src={photo} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute top-1 left-1 bg-slate-950/80 text-[8px] font-black text-amber-400 px-1 py-0.2 rounded">
                            {index === 0 ? 'COVER' : `#${index + 1}`}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-80 hover:opacity-100 shadow-md transition-opacity"
                            title="Remove Photo"
                          >
                            <CloseIcon className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      {/* Add more button tile */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-20 rounded-xl border-2 border-dashed border-slate-700 hover:border-amber-400 flex flex-col items-center justify-center text-slate-400 hover:text-white transition-colors"
                      >
                        <PlusIcon className="w-5 h-5 text-amber-400" />
                        <span className="text-[9px] font-bold mt-0.5">+ Add More</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 safe-pb">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
                >
                  Save & Publish Vehicle Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
