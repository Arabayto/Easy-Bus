
import React, { useState, useRef } from 'react';
import { Vehicle, VehicleStatus } from '../types';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (vehicle: Vehicle) => void;
  nextVehicleId: number;
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, onClose, onAddVehicle, nextVehicleId }) => {
  const [driverName, setDriverName] = useState('');
  const [driverNationalId, setDriverNationalId] = useState('');
  const [driverPhoneNumber, setDriverPhoneNumber] = useState('');
  const [isIdVerifying, setIsIdVerifying] = useState(false);
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [carModel, setCarModel] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [status, setStatus] = useState<VehicleStatus>(VehicleStatus.Available);
  const [rating, setRating] = useState(4.5);
  const [seats, setSeats] = useState(12);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
        const remainingSlots = 3 - additionalImages.length;
        const filesToProcess = Array.from(files).slice(0, remainingSlots);

        filesToProcess.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAdditionalImages(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    }
    // Reset input so same file can be selected again if needed (though unlikely for multiple)
    if (additionalFileInputRef.current) additionalFileInputRef.current.value = '';
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleVerifyId = () => {
    if (!driverNationalId || driverNationalId.length < 5) {
        alert("Please enter a valid National ID (min 5 chars).");
        return;
    }
    setIsIdVerifying(true);
    // Simulate API call
    setTimeout(() => {
        setIsIdVerifying(false);
        setIsIdVerified(true);
    }, 1500);
  };

  const handleClose = () => {
    setDriverName('');
    setDriverNationalId('');
    setDriverPhoneNumber('');
    setIsIdVerified(false);
    setIsIdVerifying(false);
    setCarModel('');
    setPlateNumber('');
    setStatus(VehicleStatus.Available);
    setRating(4.5);
    setSeats(12);
    setImagePreview(null);
    setAdditionalImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (additionalFileInputRef.current) additionalFileInputRef.current.value = '';
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverName || !carModel || !plateNumber || !driverNationalId || !driverPhoneNumber) {
        alert('Please fill out all required fields.');
        return;
    }

    if (!isIdVerified) {
        // Auto-verify for better UX if they forgot to click
        if (driverNationalId.length >= 5) {
            setIsIdVerified(true);
        } else {
            alert('Please enter a valid Driver National ID.');
            return;
        }
    }

    const newVehicle: Vehicle = {
      id: nextVehicleId,
      driverName,
      driverNationalId,
      driverPhoneNumber,
      carModel,
      plateNumber,
      status,
      imageUrl: imagePreview || `https://picsum.photos/seed/${plateNumber}/600/400`,
      additionalImages: additionalImages,
      rating: Number(rating),
      seats: Number(seats),
    };

    onAddVehicle(newVehicle);
    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" role="dialog" aria-modal="true" aria-labelledby="add-vehicle-title">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <h2 id="add-vehicle-title" className="text-2xl font-bold text-gray-800 mb-6">Add New Vehicle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Main Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Image (Main)</label>
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-orange-400 transition-colors">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Vehicle Preview" className="mx-auto h-48 object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none shadow-sm"
                      title="Remove image"
                    >
                       <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" ref={fileInputRef} onChange={handleImageChange} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (Any size)</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Additional Images Upload */}
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Photos (Up to 3)</label>
              <div className="grid grid-cols-4 gap-2">
                  {additionalImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-square border rounded-md overflow-hidden">
                          <img src={img} alt={`Add ${idx}`} className="w-full h-full object-cover" />
                          <button
                              type="button"
                              onClick={() => removeAdditionalImage(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                          >
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                          </button>
                      </div>
                  ))}
                  {additionalImages.length < 3 && (
                      <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-orange-400 bg-gray-50">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            ref={additionalFileInputRef} 
                            onChange={handleAdditionalImagesChange} 
                          />
                      </label>
                  )}
              </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="driverName" className="block text-sm font-medium text-gray-700">Driver Name</label>
                <input type="text" id="driverName" value={driverName} onChange={(e) => setDriverName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="driverPhoneNumber" className="block text-sm font-medium text-gray-700">Driver Phone</label>
                <input type="tel" id="driverPhoneNumber" value={driverPhoneNumber} onChange={(e) => setDriverPhoneNumber(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder="e.g. 1234567890" />
              </div>
          </div>

          <div>
            <label htmlFor="driverNationalId" className="block text-sm font-medium text-gray-700">Driver National ID</label>
            <div className="flex mt-1">
                <input 
                    type="text" 
                    id="driverNationalId" 
                    value={driverNationalId} 
                    onChange={(e) => {
                        setDriverNationalId(e.target.value);
                        setIsIdVerified(false); 
                    }} 
                    required 
                    className={`block w-full px-3 py-2 border rounded-l-md shadow-sm focus:outline-none sm:text-sm ${isIdVerified ? 'border-green-500 focus:ring-green-500 focus:border-green-500' : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'}`}
                />
                <button
                    type="button"
                    onClick={handleVerifyId}
                    disabled={isIdVerifying || isIdVerified || !driverNationalId}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${isIdVerified ? 'bg-green-600 cursor-default' : 'bg-gray-800 hover:bg-gray-700 focus:ring-gray-500'}`}
                >
                    {isIdVerifying ? '...' : isIdVerified ? 'Verified' : 'Verify'}
                </button>
            </div>
            {isIdVerified && <p className="text-xs text-green-600 mt-1">ID Verified successfully.</p>}
          </div>

          <div>
            <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">Car Model</label>
            <input type="text" id="carModel" value={carModel} onChange={(e) => setCarModel(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="plateNumber" className="block text-sm font-medium text-gray-700">Plate Number</label>
            <input type="text" id="plateNumber" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value as VehicleStatus)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md">
              {Object.values(VehicleStatus).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (0.0 - 5.0)</label>
              <input type="number" id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} step="0.1" min="0" max="5" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="seats" className="block text-sm font-medium text-gray-700">Seats</label>
              <input type="number" id="seats" value={seats} onChange={(e) => setSeats(Number(e.target.value))} min="1" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Cancel
            </button>
            <button 
                type="submit" 
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};