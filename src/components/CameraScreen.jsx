import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Grid, RotateCw, Camera, CameraOff } from 'lucide-react';

export default function CameraScreen({
  capturingSlotIndex,
  showCameraGrid,
  setShowCameraGrid,
  isFlashActive,
  triggerShutter,
  cameraFacing,
  setCameraFacing,
  navigateTo,
  CONTAINER_IMAGES
}) {
  const videoRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);

  const getCameraTitle = () => {
    if (typeof capturingSlotIndex === 'string') {
      if (capturingSlotIndex.startsWith('interior')) {
        if (capturingSlotIndex === 'interior-new') {
          return "Chụp ảnh bên trong (Mới)";
        }
        const idx = parseInt(capturingSlotIndex.split('-')[1]);
        return `Chụp ảnh bên trong #${idx + 1}`;
      }
    }
    return `Chụp ảnh góc ngoại thất #${(Number(capturingSlotIndex) || 0) + 1}`;
  };

  const getViewfinderImage = () => {
    if (typeof capturingSlotIndex === 'string' && capturingSlotIndex.startsWith('interior')) {
      return CONTAINER_IMAGES.interiorEmpty;
    }
    const idx = Number(capturingSlotIndex) || 0;
    return CONTAINER_IMAGES.angles[idx % CONTAINER_IMAGES.angles.length];
  };

  // Initialize browser camera stream
  useEffect(() => {
    let activeStream = null;
    async function startCamera() {
      setCameraError(false);
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("API getUserMedia không khả dụng");
        }
        const constraints = {
          video: {
            facingMode: cameraFacing === 'rear' ? 'environment' : 'user'
          },
          audio: false
        };
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        activeStream = mediaStream;
      } catch (err) {
        console.warn("Camera hardware not available or permission denied, using visual mock fallback.", err);
        setCameraError(true);
      }
    }

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraFacing]);

  // Capture frame from canvas
  const handleCaptureClick = () => {
    if (!cameraError && videoRef.current) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth || 1280;
        canvas.height = videoRef.current.videoHeight || 720;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg');
          triggerShutter(dataUrl);
          return;
        }
      } catch (err) {
        console.error("Canvas draw failure, capturing fallback image.", err);
      }
    }
    // Fallback to static mock images
    triggerShutter();
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative">
      
      {/* 1. HEADER OVERLAY */}
      <div className="h-14 bg-slate-950/80 backdrop-blur-md px-4 flex items-center justify-between flex-shrink-0 z-20 border-b border-slate-900">
        <button onClick={() => navigateTo('step1')} className="p-1.5 hover:bg-slate-900 rounded-full text-slate-300">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="text-xs font-black text-emerald-400 uppercase tracking-widest leading-none block">
            {getCameraTitle()}
          </span>
          <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase block mt-0.5">
            {typeof capturingSlotIndex === 'string' && capturingSlotIndex.startsWith('interior') ? 'KIỂM TRA BÊN TRONG' : 'KIỂM TRA VỎ CONTAINER'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setShowCameraGrid(!showCameraGrid)}
            className={`p-1.5 rounded-full ${showCameraGrid ? 'text-emerald-400 bg-slate-900' : 'text-slate-400'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. CAMERA VIDEO VIEWPORT & GRID/TARGET OVERLAY */}
      <div className="flex-1 relative bg-slate-950 overflow-hidden flex items-center justify-center">
        {cameraError ? (
          <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-4 border border-red-500/25">
              <CameraOff className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">LỖI KẾT NỐI CAMERA</h4>
            <p className="text-xs text-slate-400 max-w-[280px] leading-relaxed mb-4">
              Không thể truy cập camera thực tế của thiết bị. Vui lòng kiểm tra quyền truy cập camera trong cài đặt trình duyệt của bạn.
            </p>
            <span className="text-[9px] bg-slate-900 text-slate-500 px-3 py-1.5 rounded-full border border-slate-800 font-semibold tracking-wide uppercase">
              Bạn vẫn có thể chụp để sử dụng ảnh giả lập
            </span>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform scale-x-100"
          />
        )}

        {/* Flash Effect */}
        {isFlashActive && (
          <div className="absolute inset-0 bg-white z-40 transition-all duration-75 pointer-events-none"></div>
        )}

        {/* Grid 3x3 */}
        {showCameraGrid && (
          <div className="absolute inset-0 z-10 pointer-events-none grid grid-cols-3 grid-rows-3">
            <div className="border-r border-b border-white/20"></div>
            <div className="border-r border-b border-white/20"></div>
            <div className="border-b border-white/20"></div>
            <div className="border-r border-b border-white/20"></div>
            <div className="border-r border-b border-white/20"></div>
            <div className="border-b border-white/20"></div>
            <div className="border-r border-white/20"></div>
            <div className="border-r border-white/20"></div>
            <div></div>
          </div>
        )}

        {/* Target alignment guideline */}
        <div className="absolute z-10 pointer-events-none border-2 border-dashed border-emerald-500/80 w-[80%] h-[40%] rounded-lg flex flex-col items-center justify-center bg-emerald-500/5">
          <div className="w-6 h-6 border-b-2 border-r-2 border-emerald-400 absolute bottom-2 right-2"></div>
          <div className="w-6 h-6 border-t-2 border-l-2 border-emerald-400 absolute top-2 left-2"></div>
          <div className="bg-black/60 px-3 py-1 rounded text-[9px] font-bold text-emerald-400 uppercase tracking-wide">
            CĂN CHỈNH THEO KHUNG HÌNH
          </div>
        </div>

        {/* Timestamp on camera */}
        <div className="absolute bottom-4 right-3 bg-black/40 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-gray-300 z-10">
          {new Date().toLocaleDateString('vi-VN')} {new Date().toLocaleTimeString('vi-VN')}
        </div>
      </div>

      {/* 4. BOTTOM ACTION CONTROL BAR */}
      <div className="h-28 bg-zinc-950 flex justify-around items-center px-8 border-t border-zinc-900 z-20 flex-shrink-0">
        <button 
          onClick={() => {
            const fileInput = document.getElementById('camera-file-uploader');
            if (fileInput) fileInput.click();
          }}
          className="flex flex-col items-center text-slate-400 hover:text-white"
        >
          <span className="text-xl">📁</span>
          <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">Tải lên</span>
        </button>

        <div className="relative flex items-center justify-center">
          <button 
            onClick={handleCaptureClick}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1 border-4 border-zinc-800 shadow-xl hover:scale-105 active:scale-95 transition-all focus:outline-none"
          >
            <div className="w-full h-full bg-white rounded-full border border-zinc-300 flex flex-col items-center justify-center text-black">
              <Camera className="w-5 h-5 text-slate-900" />
            </div>
          </button>
        </div>

        <button 
          onClick={() => setCameraFacing(prev => prev === 'rear' ? 'front' : 'rear')}
          className="flex flex-col items-center text-slate-400 hover:text-white"
        >
          <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center">
            <RotateCw className="w-4 h-4 text-slate-300" />
          </div>
          <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">Lật cam</span>
        </button>
      </div>

      <input
        id="camera-file-uploader"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const fakeUrl = URL.createObjectURL(e.target.files[0]);
            triggerShutter(fakeUrl);
          }
        }}
      />
    </div>
  );
}
