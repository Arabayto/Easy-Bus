
import React from 'react';
import { User } from '../types';
import { UserIcon } from './icons';

interface UserProfileProps {
  user: User;
  onBack: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md animate-fade-in-up">
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-10 text-center">
           <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
               <UserIcon className="w-12 h-12 text-orange-500" />
           </div>
           <h2 className="text-3xl font-bold text-white tracking-tight">{user.name}</h2>
           {user.isAdmin && (
             <span className="inline-block mt-2 px-3 py-1 bg-orange-800 bg-opacity-30 text-white text-xs rounded-full uppercase tracking-wide font-bold border border-orange-300 border-opacity-30">
                Admin
             </span>
           )}
        </div>
        <div className="p-8 space-y-6">
           <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</label>
               <p className="text-lg text-gray-800 font-medium border-b border-gray-100 pb-2">{user.phoneNumber}</p>
           </div>
           
           <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Role</label>
               <p className="text-lg text-gray-800 font-medium border-b border-gray-100 pb-2">
                   {user.isAdmin ? 'System Administrator' : 'Standard User'}
               </p>
           </div>

           <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Account Type</label>
               <p className="text-lg text-gray-800 font-medium border-b border-gray-100 pb-2">{user.carType}</p>
           </div>

           <div className="pt-4">
               <button
                   onClick={onBack}
                   className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all shadow-lg"
               >
                   Back to Dashboard
               </button>
           </div>
        </div>
      </div>
    </div>
  );
};
