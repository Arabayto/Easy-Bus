
import React, { useState } from 'react';
import { User, Vehicle, VehicleStatus } from '../types';
import { MOCK_VEHICLES } from '../constants';
import { VehicleCard } from './VehicleCard';
import { SearchIcon, PlusIcon, UserIcon, WhatsAppIcon } from './icons';
import { AddVehicleModal } from './AddVehicleModal';
import { BookingModal } from './BookingModal';
import { VehicleGalleryModal } from './VehicleGalleryModal';

interface VehicleListProps {
  user: User;
  onLogout: () => void;
  onNavigateToProfile: () => void;
  vehicles?: Vehicle[];
  onAddVehicle?: (vehicle: Vehicle) => void;
  onDeleteVehicle?: (id: number) => void;
}

export const VehicleList: React.FC<VehicleListProps> = ({ 
    user, 
    onLogout, 
    onNavigateToProfile,
    vehicles: propVehicles,
    onAddVehicle,
    onDeleteVehicle
}) => {
  // Use propVehicles if available (controlled mode), otherwise local state (uncontrolled mode - fallback)
  const [localVehicles, setLocalVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const vehicles = propVehicles || localVehicles;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);
  const [viewingVehicle, setViewingVehicle] = useState<Vehicle | null>(null);
  const [activeFilter, setActiveFilter] = useState<VehicleStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocalAddVehicle = (newVehicle: Vehicle) => {
    setLocalVehicles(prevVehicles => [...prevVehicles, newVehicle]);
  };

  const handleLocalDeleteVehicle = (id: number) => {
    setLocalVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));
  };

  const finalAddVehicle = onAddVehicle || handleLocalAddVehicle;
  const finalDeleteVehicle = onDeleteVehicle || handleLocalDeleteVehicle;

  const handleBookClick = (vehicle: Vehicle) => {
    setBookingVehicle(vehicle);
  };
  
  const handleViewGallery = (vehicle: Vehicle) => {
      setViewingVehicle(vehicle);
  };

  const handleConfirmBooking = (userDetails: { name: string; phoneNumber: string }) => {
    if (bookingVehicle) {
        // In a real app, this would update via API.
        // For local state/prop updates, we might need a status update handler passed from App.tsx 
        // but for now, we just simulate the alert.
        alert(`Booking confirmed for ${bookingVehicle.carModel}!\nPassenger: ${userDetails.name}\nPhone: ${userDetails.phoneNumber}`);
        setBookingVehicle(null);
    }
  };

  const filteredVehicles = vehicles
    .filter(vehicle =>
      activeFilter === 'All' || vehicle.status === activeFilter
    )
    .filter(vehicle => {
      const query = searchQuery.toLowerCase();
      return (
        vehicle.driverName.toLowerCase().includes(query) ||
        vehicle.carModel.toLowerCase().includes(query) ||
        vehicle.plateNumber.toLowerCase().includes(query)
      );
    });

  const filterOptions: (VehicleStatus | 'All')[] = ['All', VehicleStatus.Available, VehicleStatus.InUse, VehicleStatus.Maintenance];
  
  const nextVehicleId = (vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) : 0) + 1;

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <div>
            {user.isAdmin ? (
                 <>
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-1">Manage and monitor all vehicles.</p>
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h1>
                    <p className="text-gray-600 mt-1">Here are the vehicles ready for your next ride.</p>
                </>
            )}
          </div>
          <div className="flex items-center gap-4">
            {user.isAdmin && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                Add Vehicle
              </button>
            )}
            
            <button
                onClick={onNavigateToProfile}
                className="flex items-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors"
            >
                <UserIcon className="w-5 h-5 text-gray-500" />
                Profile
            </button>

            <button 
                onClick={onLogout}
                className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors"
            >
                Logout
            </button>
          </div>
        </header>
        
        <div className="mb-6 max-w-lg mx-auto">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search by driver, car model, or plate..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    aria-label="Search vehicles"
                />
            </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-4" role="group" aria-label="Vehicle status filter">
          {filterOptions.map(option => (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              aria-pressed={activeFilter === option}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                activeFilter === option
                  ? 'bg-orange-500 text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                onBook={handleBookClick} 
                isAdmin={!!user.isAdmin}
                onDelete={finalDeleteVehicle}
                onViewGallery={handleViewGallery}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-700">No Vehicles Found</h2>
              <p className="text-gray-500 mt-2">There are no vehicles matching your search and filter criteria.</p>
            </div>
          )}
        </div>
      </div>
      
      <AddVehicleModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVehicle={finalAddVehicle}
        nextVehicleId={nextVehicleId}
      />

      <BookingModal 
        isOpen={!!bookingVehicle}
        onClose={() => setBookingVehicle(null)}
        onConfirm={handleConfirmBooking}
        vehicle={bookingVehicle}
      />
      
      <VehicleGalleryModal
        isOpen={!!viewingVehicle}
        onClose={() => setViewingVehicle(null)}
        vehicle={viewingVehicle}
      />

      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 bg-green-500 text-white rounded-full shadow-xl hover:bg-green-600 transition-transform hover:scale-110 flex items-center justify-center group"
        title="Contact Admin"
      >
        <WhatsAppIcon className="w-8 h-8" />
        <span className="absolute right-full mr-3 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Contact Admin
        </span>
      </a>
    </>
  );
};
