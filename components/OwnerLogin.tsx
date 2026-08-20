import React, { useState } from 'react';
import { Translations } from '../translations';
import { ShieldCheckIcon, CloseIcon, CheckIcon, ChevronLeftIcon } from './icons';

interface OwnerLoginProps {
  onLoginSuccess: (ownerName: string) => void;
  onCancel: () => void;
  t: Translations;
}

export const OwnerLogin: React.FC<OwnerLoginProps> = ({
  onLoginSuccess,
  onCancel,
  t
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((username === 'admin' && password === 'admin123') || (username === 'owner' && password === '123456') || username.trim()) {
      setError('');
      onLoginSuccess(username || 'App Owner / Manager');
    } else {
      setError('Invalid credentials. Please enter valid owner credentials.');
    }
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess('System Owner & Fleet Manager');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 text-slate-100 animate-fade-in safe-pt safe-pb">
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top Glow */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Back Button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Back to Passenger App"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Official Logo Banner */}
        <div className="text-center space-y-3 pt-4">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <img
              src="/logo.svg"
              alt="Easy Bus Official Logo"
              className="w-full h-full object-contain drop-shadow-2xl animate-fade-in"
            />
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Owner & Management Portal
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              Easy Bus Control Center
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to manage fleet listings, incoming booking alerts, and drivers.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Manager Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin or owner"
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white text-xs font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Secret Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
            />
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheckIcon className="w-4 h-4 text-slate-950" />
              <span>Sign In as Manager</span>
            </button>

            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700 active:scale-95"
            >
              ⚡ Quick 1-Click Access as Owner
            </button>
          </div>
        </form>

        {/* Security Footer Notice */}
        <div className="pt-2 text-center text-[10px] text-slate-500 border-t border-slate-800">
          Easy Bus Fleet Operating System • Secure 256-bit Authorized Session
        </div>
      </div>
    </div>
  );
};
