import React from 'react';
import { User, Eye, EyeOff } from 'lucide-react';
import bgImage from '../assets/background.webp';

export default function LoginScreen({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  loginError
}) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6 bg-slate-900 relative overflow-hidden">
      {/* Background Image with blur and dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[2px] scale-105 opacity-40 z-0 pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-slate-950/30 z-0 pointer-events-none" />

      <div className="w-full max-w-sm bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-slate-200/50 shadow-2xl text-left z-10 relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 mb-2.5">
            <span className="text-lg font-black tracking-wider">V</span>
          </div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Medlog Check</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">GIÁM ĐỊNH CONTAINER</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3.5">
          {loginError && (
            <div className="bg-red-50 text-red-600 text-xs font-bold p-2.5 rounded-lg border border-red-100 text-center">
              {loginError}
            </div>
          )}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tài khoản</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập..."
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-650"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-bold text-sm tracking-wider rounded-lg transition shadow-md shadow-emerald-500/20 uppercase mt-4"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
