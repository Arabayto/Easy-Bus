export type Language = 'en' | 'so' | 'ar';

export type VehicleCategory = 'school_bus' | 'university_car';

export type ShiftSchedule = 'morning' | 'afternoon' | 'both';

export type DriverStatus = 'online' | 'offline';

export type CityRegion = 'Hargeisa' | 'Burao' | 'Berbera' | 'Borama' | 'Erigavo' | 'Las Anod';

export enum VehicleStatus {
  Available = 'Available',
  InUse = 'In Use',
  Maintenance = 'Maintenance',
}

export interface User {
  name: string;
  phoneNumber: string;
  carType?: string;
  isAdmin?: boolean;
  role?: 'user' | 'admin' | 'driver';
  driverId?: number;
}

export interface Vehicle {
  id: number;
  category: VehicleCategory;
  carModel: string;
  plateNumber: string;
  seats: number;
  availableSeats: number;
  status: VehicleStatus;
  city: CityRegion;
  shift: ShiftSchedule;
  driverName: string;
  driverNationalId: string;
  driverPhoneNumber: string;
  driverStatus: DriverStatus;
  driverAvatar: string;
  imageUrl: string;
  additionalImages: string[];
  rating: number;
  reviewsCount: number;
  pricePerMonth?: string;
  features: string[];
  institutionAffiliation?: string;
}

export interface BookingRequest {
  id: string;
  vehicleId: number;
  vehicleModel: string;
  vehiclePlate: string;
  category: VehicleCategory;
  clientName: string;
  phoneNumber: string;
  institutionName: string;
  city: CityRegion;
  shift: ShiftSchedule;
  pickupLocation: string;
  notes?: string;
  status: 'pending' | 'approved' | 'contacted' | 'rejected';
  createdAt: string;
  unread: boolean;
}