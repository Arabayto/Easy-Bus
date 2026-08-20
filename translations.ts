import { Language, VehicleCategory, ShiftSchedule, DriverStatus, CityRegion, VehicleStatus } from './types';

export interface Translations {
  appName: string;
  appTagline: string;
  allCategories: string;
  schoolBus: string;
  universityCar: string;
  schoolBusDesc: string;
  universityCarDesc: string;
  allCities: string;
  searchPlaceholder: string;
  noVehiclesFound: string;
  noVehiclesFoundDesc: string;
  viewDetails: string;
  bookRide: string;
  bookNow: string;
  whatsappContact: string;
  directCall: string;
  driverInfo: string;
  driverName: string;
  driverNationalId: string;
  driverPhone: string;
  driverStatus: string;
  online: string;
  offline: string;
  driverIsOnline: string;
  driverIsOffline: string;
  toggleDriverStatus: string;
  vehicleSpecs: string;
  carModel: string;
  plateNumber: string;
  seatCapacity: string;
  availableSeats: string;
  operationalStatus: string;
  shiftSchedule: string;
  morning: string;
  afternoon: string;
  bothShifts: string;
  rating: string;
  reviews: string;
  photos: string;
  viewAllPhotos: string;
  features: string;
  featuresList: {
    ac: string;
    gps: string;
    firstAid: string;
    seatbelts: string;
    cctv: string;
    childSafety: string;
  };
  city: string;
  location: string;
  statusAvailable: string;
  statusInUse: string;
  statusMaintenance: string;
  bookingTitle: string;
  bookingSubtitle: string;
  clientName: string;
  phoneNumber: string;
  institutionName: string;
  institutionPlaceholder: string;
  pickupLocation: string;
  pickupPlaceholder: string;
  preferredShift: string;
  notes: string;
  notesPlaceholder: string;
  confirmBooking: string;
  bookingSuccess: string;
  bookingSuccessDesc: string;
  cancel: string;
  close: string;
  back: string;
  adminPortal: string;
  adminAlerts: string;
  addVehicle: string;
  deleteVehicle: string;
  deleteConfirm: string;
  driverPortal: string;
  incomingBookings: string;
  noBookingsYet: string;
  newAlert: string;
  markAsRead: string;
  statusPending: string;
  statusApproved: string;
  statusContacted: string;
  statusRejected: string;
  installApp: string;
  installPromptText: string;
  installNow: string;
  iosInstallGuide: string;
  iosStep1: string;
  iosStep2: string;
  navExplore: string;
  navCategories: string;
  navDriver: string;
  navAdmin: string;
  navProfile: string;
  loginRequired: string;
  adminLoginTitle: string;
  driverLoginTitle: string;
  loginButton: string;
  logout: string;
  totalFleet: string;
  activeDrivers: string;
  availableBuses: string;
  cityRegions: Record<CityRegion, string>;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'Easy Bus',
    appTagline: 'School & University Transportation Network',
    allCategories: 'All Services',
    schoolBus: 'School Bus',
    universityCar: 'University Car',
    schoolBusDesc: 'Safe, scheduled daily rides for K-12 students with vetted drivers',
    universityCarDesc: 'Flexible campus transit, carpools & private student shuttles',
    allCities: 'All Cities',
    searchPlaceholder: 'Search by model, driver name, or plate number...',
    noVehiclesFound: 'No Vehicles Found',
    noVehiclesFoundDesc: 'Try adjusting your category filter, city, or search terms.',
    viewDetails: 'View Details',
    bookRide: 'Book Ride',
    bookNow: 'Book Now',
    whatsappContact: 'Chat on WhatsApp',
    directCall: 'Direct Call',
    driverInfo: 'Driver Information',
    driverName: 'Driver Name',
    driverNationalId: 'Driver National ID',
    driverPhone: 'Driver Phone',
    driverStatus: 'Driver Status',
    online: 'Online',
    offline: 'Offline',
    driverIsOnline: 'Live & On-Duty',
    driverIsOffline: 'Currently Off-Duty',
    toggleDriverStatus: 'Toggle Driver Availability',
    vehicleSpecs: 'Vehicle Specifications',
    carModel: 'Vehicle Model',
    plateNumber: 'Plate Number',
    seatCapacity: 'Total Seat Capacity',
    availableSeats: 'Seats Available',
    operationalStatus: 'Operational Status',
    shiftSchedule: 'Shift Schedule',
    morning: 'Morning Shift',
    afternoon: 'Afternoon Shift',
    bothShifts: 'Both Shifts (Full Day)',
    rating: 'Rating',
    reviews: 'reviews',
    photos: 'Photos',
    viewAllPhotos: 'View Gallery',
    features: 'Amenities & Safety Features',
    featuresList: {
      ac: 'Air Conditioning',
      gps: 'Live GPS Tracking',
      firstAid: 'First Aid Kit',
      seatbelts: 'Individual Seatbelts',
      cctv: 'Interior Security Camera',
      childSafety: 'Child Safety Locks'
    },
    city: 'City / Region',
    location: 'Operating Region',
    statusAvailable: 'Available',
    statusInUse: 'In Use',
    statusMaintenance: 'Maintenance',
    bookingTitle: 'Request Booking',
    bookingSubtitle: 'Submit your transportation request for instant admin review',
    clientName: 'Full Name (Parent / Student / Admin)',
    phoneNumber: 'Phone Number',
    institutionName: 'School or University Name',
    institutionPlaceholder: 'e.g., Hargeisa International School / University of Burao',
    pickupLocation: 'Pickup Neighborhood / Location',
    pickupPlaceholder: 'e.g., 26 June District, Main St',
    preferredShift: 'Selected Shift',
    notes: 'Additional Notes / Special Instructions',
    notesPlaceholder: 'Enter any specific pickup times, special requirements...',
    confirmBooking: 'Submit Booking Request',
    bookingSuccess: 'Booking Submitted Successfully!',
    bookingSuccessDesc: 'Our dispatch team has received your request and will contact you via WhatsApp / Phone shortly.',
    cancel: 'Cancel',
    close: 'Close',
    back: 'Back',
    adminPortal: 'Admin Dashboard',
    adminAlerts: 'Booking Alerts',
    addVehicle: 'Add New Vehicle',
    deleteVehicle: 'Delete Listing',
    deleteConfirm: 'Are you sure you want to delete this vehicle listing?',
    driverPortal: 'Driver Portal',
    incomingBookings: 'Incoming Booking Requests',
    noBookingsYet: 'No booking requests yet.',
    newAlert: 'NEW BOOKING ALERT',
    markAsRead: 'Mark Processed',
    statusPending: 'Pending',
    statusApproved: 'Approved',
    statusContacted: 'Contacted',
    statusRejected: 'Declined',
    installApp: 'Install App',
    installPromptText: 'Install Easy Bus on your home screen for quick 1-tap access and native mobile experience!',
    installNow: 'Add to Home Screen',
    iosInstallGuide: 'To install on iPhone/iPad: Tap the Share button in Safari, then select "Add to Home Screen".',
    iosStep1: '1. Tap the Share button in Safari toolbar',
    iosStep2: '2. Scroll down and tap "Add to Home Screen"',
    navExplore: 'Explore',
    navCategories: 'Categories',
    navDriver: 'Driver UI',
    navAdmin: 'Admin',
    navProfile: 'Account',
    loginRequired: 'Enter Admin Credentials',
    adminLoginTitle: 'Admin Login',
    driverLoginTitle: 'Driver Status Access',
    loginButton: 'Sign In',
    logout: 'Logout',
    totalFleet: 'Fleet Size',
    activeDrivers: 'Active Online Drivers',
    availableBuses: 'Ready to Ride',
    cityRegions: {
      Hargeisa: 'Hargeisa',
      Burao: 'Burao',
      Berbera: 'Berbera',
      Borama: 'Borama',
      Erigavo: 'Erigavo',
      'Las Anod': 'Las Anod'
    }
  },
  so: {
    appName: 'Easy Bus',
    appTagline: 'Shabakadda Gaadiidka Dugsiyada & Jaamacadaha',
    allCategories: 'Dhammaan Adeegyada',
    schoolBus: 'Baska Dugsiga',
    universityCar: 'Gaariga Jaamacadda',
    schoolBusDesc: 'Gaadiid maalinle ah oo ammaan ah oo loogu talagalay ardayda dugsiyada',
    universityCarDesc: 'Gaadiidka ardayda jaamacadaha, safarro wadaag ah iyo gaadiid gaar ah',
    allCities: 'Dhammaan Magaalooyinka',
    searchPlaceholder: 'Raadi nooca gaariga, magaca darawalka, ama taargada...',
    noVehiclesFound: 'Lama Helin Wax Gaadiid Ah',
    noVehiclesFoundDesc: 'Fadlan beddel qaybta, magaalada, ama waxa aad raadinayso.',
    viewDetails: 'Faahfaahin Buuxda',
    bookRide: 'Dalbo Gaarigan',
    bookNow: 'Hadda Dalbo',
    whatsappContact: 'Kala Hadal WhatsApp',
    directCall: 'Wac Toos',
    driverInfo: 'Xogta Darawalka',
    driverName: 'Magaca Darawalka',
    driverNationalId: 'Kaarka Aqoonsiga Darawalka',
    driverPhone: 'Telefoonka Darawalka',
    driverStatus: 'Xaaladda Darawalka',
    online: 'Khadka Ku Jira (Online)',
    offline: 'Khadka Ka Maqan (Offline)',
    driverIsOnline: 'Hadda Diyaar Ah & Howsha Ku Jira',
    driverIsOffline: 'Hadda Howsha Kama Maqan Yahay',
    toggleDriverStatus: 'Beddel Xaaladda Darawalka',
    vehicleSpecs: 'Xogta & Tilmaamaha Gaariga',
    carModel: 'Nooca Gaariga',
    plateNumber: 'Lambarka Taargada',
    seatCapacity: 'Wadarta Kuraasta',
    availableSeats: 'Kuraasta Bannaan',
    operationalStatus: 'Xaaladda Shaqo',
    shiftSchedule: 'Jadwalka Shaqada',
    morning: 'Jadwalka Subaxda',
    afternoon: 'Jadwalka Galabta',
    bothShifts: 'Labadaba (Maalin Dhan)',
    rating: 'Qiimeynta',
    reviews: 'faallooyin',
    photos: 'Sawirrada',
    viewAllPhotos: 'Eeg Sawirrada Dhammaan',
    features: 'Qalabka & Ammaanka',
    featuresList: {
      ac: 'Qaboojiye (AC)',
      gps: 'Raadraaca Tooska ah ee GPS',
      firstAid: 'Qalabka Gurmadka Degdegga ah',
      seatbelts: 'Suunka Kuraasta',
      cctv: 'Kaamarada Ammaanka',
      childSafety: 'Qufulka Ammaanka Carruurta'
    },
    city: 'Magaalada',
    location: 'Goobta Shaqada',
    statusAvailable: 'Waa Diyaar',
    statusInUse: 'Wuu Shaqaynayaa',
    statusMaintenance: 'Dayactir Buu Ku Jiraa',
    bookingTitle: 'Dalbo Gaadiid',
    bookingSubtitle: 'Geli xogtaada si maamulka uu kuugu soo jawaabo si degdeg ah',
    clientName: 'Magacaaga Buuxa (Waalid / Arday / Maamul)',
    phoneNumber: 'Lambarka Telefoonka',
    institutionName: 'Magaca Dugsiga ama Jaamacadda',
    institutionPlaceholder: 'Tusaale: Dugsiga Hargeisa / Jaamacadda Burco',
    pickupLocation: 'Goobta / Xaafadda Lagaaga Qaadayo',
    pickupPlaceholder: 'Tusaale: Xaafadda 26 Juun, Wadada Weyn',
    preferredShift: 'Waqtiga / Jadwalka',
    notes: 'Faahfaahin Dheeraad ah',
    notesPlaceholder: 'Qor waqtiyo gaar ah ama tilmaamo dheeri ah...',
    confirmBooking: 'Dir Dalabka',
    bookingSuccess: 'Dalabkaagu Wuu Guuleystay!',
    bookingSuccessDesc: 'Kooxda maamulka ayaa heshay dalabkaaga waxayna kula soo xidhiidhi doonaan WhatsApp / Telefoon.',
    cancel: 'Ka Noqo',
    close: 'Xidh',
    back: 'Dib U Noqo',
    adminPortal: 'Qaybta Maamulka',
    adminAlerts: 'Digniinaha Dalabaadka',
    addVehicle: 'Ku Dar Gaadhi Cusub',
    deleteVehicle: 'Tirtir Gaadhiga',
    deleteConfirm: 'Ma hubtaa inaad tirtirto gaadhigan?',
    driverPortal: 'Qaybta Darawalka',
    incomingBookings: 'Dalabaadka Cusub ee Soo Dhacay',
    noBookingsYet: 'Weli ma jiraan dalabyo soo dhacay.',
    newAlert: 'DALAB CUSUB OO SOO DHACAY',
    markAsRead: 'Calaamadee sidii la qabtay',
    statusPending: 'Waa Sugayaa',
    statusApproved: 'Waa La Aqbalay',
    statusContacted: 'Waa La La Xidhiidhay',
    statusRejected: 'Waa La Diiday',
    installApp: 'Ku Shubo Taleefanka (App)',
    installPromptText: 'Ku shubo Easy Bus shaashadda taleefankaaga si aad si fudud ugu furato!',
    installNow: 'Ku Dar Shaashadda Hore',
    iosInstallGuide: 'Si aad iPhone ugu shubato: Taabo batoonka Share ee Safari, kadibna dooro "Add to Home Screen".',
    iosStep1: '1. Taabo calaamadda Share ee Safari',
    iosStep2: '2. Hoos u deg oo taabo "Add to Home Screen"',
    navExplore: 'Sahmi',
    navCategories: 'Qaybaha',
    navDriver: 'Darawalka',
    navAdmin: 'Maamulka',
    navProfile: 'Akoonka',
    loginRequired: 'Geli Xogta Maamulka',
    adminLoginTitle: 'Galitaanka Maamulka',
    driverLoginTitle: 'Galitaanka Darawalka',
    loginButton: 'Gal',
    logout: 'Ka Bax',
    totalFleet: 'Wadarta Gaadiidka',
    activeDrivers: 'Darawaliinta Khadka Ku Jira',
    availableBuses: 'Diyaar u ah Rakaabka',
    cityRegions: {
      Hargeisa: 'Hargeysa',
      Burao: 'Burco',
      Berbera: 'Berbera',
      Borama: 'Boorama',
      Erigavo: 'Ceerigaabo',
      'Las Anod': 'Laascaanood'
    }
  },
  ar: {
    appName: 'إيزي باص',
    appTagline: 'شبكة نقل المدارس والجامعات المعتمدة',
    allCategories: 'جميع الخدمات',
    schoolBus: 'حافلات المدارس',
    universityCar: 'سيارات الجامعات',
    schoolBusDesc: 'رحلات يومية آمنة ومجدولة لطلاب المدارس مع سائقين معتمدين',
    universityCarDesc: 'تنقل جامعي مرن، ومشاركات خاصة ومكيفة لطلاب الجامعات',
    allCities: 'جميع المدن',
    searchPlaceholder: 'ابحث بنوع الحافلة، اسم السائق، أو رقم اللوحة...',
    noVehiclesFound: 'لم يتم العثور على مركبات',
    noVehiclesFoundDesc: 'يرجى تجربة تغيير التصنيف، المدينة، أو كلمات البحث.',
    viewDetails: 'عرض التفاصيل',
    bookRide: 'حجز المركبة',
    bookNow: 'احجز الآن',
    whatsappContact: 'مراسلة عبر واتساب',
    directCall: 'اتصال مباشر',
    driverInfo: 'بيانات السائق',
    driverName: 'اسم السائق',
    driverNationalId: 'رقم الهوية الوطنية للسائق',
    driverPhone: 'رقم هاتف السائق',
    driverStatus: 'حالة السائق',
    online: 'متصل ومتاح',
    offline: 'غير متصل (خارج الخدمة)',
    driverIsOnline: 'السائق متاح وجاهز للرحلات',
    driverIsOffline: 'السائق غير متاح حالياً',
    toggleDriverStatus: 'تبديل حالة توفر السائق',
    vehicleSpecs: 'مواصفات المركبة',
    carModel: 'طراز المركبة',
    plateNumber: 'رقم اللوحة',
    seatCapacity: 'سعة المقاعد الكلية',
    availableSeats: 'المقاعد الشاغرة',
    operationalStatus: 'الحالة التشغيلية',
    shiftSchedule: 'جدول الدوام / الورديات',
    morning: 'الفترة الصباحية',
    afternoon: 'الفترة المسائية',
    bothShifts: 'الفترتان (يوم كامل)',
    rating: 'التقييم',
    reviews: 'تقييمات',
    photos: 'الصور',
    viewAllPhotos: 'عرض معرض الصور',
    features: 'المزايا ومعايير السلامة',
    featuresList: {
      ac: 'تكييف هواء عالي الكفاءة',
      gps: 'تتبع مباشر عبر GPS',
      firstAid: 'حقيبة إسعافات أولية',
      seatbelts: 'أحزمة أمان لكل مقعد',
      cctv: 'كاميرا مراقبة داخلية',
      childSafety: 'أقفال أمان للأطفال'
    },
    city: 'المدينة / المنطقة',
    location: 'منطقة التشغيل',
    statusAvailable: 'متاح للحجز',
    statusInUse: 'في الخدمة حالياً',
    statusMaintenance: 'قيد الصيانة',
    bookingTitle: 'طلب حجز وسيلة نقل',
    bookingSubtitle: 'أدخل بياناتك وسيتم إرسال الطلب فوراً لإدارة المنظومة',
    clientName: 'الاسم الكامل (ولي أمر / طالب / إدارة)',
    phoneNumber: 'رقم الهاتف / الجوال',
    institutionName: 'اسم المدرسة أو الجامعة',
    institutionPlaceholder: 'مثال: مدرسة هرجيسا الدولية / جامعة برعو',
    pickupLocation: 'الحي / موقع الانطلاق',
    pickupPlaceholder: 'مثال: حي 26 يونيو، الشارع العام',
    preferredShift: 'الفترة المطلوبة',
    notes: 'ملاحظات أو طلبات خاصة',
    notesPlaceholder: 'أدخل أي أوقات محددة أو تعليمات إضافية...',
    confirmBooking: 'إرسال طلب الحجز',
    bookingSuccess: 'تم إرسال طلب الحجز بنجاح!',
    bookingSuccessDesc: 'استلم فريق العمليات طلبك وسيتم التواصل معك مباشرة عبر واتساب أو الهاتف.',
    cancel: 'إلغاء',
    close: 'إغلاق',
    back: 'رجوع',
    adminPortal: 'لوحة الإدارة',
    adminAlerts: 'تنبيهات الحجوزات',
    addVehicle: 'إضافة مركبة جديدة',
    deleteVehicle: 'حذف المركبة',
    deleteConfirm: 'هل أنت متأكد من رغبتك في حذف هذه المركبة من النظام؟',
    driverPortal: 'بوابة السائق',
    incomingBookings: 'طلبات الحجز الواردة فورياً',
    noBookingsYet: 'لا توجد طلبات حجز جديدة حتى الآن.',
    newAlert: 'تنبيه: طلب حجز جديد وارد الآن',
    markAsRead: 'تمت المعالجة',
    statusPending: 'قيد الانتظار',
    statusApproved: 'تمت الموافقة',
    statusContacted: 'تم التواصل',
    statusRejected: 'مرفوض',
    installApp: 'تثبيت التطبيق',
    installPromptText: 'ثبّت تطبيق إيزي باص على شاشتك الرئيسية للوصول الفوري وتجربة هاتف حقيقية!',
    installNow: 'إضافة إلى الشاشة الرئيسية',
    iosInstallGuide: 'للتثبيت على أجهزة iPhone: اضغط على زر المشاركة (Share) في متصفح Safari ثم اختر "إضافة إلى الشاشة الرئيسية".',
    iosStep1: '١. اضغط على أيقونة المشاركة في متصفح Safari',
    iosStep2: '٢. انزل لأسفل واختر "إضافة إلى الشاشة الرئيسية"',
    navExplore: 'استكشاف',
    navCategories: 'الخدمات',
    navDriver: 'السائق',
    navAdmin: 'الإدارة',
    navProfile: 'حسابي',
    loginRequired: 'تسجيل دخول الإدارة',
    adminLoginTitle: 'بوابة إدارة النظام',
    driverLoginTitle: 'بوابة السائقين',
    loginButton: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    totalFleet: 'إجمالي الأسطول',
    activeDrivers: 'السائقون المتصلون الآن',
    availableBuses: 'حافلات جاهزة فوراً',
    cityRegions: {
      Hargeisa: 'هرجيسا',
      Burao: 'برعو',
      Berbera: 'بربرة',
      Borama: 'بورما',
      Erigavo: 'عيراجبو',
      'Las Anod': 'لاس عانود'
    }
  }
};
