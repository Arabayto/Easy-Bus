import { Vehicle, VehicleStatus, CityRegion } from './types';

export const CITIES: CityRegion[] = [
  'Hargeisa',
  'Burao',
  'Berbera',
  'Borama',
  'Erigavo',
  'Las Anod'
];

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 1,
    category: 'school_bus',
    carModel: 'Mercedes-Benz Sprinter 516 Bus',
    plateNumber: 'SL-5489-SB',
    status: VehicleStatus.Available,
    city: 'Hargeisa',
    shift: 'both',
    seats: 22,
    availableSeats: 6,
    driverName: 'Ahmed Jama Cali',
    driverNationalId: 'SL-NAT-984210',
    driverPhoneNumber: '+252 63 441 2345',
    driverStatus: 'online',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=900&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 38,
    pricePerMonth: '$45 / Month',
    features: ['Air Conditioning', 'Live GPS Tracking', 'First Aid Kit', 'Individual Seatbelts', 'Interior Security Camera', 'Child Safety Locks'],
    institutionAffiliation: 'Hargeisa International School'
  },
  {
    id: 2,
    category: 'school_bus',
    carModel: 'Toyota Coaster Deluxe Bus',
    plateNumber: 'SL-8831-SB',
    status: VehicleStatus.Available,
    city: 'Burao',
    shift: 'morning',
    seats: 30,
    availableSeats: 8,
    driverName: 'Mustafa Cumar Xasan',
    driverNationalId: 'SL-NAT-772918',
    driverPhoneNumber: '+252 63 448 9912',
    driverStatus: 'online',
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?w=900&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=900&auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewsCount: 42,
    pricePerMonth: '$40 / Month',
    features: ['Air Conditioning', 'Live GPS Tracking', 'First Aid Kit', 'Individual Seatbelts'],
    institutionAffiliation: 'Burao Model Academy'
  },
  {
    id: 3,
    category: 'university_car',
    carModel: 'Hyundai Staria VIP Shuttle',
    plateNumber: 'SL-2041-UC',
    status: VehicleStatus.Available,
    city: 'Hargeisa',
    shift: 'both',
    seats: 9,
    availableSeats: 3,
    driverName: 'Khadar Maxamed Yuusuf',
    driverNationalId: 'SL-NAT-663812',
    driverPhoneNumber: '+252 63 412 8844',
    driverStatus: 'online',
    driverAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=900&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 56,
    pricePerMonth: '$55 / Month',
    features: ['Air Conditioning', 'High-Speed Wi-Fi', 'Live GPS Tracking', 'Leather Seating', 'USB Fast Charging'],
    institutionAffiliation: 'University of Hargeisa'
  },
  {
    id: 4,
    category: 'university_car',
    carModel: 'Toyota HiAce Super GL Commuter',
    plateNumber: 'SL-9910-UC',
    status: VehicleStatus.InUse,
    city: 'Burao',
    shift: 'afternoon',
    seats: 14,
    availableSeats: 0,
    driverName: 'Siciid Cabdi Nuur',
    driverNationalId: 'SL-NAT-551940',
    driverPhoneNumber: '+252 63 423 7711',
    driverStatus: 'online',
    driverAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=900&auto=format&fit=crop&q=80'
    ],
    rating: 4.7,
    reviewsCount: 29,
    pricePerMonth: '$45 / Month',
    features: ['Air Conditioning', 'Live GPS Tracking', 'First Aid Kit', 'Luggage Compartment'],
    institutionAffiliation: 'University of Burao'
  },
  {
    id: 5,
    category: 'school_bus',
    carModel: 'Isuzu Journey School Cruiser',
    plateNumber: 'SL-3382-SB',
    status: VehicleStatus.Available,
    city: 'Berbera',
    shift: 'both',
    seats: 26,
    availableSeats: 11,
    driverName: 'Farxaan Ibraahim Warsame',
    driverNationalId: 'SL-NAT-442819',
    driverPhoneNumber: '+252 63 477 3322',
    driverStatus: 'offline',
    driverAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=900&auto=format&fit=crop&q=80'
    ],
    rating: 4.6,
    reviewsCount: 19,
    pricePerMonth: '$42 / Month',
    features: ['Air Conditioning', 'Live GPS Tracking', 'First Aid Kit', 'Child Safety Locks'],
    institutionAffiliation: 'Berbera Maritime High School'
  },
  {
    id: 6,
    category: 'university_car',
    carModel: 'Toyota Land Cruiser Prado Campus Shuttle',
    plateNumber: 'SL-7714-UC',
    status: VehicleStatus.Available,
    city: 'Borama',
    shift: 'morning',
    seats: 7,
    availableSeats: 2,
    driverName: 'Daahir Xuseen Rooble',
    driverNationalId: 'SL-NAT-331092',
    driverPhoneNumber: '+252 63 466 1199',
    driverStatus: 'online',
    driverAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900&auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewsCount: 34,
    pricePerMonth: '$60 / Month',
    features: ['4x4 Drive', 'Air Conditioning', 'Live GPS Tracking', 'Individual Seatbelts'],
    institutionAffiliation: 'Amoud University'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'BK-1082',
    vehicleId: 1,
    vehicleModel: 'Mercedes-Benz Sprinter 516 Bus',
    vehiclePlate: 'SL-5489-SB',
    category: 'school_bus' as const,
    clientName: 'Amina Cali Maxamed (Parent)',
    phoneNumber: '+252 63 440 8821',
    institutionName: 'Hargeisa International School',
    city: 'Hargeisa' as CityRegion,
    shift: 'both' as const,
    pickupLocation: 'Jigjiga Yar District, Near Telecom Tower',
    notes: '2 children (Grade 3 and Grade 6). Morning pickup at 6:45 AM.',
    status: 'pending' as const,
    createdAt: 'Just now',
    unread: true
  },
  {
    id: 'BK-1079',
    vehicleId: 3,
    vehicleModel: 'Hyundai Staria VIP Shuttle',
    vehiclePlate: 'SL-2041-UC',
    category: 'university_car' as const,
    clientName: 'Cabdiraxmaan Jaamac (Student Council)',
    phoneNumber: '+252 63 411 9900',
    institutionName: 'University of Hargeisa',
    city: 'Hargeisa' as CityRegion,
    shift: 'both' as const,
    pickupLocation: 'Masalaha Campus Hub',
    notes: 'Semester ride pass for 3 engineering students.',
    status: 'approved' as const,
    createdAt: '2 hours ago',
    unread: false
  }
];

export const DEFAULT_WHATSAPP_NUMBER = '252634400000';