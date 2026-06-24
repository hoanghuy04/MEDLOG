import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export default function SystemBar({ wifiConnected, currentTime }) {
  return (
    <div className="w-full h-8 bg-slate-950 text-slate-400 px-4 flex items-center justify-between text-xs select-none flex-shrink-0">
      <div className="flex items-center gap-1.5">
        <span className="font-extrabold text-slate-200 tracking-wider">VTOS Tablet</span>
        <span className="bg-emerald-950 text-emerald-400 text-[8px] font-black px-1.5 py-0.5 rounded border border-emerald-900/50">
          DEPO_04
        </span>
      </div>
      <div className="flex items-center gap-3">
        {wifiConnected ? (
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <WifiOff className="w-3.5 h-3.5 text-red-500 animate-pulse" />
        )}
        <span className="font-medium text-slate-300">88%</span>
        <div className="w-5 h-2.5 border border-slate-500 rounded-sm p-0.5 flex items-center">
          <div className="h-full w-4 bg-slate-300 rounded-2xs"></div>
        </div>
        <span className="font-semibold font-mono text-slate-200">
          {currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
