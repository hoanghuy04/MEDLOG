import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  Settings, 
  Camera, 
  ArrowLeft, 
  Check, 
  CheckCircle, 
  AlertTriangle, 
  Play, 
  LogOut, 
  RefreshCw, 
  FileText, 
  Plus, 
  Eye, 
  User, 
  Sparkles, 
  Calendar, 
  Edit, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Wifi, 
  WifiOff, 
  CameraOff, 
  Bell, 
  Maximize2, 
  Minimize2, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Sliders, 
  Info,
  Layers,
  Sparkle
} from 'lucide-react';

// Pre-defined Container Images from Unsplash for realistic mockup
const CONTAINER_IMAGES = {
  main: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
  yard: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  port: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80",
  warehouse: "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=800&q=80",
  interiorEmpty: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80", // industrial textured interior
  cams: [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=200&q=80", // CAM 1
    "", // CAM 2 (Offline)
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=200&q=80", // CAM 3
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=200&q=80", // CAM 4 (Active default)
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=200&q=80", // CAM 5
    "https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&w=200&q=80", // CAM 6
    "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=200&q=80", // CAM 7
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=200&q=80", // CAM 8
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=200&q=80", // CAM 9
    "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=200&q=80", // CAM 10 (Fault)
  ],
  angles: [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80", // Góc 1
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80", // Góc 2
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=400&q=80", // Góc 3
    "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=400&q=80", // Góc 4
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=400&q=80", // Góc 5
    "https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&w=400&q=80", // Góc 6
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80", // Góc 7 Front
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80", // Góc 8 Rear
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=400&q=80", // Góc 9 Top View
    "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=400&q=80", // Góc 10 Wide Angle
  ]
};

// Initial states definition
const INITIAL_FORM = {
  direction: 'IN',
  containerNumber: '',
  inspectionDate: new Date().toISOString().split('T')[0],
  pincode: '',
  productionYear: '2024',
  shippingLine: 'MAERSK',
  size: "40' HC",
  condition: 'Bình thường',
  classification: 'Loại A',
  cleaningType: 'VE SINH NUOC',
  depositFee: '0 VNĐ',
  notes: ''
};

function App() {
  // Navigation & Screen Control
  const [currentScreen, setCurrentScreen] = useState('login'); // login, home, step1, camera, step2, success, profile
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('giamsat'); // giamsat, kiemtra, canhan
  const [tabletOrientation, setTabletOrientation] = useState('portrait'); // portrait, landscape
  
  // Login States
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('meglog2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Camera & Image Collection States
  const [selectedCam, setSelectedCam] = useState(4); // default active CAM 4
  const [camGridAllOpen, setCamGridAllOpen] = useState(false);
  const [cameras, setCameras] = useState([
    { id: 1, name: 'CAM 1', status: 'online', url: CONTAINER_IMAGES.cams[0] },
    { id: 2, name: 'CAM 2', status: 'offline', url: null },
    { id: 3, name: 'CAM 3', status: 'online', url: CONTAINER_IMAGES.cams[2] },
    { id: 4, name: 'CAM 4', status: 'active', url: CONTAINER_IMAGES.cams[3] },
    { id: 5, name: 'CAM 5', status: 'online', url: CONTAINER_IMAGES.cams[4] },
    { id: 6, name: 'CAM 6', status: 'online', url: CONTAINER_IMAGES.cams[5] },
    { id: 7, name: 'CAM 7', status: 'online', url: CONTAINER_IMAGES.cams[6] },
    { id: 8, name: 'CAM 8', status: 'online', url: CONTAINER_IMAGES.cams[7] },
    { id: 9, name: 'CAM 9', status: 'online', url: CONTAINER_IMAGES.cams[8] },
    { id: 10, name: 'CAM 10', status: 'fault', url: CONTAINER_IMAGES.cams[9] },
  ]);

  // Stepper Image slots (10 slots for Step 1)
  const [exteriorImages, setExteriorImages] = useState(Array(10).fill(null));
  const [interiorImage, setInteriorImage] = useState(null);
  
  // Custom camera parameters
  const [capturingSlotIndex, setCapturingSlotIndex] = useState(null);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [showCameraGrid, setShowCameraGrid] = useState(true);
  const [telemetry, setTelemetry] = useState({ lvl: 0.82, dst: 4.5 });
  const [cameraFacing, setCameraFacing] = useState('rear'); // rear, front

  // Form Details (Step 2)
  const [formData, setFormData] = useState({ ...INITIAL_FORM });
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');
  
  // Reports database / history list
  const [submittedReports, setSubmittedReports] = useState([]);
  const [activeReportDetail, setActiveReportDetail] = useState(null);

  // System settings
  const [wifiConnected, setWifiConnected] = useState(true);
  const [systemLogs, setSystemLogs] = useState([]);
  
  // Time state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Ref for scroll containers
  const logsEndRef = useRef(null);

  // Clock effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Telemetry fluctuation effect (in camera mode)
  useEffect(() => {
    if (currentScreen !== 'camera') return;
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        lvl: Number((prev.lvl + (Math.random() * 0.08 - 0.04)).toFixed(2)),
        dst: Number((prev.dst + (Math.random() * 0.2 - 0.1)).toFixed(1))
      }));
    }, 400);
    return () => clearInterval(interval);
  }, [currentScreen]);

  // Auto-scroll system logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [systemLogs]);

  // Add a log helper
  const addLog = (message, type = 'info') => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    setSystemLogs(prev => [...prev, { time: timeStr, message, type }]);
  };

  // Run initial logs
  useEffect(() => {
    addLog("Khởi động hệ điều hành MEGLOG OS v4.1...", "success");
    addLog("Đang kết nối đến hệ thống cổng thông tin...", "info");
    addLog("Camera CAM 10 báo cáo trạng thái lỗi [FAULT: CHE KHUẤT LENS]!", "warning");
    addLog("Sẵn sàng cho việc giám định container.", "info");
  }, []);

  // Log screen changes
  const navigateTo = (screenName) => {
    setCurrentScreen(screenName);
    addLog(`Chuyển sang màn hình: ${screenName.toUpperCase()}`, "info");

    // Sync Bottom Navigation highlight
    if (screenName === 'home') setActiveTab('giamsat');
    if (screenName === 'step1' || screenName === 'step2' || screenName === 'camera' || screenName === 'success') {
      setActiveTab('kiemtra');
    }
    if (screenName === 'profile') setActiveTab('canhan');
  };

  // Login handler
  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('Vui lòng điền đầy đủ tài khoản và mật khẩu.');
      return;
    }
    
    // Simple mock logic
    if (username === 'admin' && password === 'meglog2026') {
      setIsLoggedIn(true);
      setLoginError('');
      addLog(`Giám định viên 'Nguyễn Văn An (ID: 8821)' đăng nhập thành công.`, "success");
      navigateTo('home');
    } else {
      setLoginError('Tài khoản hoặc mật khẩu không đúng.');
      addLog(`Thất bại: Thử đăng nhập sai với tài khoản '${username}'`, "error");
    }
  };

  // Trigger quick scan for container code
  const triggerContainerScanner = () => {
    setIsScanning(true);
    setScanMessage('Đang quét OCR mã Container...');
    addLog("Kích hoạt Camera OCR quét mã Container...", "info");

    setTimeout(() => {
      // Generate realistic container number
      // format: 4 letters (e.g. MAEU, MSCS, COSU, ONEU), 6 digits, 1 check digit
      const prefixes = ['MAEU', 'MSCU', 'COSU', 'CMAU', 'ONEU'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const num = Math.floor(100000 + Math.random() * 900000);
      const checkDigit = Math.floor(Math.random() * 10);
      const generatedCode = `${prefix}${num}${checkDigit}`;

      setFormData(prev => ({ ...prev, containerNumber: generatedCode }));
      setIsScanning(false);
      setScanMessage('');
      addLog(`Quét thành công! Nhận dạng: ${generatedCode}`, "success");
      
      // Simulated audio beep using browser speech synth as a cool easter egg or visual feedback
      try {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance("Beep");
          utterance.pitch = 2;
          utterance.rate = 2.5;
          utterance.volume = 0.5;
          window.speechSynthesis.speak(utterance);
        }
      } catch (err) {}
    }, 1800);
  };

  // Capture photos in simulated camera
  const triggerShutter = () => {
    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 200);

    setTimeout(() => {
      const angleImage = CONTAINER_IMAGES.angles[capturingSlotIndex % CONTAINER_IMAGES.angles.length];
      
      const newImages = [...exteriorImages];
      newImages[capturingSlotIndex] = angleImage;
      setExteriorImages(newImages);
      
      addLog(`Đã chụp ảnh Góc ${capturingSlotIndex + 1} (${getAngleLabel(capturingSlotIndex)})`, "success");
      navigateTo('step1');
    }, 350);
  };

  // Skip / Autofill all data helper for demo
  const triggerAutofillAll = () => {
    setIsLoggedIn(true);
    
    // Fill all 10 angles
    const mockAngles = [...CONTAINER_IMAGES.angles];
    setExteriorImages(mockAngles);
    
    // Fill interior
    setInteriorImage(CONTAINER_IMAGES.interiorEmpty);

    // Fill form
    const mockContainerId = "MAEU" + Math.floor(1000000 + Math.random() * 9000000);
    setFormData({
      direction: 'IN',
      containerNumber: mockContainerId,
      inspectionDate: new Date().toISOString().split('T')[0],
      pincode: 'PIN-' + Math.floor(100000 + Math.random() * 900000),
      productionYear: '2023',
      shippingLine: 'MAERSK',
      size: "40' HC",
      condition: 'Bình thường',
      classification: 'Loại A',
      cleaningType: 'VE SINH NUOC',
      depositFee: '250,000 VNĐ',
      notes: 'Thùng cont khô ráo, không mùi, vách phẳng.'
    });

    addLog("DEVELOPER: Đã tự động điền toàn bộ ảnh & thông tin mẫu.", "success");
    navigateTo('step2');
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.containerNumber) {
      alert("Vui lòng điền hoặc quét SỐ CONTAINER!");
      return;
    }

    const reportId = formData.containerNumber;
    const completedTime = `${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - ${new Date().toLocaleDateString('vi-VN')}`;
    
    const newReport = {
      id: reportId,
      time: completedTime,
      inspector: "Nguyễn Văn An (ID: 8821)",
      imagesCount: exteriorImages.filter(x => x !== null).length + (interiorImage ? 1 : 0),
      details: { ...formData },
      exteriorImages: [...exteriorImages],
      interiorImage: interiorImage
    };

    setSubmittedReports(prev => [newReport, ...prev]);
    addLog(`Đã gửi báo cáo thành công cho Container: ${reportId}`, "success");
    navigateTo('success');
  };

  const resetInspection = () => {
    setExteriorImages(Array(10).fill(null));
    setInteriorImage(null);
    setFormData({ ...INITIAL_FORM });
    addLog("Đã đặt lại quy trình kiểm tra container mới.", "info");
    navigateTo('step1');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('admin');
    setPassword('meglog2026');
    addLog("Đăng xuất khỏi hệ thống.", "info");
    navigateTo('login');
  };

  const getAngleLabel = (index) => {
    const labels = [
      "Góc 1", "Góc 2", "Góc 3", "Góc 4", "Góc 5", "Góc 6", 
      "Góc 7 (FRONT)", "Góc 8 (REAR)", "Góc 9 (TOP VIEW)", "Góc 10 (WIDE ANGLE)"
    ];
    return labels[index] || `Góc ${index + 1}`;
  };

  const getCameraStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">ACTIVE</span>;
      case 'fault':
        return <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">FAULT</span>;
      case 'offline':
        return <span className="bg-gray-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">OFFLINE</span>;
      default:
        return <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">ONLINE</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-4 lg:p-8">
      
      {/* Dynamic Header */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-950 text-xl tracking-wider">
              M
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white m-0 leading-none">MEGLOG SYSTEM</h1>
              <p className="text-xs text-slate-400 mt-1">Tablet Simulator Portal - Production Ready Web App</p>
            </div>
          </div>
        </div>
        
        {/* Helper Options Dashboard */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={triggerAutofillAll}
            className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-slate-950 text-xs font-bold px-3 py-2 rounded-lg transition shadow-md shadow-amber-500/10"
            title="Điền tự động tất cả ảnh và form để test màn hình Success"
          >
            <Sparkles className="w-4 h-4" />
            <span>⚡ AUTO-FILL ALL</span>
          </button>
          
          <button
            onClick={() => setTabletOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait')}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>XOAY MÀN HÌNH ({tabletOrientation === 'portrait' ? 'DỌC' : 'NGANG'})</span>
          </button>

          <button
            onClick={() => setWifiConnected(prev => !prev)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition border ${
              wifiConnected ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-red-950/40 border-red-900 text-red-400'
            }`}
          >
            {wifiConnected ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span>{wifiConnected ? 'WIFI: OK' : 'WIFI: MẤT KẾT NỐI'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Tablet Simulation Container (7/12 width in desktop) */}
        <div className="lg:col-span-8 flex justify-center w-full">
          
          {/* Outer tablet casing */}
          <div className={`relative transition-all duration-500 bg-slate-900 border-4 border-slate-750 shadow-2xl rounded-[36px] flex flex-col p-4 ${
            tabletOrientation === 'portrait' 
              ? 'w-full max-w-[500px] aspect-[10/16] min-h-[780px]' 
              : 'w-full max-w-[850px] aspect-[16/10] min-h-[520px]'
          }`}>
            
            {/* Front Camera Lens Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-1.5 z-50">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
              <span className="w-2 h-2 rounded-full bg-blue-900/60 border border-blue-600/30"></span>
            </div>

            {/* Hardware buttons on side (power, volume) */}
            <div className="absolute -right-1 top-24 w-1.5 h-12 bg-slate-850 rounded-l"></div>
            <div className="absolute -right-1 top-40 w-1.5 h-8 bg-slate-850 rounded-l"></div>
            <div className="absolute -right-1 top-52 w-1.5 h-8 bg-slate-850 rounded-l"></div>

            {/* Tablet Inner Screen Border */}
            <div className="w-full h-full flex flex-col bg-white text-slate-800 rounded-[24px] overflow-hidden relative shadow-inner">
              
              {/* TABLET SYSTEM BAR */}
              <div className="w-full h-8 bg-slate-950 text-slate-400 px-4 flex items-center justify-between text-xs select-none">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white">MEGLOG Tablet</span>
                  <span className="text-[10px] px-1 py-0.2 bg-emerald-500/20 text-emerald-400 rounded">DEPO_04</span>
                </div>
                <div className="flex items-center gap-2">
                  {wifiConnected ? (
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <WifiOff className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span className="text-[10px]">88%</span>
                  <div className="w-5 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-emerald-400 rounded-2xs"></div>
                  </div>
                  <span className="text-white font-medium">
                    {currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* TABLET VIEWPORT CONTAINER (scrollable client area) */}
              <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 relative">
                
                {/* ----------------- SCREEN: LOGIN ----------------- */}
                {currentScreen === 'login' && (
                  <div className="flex-1 flex flex-col justify-center items-center p-6 bg-slate-50 relative">
                    {/* Decorative Background Mesh */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
                    
                    <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center">
                      {/* System Logo */}
                      <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center font-black text-emerald-400 text-3xl tracking-widest mb-3 shadow-lg">
                        ML
                      </div>
                      <h2 className="text-xl font-extrabold text-slate-950 tracking-wide m-0">MEGLOG SYSTEM</h2>
                      <p className="text-xs text-slate-500 mb-6">Hệ thống Giám định & Quản lý Container</p>

                      <form onSubmit={handleLogin} className="w-full space-y-4">
                        {loginError && (
                          <div className="bg-red-555 bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg border border-red-200 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            <span>{loginError}</span>
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
                              className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" 
                            />
                            <User className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
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
                              className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" 
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs focus:outline-none font-semibold"
                            >
                              {showPassword ? "ẨN" : "HIỆN"}
                            </button>
                          </div>
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-bold text-sm tracking-wider rounded-lg transition-colors shadow-md shadow-emerald-500/20 uppercase mt-4"
                        >
                          ĐĂNG NHẬP
                        </button>
                      </form>

                      {/* Quick Auto Login */}
                      <button 
                        type="button" 
                        onClick={() => {
                          setUsername('admin');
                          setPassword('meglog2026');
                          // Directly login
                          setIsLoggedIn(true);
                          addLog("Đăng nhập nhanh qua chế độ Demo.", "success");
                          navigateTo('home');
                        }}
                        className="mt-6 text-xs text-emerald-600 hover:text-emerald-700 hover:underline font-semibold"
                      >
                        Đăng nhập bằng tài khoản Demo mặc định
                      </button>

                      <div className="mt-8 pt-4 border-t border-slate-100 w-full text-center">
                        <span className="text-[10px] text-slate-400">Liên hệ kỹ thuật: 1900-xxxx hoặc support@meglog.vn</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------- SCREEN: HOME (Monitoring) ----------------- */}
                {currentScreen === 'home' && (
                  <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                    {/* Header */}
                    <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600">
                          <Menu className="w-5 h-5" />
                        </button>
                        <h2 className="text-base font-bold text-slate-900 m-0">Kiểm tra Container</h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 relative">
                          <Bell className="w-5 h-5" />
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
                        </button>
                        <button onClick={() => navigateTo('profile')} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600">
                          <Settings className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Scrollable body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
                      
                      {/* Title Header Section */}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">TRỰC TIẾP</span>
                        </div>
                        <div className="flex justify-between items-center mt-0.5">
                          <h3 className="text-lg font-bold text-slate-900">CAMERA GIÁM SÁT</h3>
                          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            CAM_0{selectedCam}_HQ
                          </span>
                        </div>
                      </div>

                      {/* Live View Box */}
                      <div className="relative aspect-video w-full bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                        {cameras[selectedCam - 1].status === 'offline' ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-2">
                            <CameraOff className="w-12 h-12 text-slate-600" />
                            <span className="text-sm font-semibold">Tín hiệu Camera mất kết nối</span>
                          </div>
                        ) : (
                          <>
                            {/* Live Image Stream (uses CAM selected image) */}
                            <img 
                              src={cameras[selectedCam - 1].url || CONTAINER_IMAGES.main} 
                              alt="Live Cam Stream" 
                              className="w-full h-full object-cover opacity-85" 
                            />
                            
                            {/* Camera Details Overlay */}
                            <div className="absolute top-3 left-3 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-mono text-slate-300 flex items-center gap-2 border border-slate-800">
                              <span>ISO 400</span>
                              <span className="text-slate-600">|</span>
                              <span>1/120s</span>
                            </div>

                            {/* Camera Name Tag */}
                            <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
                              LIVE - HD
                            </div>

                            {/* Scanner Target Target */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              {/* Corner targets */}
                              <div className="w-[60%] h-[60%] border border-dashed border-emerald-500/50 rounded flex flex-col items-center justify-center relative">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

                                {/* Ready Icon and alignment check */}
                                <div className="bg-emerald-500/90 text-slate-950 px-3 py-1.5 rounded-lg flex flex-col items-center justify-center shadow-lg border border-emerald-400/20 pointer-events-auto ready-glow">
                                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mb-0.5">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                                  </div>
                                  <span className="text-[10px] font-extrabold uppercase tracking-wide leading-none mt-0.5">CĂN CHỈNH CONTAINER</span>
                                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 mt-0.5">SẴN SÀNG</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Camera Grid list (10 items) */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">HỆ THỐNG CAMERA ({cameras.length})</h4>
                          <button 
                            onClick={() => setCamGridAllOpen(true)}
                            className="text-[11px] text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
                          >
                            <span>Xem tất cả</span>
                            <Maximize2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Grid container */}
                        <div className="grid grid-cols-5 gap-2">
                          {cameras.map((cam) => {
                            const isActive = selectedCam === cam.id;
                            const isFault = cam.status === 'fault';
                            const isOffline = cam.status === 'offline';
                            
                            return (
                              <button
                                key={cam.id}
                                onClick={() => setSelectedCam(cam.id)}
                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition flex flex-col items-center justify-center bg-slate-900 group ${
                                  isActive 
                                    ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                                    : isFault 
                                      ? 'border-red-500' 
                                      : 'border-slate-200 hover:border-slate-400'
                                }`}
                              >
                                {isOffline ? (
                                  <div className="flex flex-col items-center justify-center p-1">
                                    <CameraOff className="w-4 h-4 text-slate-500" />
                                    <span className="text-[8px] text-slate-500 mt-1 uppercase font-bold">OFFLINE</span>
                                  </div>
                                ) : isFault ? (
                                  <div className="absolute inset-0 bg-red-650/90 flex flex-col items-center justify-center p-1 text-center bg-red-600 text-white">
                                    <AlertTriangle className="w-5 h-5 text-white animate-bounce" />
                                    <span className="text-[8px] font-bold uppercase tracking-wider mt-0.5">FAULT</span>
                                  </div>
                                ) : (
                                  <>
                                    <img 
                                      src={cam.url || CONTAINER_IMAGES.main} 
                                      alt={cam.name} 
                                      className="w-full h-full object-cover opacity-60" 
                                    />
                                    {isActive && (
                                      <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                                        <div className="bg-emerald-500 text-slate-950 font-black text-[8px] px-1 py-0.2 rounded">
                                          ACTIVE
                                        </div>
                                      </div>
                                    )}
                                  </>
                                )}
                                
                                {/* Camera index tag bottom left */}
                                <div className="absolute bottom-0.5 left-1 bg-slate-950/85 px-1 py-0.1 rounded text-[8px] font-mono text-slate-300">
                                  {cam.name}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Status Quick Board */}
                      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100">
                              <th className="px-3 py-2">ID CONTAINER</th>
                              <th className="px-3 py-2">TRẠNG THÁI</th>
                              <th className="px-3 py-2 text-right">HÀNH ĐỘNG</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-xs">
                            <tr className="hover:bg-slate-50">
                              <td className="px-3 py-2.5 font-medium text-slate-400">---</td>
                              <td className="px-3 py-2.5">
                                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded">ĐANG CHỜ</span>
                              </td>
                              <td className="px-3 py-2.5 text-right text-slate-400 font-bold">...</td>
                            </tr>
                            <tr className="bg-emerald-50/20 hover:bg-emerald-50/40">
                              <td className="px-3 py-3 font-bold text-slate-900">HAP 2030</td>
                              <td className="px-3 py-3">
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">SẴN SÀNG</span>
                              </td>
                              <td className="px-3 py-3 text-right">
                                <button 
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, containerNumber: 'HAP2030' }));
                                    addLog("Đang tải dữ liệu container: HAP 2030", "info");
                                    navigateTo('step1');
                                  }}
                                  className="inline-flex items-center justify-center p-1 bg-emerald-500 hover:bg-emerald-600 rounded-full text-slate-950 transition"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current text-slate-950" />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Giant Action Button */}
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            addLog("Bắt đầu quy trình kiểm định container mới...", "info");
                            navigateTo('step1');
                          }}
                          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 ready-glow"
                        >
                          <Camera className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                          <span>CHỤP ẢNH - BẮT ĐẦU QUY TRÌNH KIỂM TRA</span>
                        </button>
                        <p className="text-[11px] text-slate-500 italic text-center mt-2">
                          Lưu ý: Đảm bảo container nằm trong khung ngắm trước khi chụp.
                        </p>
                      </div>

                    </div>
                  </div>
                )}

                {/* ----------------- SCREEN: CONTAINER DETAIL STEP 1 (Images) ----------------- */}
                {currentScreen === 'step1' && (
                  <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                    {/* Header */}
                    <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <button onClick={() => navigateTo('home')} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600">
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-base font-bold text-slate-900 m-0">Kiểm tra Container</h2>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                        Bước 1/2
                      </span>
                    </div>

                    {/* Stepper progress indicator */}
                    <div className="bg-white px-6 py-3 border-b border-slate-200 flex items-center justify-center flex-shrink-0">
                      <div className="flex items-center gap-2">
                        {/* Step 1 */}
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">1</div>
                          <span className="text-[11px] font-extrabold text-emerald-600 uppercase">HÌNH ẢNH GIÁM ĐỊNH</span>
                        </div>
                        {/* Connector line */}
                        <div className="w-8 h-0.5 bg-slate-300"></div>
                        {/* Step 2 */}
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 font-bold text-xs flex items-center justify-center">2</div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase">THÔNG TIN CONTAINER</span>
                        </div>
                      </div>
                    </div>

                    {/* Scrollable grid slots */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
                      
                      {/* Section 1: GÓC NGOÀI */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">GÓC NGOÀI (10 ảnh ngoại thất)</h3>
                          <button 
                            onClick={() => {
                              // Quick auto-populate all slots of Step 1
                              setExteriorImages([...CONTAINER_IMAGES.angles]);
                              addLog("Đã điền tự động 10 ảnh ngoại thất.", "success");
                            }}
                            className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-100 transition"
                          >
                            ⚡ Điền nhanh 10 góc
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {Array(10).fill(null).map((_, index) => {
                            const imgUrl = exteriorImages[index];
                            return (
                              <div 
                                key={index}
                                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm relative group"
                              >
                                {/* Thumbnail Frame */}
                                <div 
                                  onClick={() => {
                                    setCapturingSlotIndex(index);
                                    navigateTo('camera');
                                  }}
                                  className="aspect-[4/3] bg-slate-100 flex items-center justify-center cursor-pointer relative hover:opacity-90 transition"
                                >
                                  {imgUrl ? (
                                    <>
                                      <img src={imgUrl} alt={`Góc ${index + 1}`} className="w-full h-full object-cover" />
                                      {/* Success checkmark badge */}
                                      <div className="absolute bottom-2 left-2 bg-emerald-500 text-slate-950 p-0.5 rounded-full shadow-md">
                                        <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                                      </div>
                                    </>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center p-4 text-center">
                                      <Camera className="w-7 h-7 text-slate-400 mb-1" />
                                      <span className="text-[10px] text-slate-400 font-medium">Chưa chụp</span>
                                    </div>
                                  )}

                                  {/* Small Edit Pencil button at top right */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation(); // prevent triggering parent onClick
                                      setCapturingSlotIndex(index);
                                      navigateTo('camera');
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-slate-900/80 text-white hover:bg-slate-950 rounded-lg shadow transition border border-slate-700"
                                  >
                                    <Edit className="w-3 h-3 text-slate-100" />
                                  </button>
                                </div>
                                {/* Footer Label */}
                                <div className="py-1.5 px-3 bg-slate-50 border-t border-slate-100 text-center">
                                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                    {getAngleLabel(index)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Section 2: ẢNH BÊN TRONG */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">ẢNH BÊN TRONG (Nội thất)</h3>
                        
                        {interiorImage ? (
                          <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-[16/9]">
                            <img src={interiorImage} alt="Interior cont" className="w-full h-full object-cover" />
                            <button
                              onClick={() => setInteriorImage(null)}
                              className="absolute top-3 right-3 p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                              Xóa ảnh
                            </button>
                            <div className="absolute bottom-3 left-3 bg-emerald-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-bold">
                              ĐÃ CHỤP NỘI THẤT
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              // Simulate quick upload/capture of interior
                              setInteriorImage(CONTAINER_IMAGES.interiorEmpty);
                              addLog("Đã tải lên ảnh nội thất container.", "success");
                            }}
                            className="w-full aspect-[16/9] border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl bg-slate-50 flex flex-col items-center justify-center p-4 transition group"
                          >
                            <div className="w-10 h-10 rounded-full bg-slate-200 group-hover:bg-emerald-50 flex items-center justify-center transition">
                              <Camera className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                            </div>
                            <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-700 mt-2">CHỤP ẢNH BÊN TRONG</span>
                            <span className="text-[10px] text-slate-400 mt-1">Hỗ trợ định dạng JPG, PNG hoặc camera trực tiếp</span>
                          </button>
                        )}
                      </div>

                    </div>

                    {/* Bottom action wrapper */}
                    <div className="absolute bottom-16 left-0 right-0 p-3 bg-white border-t border-slate-200 z-10">
                      <button
                        onClick={() => navigateTo('step2')}
                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-bold text-sm tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 uppercase"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>TIẾP TỤC</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* ----------------- SCREEN: CUSTOM CAMERA SCREEN ----------------- */}
                {currentScreen === 'camera' && (
                  <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative select-none">
                    
                    {/* Camera Header */}
                    <div className="h-14 bg-slate-950/90 px-4 flex items-center justify-between flex-shrink-0 z-20 border-b border-slate-900">
                      <button 
                        onClick={() => navigateTo('step1')} 
                        className="p-1.5 hover:bg-slate-900 rounded-full text-slate-300"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="text-center">
                        <span className="text-xs font-black text-emerald-400 uppercase tracking-widest leading-none block">
                          CHỤP GÓC {capturingSlotIndex + 1}
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase block mt-0.5">
                          KIỂM TRA VỎ CONTAINER
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-slate-900 rounded-full text-slate-300">
                          <span className="text-xs font-bold font-mono">⚡</span>
                        </button>
                        <button 
                          onClick={() => setShowCameraGrid(!showCameraGrid)}
                          className={`p-1.5 rounded-full ${showCameraGrid ? 'text-emerald-400 bg-slate-900' : 'text-slate-400 hover:bg-slate-900'}`}
                        >
                          <span className="text-xs font-bold font-mono">#</span>
                        </button>
                      </div>
                    </div>

                    {/* Camera Viewfinder (Fullscreen container shot) */}
                    <div className="flex-1 relative bg-slate-950 overflow-hidden flex items-center justify-center">
                      <img 
                        src={CONTAINER_IMAGES.angles[capturingSlotIndex % CONTAINER_IMAGES.angles.length]} 
                        alt="Viewfinder Target" 
                        className="w-full h-full object-cover select-none" 
                      />

                      {/* Screen Flash Flash Overlay */}
                      {isFlashActive && (
                        <div className="absolute inset-0 bg-white z-40 transition-all duration-75"></div>
                      )}

                      {/* Target Overlays */}
                      {showCameraGrid && (
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
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

                      {/* Dotted Green alignment target box */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
                        <div className="w-[85%] h-[65%] border-2 border-dashed border-emerald-400/80 rounded-xl relative flex flex-col items-center justify-center">
                          {/* Text indicator */}
                          <div className="bg-slate-950/70 border border-slate-800 px-3 py-1 rounded-lg text-center backdrop-blur-xs select-none">
                            <span className="text-[10px] font-bold text-emerald-400 tracking-wider block">CĂN CHỈNH THEO</span>
                            <span className="text-[11px] font-black text-white tracking-widest block uppercase">KHUNG HÌNH</span>
                          </div>

                          {/* Live Dynamic Timestamp overlay bottom right of alignment box */}
                          <div className="absolute bottom-2 right-3 bg-slate-950/80 px-2 py-0.5 rounded text-[8px] font-mono text-slate-300">
                            24/05/2024 14:20:05
                          </div>
                        </div>
                      </div>

                      {/* Telemetry black overlay bar */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] bg-slate-950/90 rounded-full px-4 py-2 flex items-center justify-between text-xs border border-slate-800 backdrop-blur-md z-10">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="font-bold text-slate-300">LVL:</span>
                          <span className="font-mono text-emerald-400 font-bold">{telemetry.lvl.toFixed(2)}°</span>
                        </div>
                        <div className="w-px h-3 bg-slate-800"></div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-300">DST:</span>
                          <span className="font-mono text-emerald-400 font-bold">{telemetry.dst.toFixed(1)}m</span>
                        </div>
                      </div>

                    </div>

                    {/* Camera Control Panel (Bottom) */}
                    <div className="bg-slate-950 px-6 py-6 flex items-center justify-between flex-shrink-0 z-20 border-t border-slate-900">
                      
                      {/* Left: Gallery preview */}
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden border border-slate-700 shadow-lg">
                          <img src={CONTAINER_IMAGES.main} alt="Gallery thumb" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">THƯ VIỆN</span>
                      </div>

                      {/* Center: Large Shutter Button */}
                      <div className="relative flex items-center justify-center">
                        {/* Outer white ring */}
                        <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-0.5 bg-transparent cursor-pointer">
                          {/* Inner white solid button */}
                          <button 
                            onClick={triggerShutter}
                            className="w-full h-full rounded-full bg-white active:scale-95 transition-transform focus:outline-none"
                          >
                          </button>
                        </div>
                        <span className="absolute -bottom-5 text-[9px] text-emerald-400 font-black tracking-widest uppercase">CHỤP ẢNH</span>
                      </div>

                      {/* Right: Camera Facing Toggle */}
                      <button 
                        onClick={() => {
                          setCameraFacing(prev => prev === 'rear' ? 'front' : 'rear');
                          addLog(`Đổi camera: Sử dụng Camera ${cameraFacing === 'rear' ? 'TRƯỚC' : 'SAU'}`, "info");
                        }}
                        className="flex flex-col items-center text-slate-400 hover:text-white"
                      >
                        <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center transition">
                          <RefreshCw className="w-5 h-5 text-slate-300" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider mt-1">ĐỔI CAM</span>
                      </button>

                    </div>

                  </div>
                )}

                {/* ----------------- SCREEN: CONTAINER DETAIL STEP 2 (Form Info) ----------------- */}
                {currentScreen === 'step2' && (
                  <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                    {/* Header */}
                    <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <button onClick={() => navigateTo('step1')} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600">
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-base font-bold text-slate-900 m-0">Kiểm tra Container</h2>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                        Bước 2/2
                      </span>
                    </div>

                    {/* Stepper progress indicator */}
                    <div className="bg-white px-6 py-3 border-b border-slate-200 flex items-center justify-center flex-shrink-0">
                      <div className="flex items-center gap-2">
                        {/* Step 1 Complete */}
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-500 uppercase">HÌNH ẢNH GIÁM ĐỊNH</span>
                        </div>
                        {/* Connector line */}
                        <div className="w-8 h-0.5 bg-emerald-500"></div>
                        {/* Step 2 Active */}
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">2</div>
                          <span className="text-[11px] font-extrabold text-emerald-600 uppercase">THÔNG TIN CONTAINER</span>
                        </div>
                      </div>
                    </div>

                    {/* Form Layout */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 text-slate-800">
                      
                      {/* IN/OUT Tab Selection */}
                      <div className="flex items-center justify-center gap-8 bg-white py-3 rounded-xl border border-slate-200">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="radio" 
                            name="direction" 
                            value="IN"
                            checked={formData.direction === 'IN'} 
                            onChange={(e) => setFormData(prev => ({ ...prev, direction: e.target.value }))}
                            className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 border-slate-300"
                          />
                          <span className="text-sm font-black text-slate-900 tracking-wider">IN</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="radio" 
                            name="direction" 
                            value="OUT"
                            checked={formData.direction === 'OUT'} 
                            onChange={(e) => setFormData(prev => ({ ...prev, direction: e.target.value }))}
                            className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 border-slate-300"
                          />
                          <span className="text-sm font-black text-slate-900 tracking-wider">OUT</span>
                        </label>
                      </div>

                      {/* Input fields grid (2 columns) */}
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        
                        <div className="grid grid-cols-2 gap-3 text-left">
                          
                          {/* Container Number */}
                          <div className="col-span-2 md:col-span-1">
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                              * SỐ CONTAINER
                            </label>
                            <div className="relative">
                              <input 
                                type="text"
                                required
                                value={formData.containerNumber}
                                onChange={(e) => setFormData(prev => ({ ...prev, containerNumber: e.target.value.toUpperCase() }))}
                                placeholder="ID Container"
                                className="w-full pl-3 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 font-bold uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              />
                              <button
                                type="button"
                                onClick={triggerContainerScanner}
                                disabled={isScanning}
                                className="absolute right-1 top-1 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition border border-slate-200"
                                title="Quét OCR mã Container"
                              >
                                <Camera className="w-4 h-4 text-slate-700" />
                              </button>
                            </div>
                            
                            {isScanning && (
                              <span className="text-[10px] text-emerald-600 font-bold animate-pulse mt-0.5 block">
                                {scanMessage}
                              </span>
                            )}
                          </div>

                          {/* Inspection Date */}
                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                              * NGÀY GIÁM ĐỊNH
                            </label>
                            <input 
                              type="date"
                              required
                              value={formData.inspectionDate}
                              onChange={(e) => setFormData(prev => ({ ...prev, inspectionDate: e.target.value }))}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>

                          {/* PinCode */}
                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                              SỐ PINCODE
                            </label>
                            <input 
                              type="text"
                              value={formData.pincode}
                              onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                              placeholder="Nhập PinCode"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>

                          {/* Production Year */}
                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                              NĂM SẢN XUẤT
                            </label>
                            <div className="relative">
                              <select 
                                value={formData.productionYear}
                                onChange={(e) => setFormData(prev => ({ ...prev, productionYear: e.target.value }))}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                              >
                                <option value="2026">2026</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                              </select>
                              <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                            </div>
                          </div>

                          {/* Shipping Line */}
                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                              * HÃNG KT
                            </label>
                            <select 
                              value={formData.shippingLine}
                              onChange={(e) => setFormData(prev => ({ ...prev, shippingLine: e.target.value }))}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              <option value="MAERSK">MAERSK</option>
                              <option value="MSC">MSC</option>
                              <option value="COSCO">COSCO</option>
                              <option value="CMA CGM">CMA CGM</option>
                              <option value="ONE">ONE</option>
                            </select>
                          </div>

                          {/* Size */}
                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                              * KÍCH CỠ
                            </label>
                            <select 
                              value={formData.size}
                              onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              <option value="40' HC">40' HC</option>
                              <option value="20' GP">20' GP</option>
                              <option value="40' GP">40' GP</option>
                              <option value="45' HC">45' HC</option>
                            </select>
                          </div>

                          {/* Condition */}
                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                              TÌNH TRẠNG CONTAINER
                            </label>
                            <select 
                              value={formData.condition}
                              onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              <option value="Bình thường">Bình thường</option>
                              <option value="Móp méo">Móp méo</option>
                              <option value="Rách vách">Rách vách</option>
                              <option value="Thủng mái">Thủng mái</option>
                              <option value="Gỉ sét nặng">Gỉ sét nặng</option>
                            </select>
                          </div>

                          {/* Classification */}
                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                              * PHÂN LOẠI CONT
                            </label>
                            <select 
                              value={formData.classification}
                              onChange={(e) => setFormData(prev => ({ ...prev, classification: e.target.value }))}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              <option value="Loại A">Loại A</option>
                              <option value="Loại B">Loại B</option>
                              <option value="Loại C">Loại C</option>
                            </select>
                          </div>

                        </div>

                        {/* Cleaning Options */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 text-left">
                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                            * VỆ SINH CONTAINER
                          </label>
                          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                            {['VE SINH NUOC', 'VE SINH HOA CHAT', 'KHONG VE SINH'].map((opt) => {
                              const isActive = formData.cleaningType === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, cleaningType: opt }))}
                                  className={`flex-1 py-2 text-[10px] font-extrabold tracking-wide uppercase transition ${
                                    isActive 
                                      ? 'bg-slate-950 text-white' 
                                      : 'bg-white text-slate-650 hover:bg-slate-50 border-r border-slate-150 last:border-r-0'
                                  }`}
                                >
                                  {opt.replace(/_/g, ' ')}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Deposit fee */}
                        <div className="text-left">
                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                            TIỀN CƯỢC (VNĐ)
                          </label>
                          <input 
                            type="text"
                            value={formData.depositFee}
                            onChange={(e) => setFormData(prev => ({ ...prev, depositFee: e.target.value }))}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        {/* Notes */}
                        <div className="text-left">
                          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                            GHI CHÚ GIÁM ĐỊNH
                          </label>
                          <textarea 
                            rows="2"
                            value={formData.notes}
                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Nhập ghi chú chi tiết nếu có..."
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          ></textarea>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-black text-sm tracking-wider rounded-lg transition-colors shadow-lg shadow-emerald-500/20 uppercase"
                          >
                            GỬI BÁO CÁO
                          </button>
                        </div>

                      </form>

                    </div>
                  </div>
                )}

                {/* ----------------- SCREEN: SUCCESS PAGE ----------------- */}
                {currentScreen === 'success' && (
                  <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                    {/* Header */}
                    <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600">
                          <Menu className="w-5 h-5" />
                        </button>
                        <h2 className="text-base font-bold text-slate-900 m-0">Container Inspection</h2>
                      </div>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600">
                        <Bell className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content body */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-20 text-slate-800 text-center">
                      
                      {/* Checkmark badge */}
                      <div className="flex justify-center pt-4">
                        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 ready-glow">
                          <Check className="w-9 h-9 text-slate-950 stroke-[3]" />
                        </div>
                      </div>

                      {/* Header message */}
                      <div>
                        <h3 className="text-lg font-black text-slate-950 m-0">Gửi báo cáo thành công!</h3>
                        <p className="text-xs text-slate-500 mt-1.5 max-w-xs mx-auto">
                          Hồ sơ giám định cho container ID: <span className="font-extrabold text-slate-900">{formData.containerNumber || 'MAEU1234567'}</span> đã được hệ thống ghi nhận và lưu trữ.
                        </p>
                      </div>

                      {/* Summary Card */}
                      <div className="bg-white rounded-xl border border-slate-200 p-4 text-left shadow-sm relative">
                        <span className="absolute top-4 right-4 bg-emerald-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                          READY
                        </span>
                        
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">TÓM TẮT THÔNG TIN</h4>
                        
                        <div className="space-y-1.5 text-xs text-slate-600">
                          <div className="flex justify-between">
                            <span>Container ID:</span>
                            <span className="font-bold text-slate-900">{formData.containerNumber || 'MAEU1234567'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hoàn thành:</span>
                            <span className="font-mono font-medium text-slate-900">
                              {currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - {currentTime.toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-slate-900 font-medium">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <span>Giám định viên: Nguyễn Văn An (ID: 8821)</span>
                          </div>
                        </div>
                      </div>

                      {/* Yard Depot preview Image */}
                      <div className="rounded-xl overflow-hidden aspect-video border border-slate-200 shadow-inner">
                        <img 
                          src={CONTAINER_IMAGES.yard} 
                          alt="Yard overview" 
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      {/* Vertical Button Group */}
                      <div className="space-y-2 pt-2">
                        
                        <button
                          onClick={() => {
                            // Find or create current detail
                            const detailObj = {
                              id: formData.containerNumber || 'MAEU1234567',
                              time: new Date().toLocaleTimeString(),
                              inspector: "Nguyễn Văn An (ID: 8821)",
                              details: { ...formData },
                              exteriorImages: [...exteriorImages],
                              interiorImage: interiorImage
                            };
                            setActiveReportDetail(detailObj);
                          }}
                          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
                        >
                          <Eye className="w-4 h-4 text-slate-950" />
                          <span>XEM BÁO CÁO CHI TIẾT</span>
                        </button>

                        <button
                          onClick={resetInspection}
                          className="w-full py-3 bg-white hover:bg-slate-50 border-2 border-dashed border-emerald-500 text-emerald-800 font-bold text-xs tracking-wider rounded-lg transition"
                        >
                          <Plus className="w-4 h-4 inline-block mr-1 text-emerald-600 stroke-[2.5]" />
                          <span>GIÁM ĐỊNH LƯỢT MỚI</span>
                        </button>

                        <button
                          onClick={() => navigateTo('home')}
                          className="text-xs text-slate-500 hover:text-slate-900 underline block w-full text-center py-2"
                        >
                          Về trang chủ
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* ----------------- SCREEN: PROFILE / PERSONAL TAB ----------------- */}
                {currentScreen === 'profile' && (
                  <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden text-slate-800">
                    
                    {/* Header */}
                    <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <button onClick={() => navigateTo('home')} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600">
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-base font-bold text-slate-900 m-0">Hồ sơ cá nhân</h2>
                      </div>
                      <button onClick={logout} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg" title="Đăng xuất">
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Profile body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
                      
                      {/* Avatar Profile Card */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow">
                          AN
                        </div>
                        <div className="text-left">
                          <h3 className="text-base font-black text-slate-900 leading-none">Nguyễn Văn An</h3>
                          <p className="text-xs text-slate-500 mt-1">Mã NV: ID_8821</p>
                          <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded mt-1">
                            Bãi Cảng Depot 04
                          </span>
                        </div>
                      </div>

                      {/* Statistics dashboard */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-left">
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase">ĐÃ DUYỆT HÔM NAY</span>
                          <span className="block text-2xl font-black text-slate-900 mt-1">12</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-left">
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase">TỶ LỆ LỖI PHÁT HIỆN</span>
                          <span className="block text-2xl font-black text-red-500 mt-1">8.3%</span>
                        </div>
                      </div>

                      {/* Submitted Reports History list */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-left">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">LỊCH SỬ GIÁM ĐỊNH GẦN ĐÂY</h4>
                        
                        {submittedReports.length === 0 ? (
                          <div className="py-6 text-center text-slate-400 text-xs">
                            Chưa có báo cáo nào được nộp trong ca làm việc.
                          </div>
                        ) : (
                          <div className="divide-y divide-slate-100">
                            {submittedReports.map((rep, idx) => (
                              <div 
                                key={idx}
                                onClick={() => setActiveReportDetail(rep)}
                                className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
                              >
                                <div>
                                  <span className="font-bold text-slate-900 block text-xs">{rep.id}</span>
                                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{rep.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                    {rep.imagesCount} ảnh
                                  </span>
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Log out button */}
                      <button
                        onClick={logout}
                        className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg transition border border-red-200"
                      >
                        ĐĂNG XUẤT KHỎI THIẾT BỊ
                      </button>

                    </div>
                  </div>
                )}

              </div>

              {/* TABLET BOTTOM NAVIGATION TAB BAR */}
              {isLoggedIn && currentScreen !== 'camera' && (
                <div className="h-16 bg-white border-t border-slate-200 flex items-center justify-around flex-shrink-0 z-20 select-none">
                  {/* Tab 1: Giám sát */}
                  <button
                    onClick={() => navigateTo('home')}
                    className={`flex flex-col items-center justify-center w-20 h-full transition ${
                      activeTab === 'giamsat' ? 'text-slate-900 border-t-2 border-slate-900' : 'text-slate-400 hover:text-slate-650'
                    }`}
                  >
                    <Sliders className="w-5 h-5" />
                    <span className="text-[10px] font-bold mt-1">Giám sát</span>
                  </button>

                  {/* Tab 2: Kiểm tra (Scan button index) */}
                  <button
                    onClick={() => {
                      if (exteriorImages.some(img => img !== null) || interiorImage) {
                        navigateTo('step1');
                      } else {
                        navigateTo('step1');
                      }
                    }}
                    className={`flex flex-col items-center justify-center w-20 h-full transition ${
                      activeTab === 'kiemtra' ? 'text-slate-900 border-t-2 border-slate-900 bg-slate-50' : 'text-slate-400 hover:text-slate-650'
                    }`}
                  >
                    <div className="p-1 rounded-lg">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold mt-1">Kiểm tra</span>
                  </button>

                  {/* Tab 3: Cá nhân */}
                  <button
                    onClick={() => navigateTo('profile')}
                    className={`flex flex-col items-center justify-center w-20 h-full transition ${
                      activeTab === 'canhan' ? 'text-slate-900 border-t-2 border-slate-900' : 'text-slate-400 hover:text-slate-650'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-[10px] font-bold mt-1">Cá nhân</span>
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Control Hub & System Console Logs (4/12 width in desktop) */}
        <div className="lg:col-span-4 space-y-6 w-full text-left">
          
          {/* Developer Control Hub panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3 text-emerald-400">
              <Sliders className="w-5 h-5" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider m-0">Interactive Hub</h2>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Dùng các phím tắt và tuỳ chọn dưới đây để kiểm thử toàn bộ các màn hình và trạng thái của ứng dụng giả lập tablet.
            </p>

            {/* Quick jump menu */}
            <div className="space-y-2 mb-4">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nhảy nhanh màn hình</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Login Screen', key: 'login' },
                  { name: 'Home View', key: 'home' },
                  { name: 'Step 1 (Images)', key: 'step1' },
                  { name: 'Custom Camera', key: 'camera' },
                  { name: 'Step 2 (Form)', key: 'step2' },
                  { name: 'Success Page', key: 'success' },
                  { name: 'Inspector Tab', key: 'profile' },
                ].map((sc) => {
                  const isActive = currentScreen === sc.key;
                  return (
                    <button
                      key={sc.key}
                      onClick={() => {
                        if (sc.key === 'camera') {
                          setCapturingSlotIndex(0);
                        }
                        if (sc.key !== 'login') {
                          setIsLoggedIn(true);
                        }
                        navigateTo(sc.key);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-left text-xs font-semibold transition ${
                        isActive 
                          ? 'bg-emerald-500 text-slate-950 font-bold' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {sc.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated actions */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mock Actions & Tests</span>
              
              <div className="flex flex-col gap-2">
                {/* Trigger a fault camera */}
                <button
                  onClick={() => {
                    setCameras(prev => prev.map(c => c.id === 4 ? { ...c, status: c.status === 'active' ? 'offline' : 'active' } : c));
                    addLog("DEV: Tải lại tín hiệu camera CAM 4...", "info");
                  }}
                  className="w-full text-left px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-between border border-slate-700"
                >
                  <span>Toggle CAM 4 Connection (Live View)</span>
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Clear inspection data */}
                <button
                  onClick={() => {
                    setExteriorImages(Array(10).fill(null));
                    setInteriorImage(null);
                    setFormData({ ...INITIAL_FORM });
                    addLog("DEV: Xoá trắng toàn bộ dữ liệu đang kiểm định.", "warning");
                    alert("Đã xoá sạch dữ liệu kiểm định hiện tại!");
                  }}
                  className="w-full text-left px-3 py-2 bg-red-950/20 hover:bg-red-900/20 text-red-400 text-xs font-semibold rounded-lg flex items-center justify-between border border-red-900/50"
                >
                  <span>Đặt lại dữ liệu trắng (Clear Data)</span>
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* REALTIME SYSTEM EVENT LOGS (Industrial style terminal) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-[280px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <Clock className="w-5 h-5" />
                <h2 className="text-base font-bold text-white uppercase tracking-wider m-0 font-mono">System Console</h2>
              </div>
              <button 
                onClick={() => setSystemLogs([])}
                className="text-[10px] text-slate-500 hover:text-slate-300 font-bold uppercase tracking-wider"
              >
                Clear logs
              </button>
            </div>

            {/* Log list */}
            <div className="flex-1 bg-slate-950 rounded-xl p-3 border border-slate-850 overflow-y-auto font-mono text-[10px] space-y-1.5">
              {systemLogs.map((log, index) => {
                let colorClass = 'text-slate-400';
                if (log.type === 'success') colorClass = 'text-emerald-400';
                if (log.type === 'warning') colorClass = 'text-yellow-400';
                if (log.type === 'error') colorClass = 'text-red-400';

                return (
                  <div key={index} className="leading-relaxed">
                    <span className="text-slate-650 mr-1.5">[{log.time}]</span>
                    <span className={colorClass}>{log.message}</span>
                  </div>
                );
              })}
              <div ref={logsEndRef}></div>
            </div>
            <div className="mt-2 text-[9px] text-slate-500 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Hệ thống hoạt động ổn định.</span>
            </div>
          </div>

        </div>

      </div>

      {/* FULLSCREEN MODALS OR GLOBAL SIMULATED OVERLAYS */}
      
      {/* 1. Camera Grid Modal ("Xem tất cả") */}
      {camGridAllOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-2xl w-full text-slate-100">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider">Hệ thống Camera Bến Bãi</h3>
                <p className="text-xs text-slate-400">Xem trực tiếp feed 10 camera giám định thời gian thực</p>
              </div>
              <button 
                onClick={() => setCamGridAllOpen(false)}
                className="p-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
              >
                Đóng
              </button>
            </div>

            {/* 10 cameras layout */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-h-[350px] overflow-y-auto pr-1">
              {cameras.map((cam) => (
                <div key={cam.id} className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex flex-col">
                  <div className="aspect-video relative bg-slate-950 flex items-center justify-center">
                    {cam.status === 'offline' ? (
                      <CameraOff className="w-6 h-6 text-slate-700" />
                    ) : cam.status === 'fault' ? (
                      <div className="absolute inset-0 bg-red-950/40 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                      </div>
                    ) : (
                      <img src={cam.url || CONTAINER_IMAGES.main} alt={cam.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-2 flex items-center justify-between bg-slate-900">
                    <span className="text-xs font-bold font-mono">{cam.name}</span>
                    {getCameraStatusBadge(cam.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Detailed Report Modal ("Xem báo cáo chi tiết") */}
      {activeReportDetail && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full text-slate-100 flex flex-col overflow-hidden max-h-[90vh]">
            
            {/* Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-850 flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider">HỒ SƠ BÁO CÁO GIÁM ĐỊNH</h3>
                <p className="text-xs text-slate-400">Chi tiết thông tin kỹ thuật container và hình ảnh giám định</p>
              </div>
              <button 
                onClick={() => setActiveReportDetail(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-white rounded-lg transition text-xs font-bold"
              >
                Đóng
              </button>
            </div>

            {/* Scrollable Report Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Core Details metadata grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Số Container</span>
                  <span className="text-sm font-black text-emerald-400 block mt-0.5">{activeReportDetail.id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Ngày giám định</span>
                  <span className="text-xs text-slate-200 block mt-1">{activeReportDetail.details.inspectionDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Hãng khai thác</span>
                  <span className="text-xs text-slate-200 block mt-1">{activeReportDetail.details.shippingLine}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Kích cỡ</span>
                  <span className="text-xs text-slate-200 block mt-1">{activeReportDetail.details.size}</span>
                </div>
              </div>

              {/* Technical features table */}
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2.5">CHI TIẾT KỸ THUẬT</h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs border-t border-slate-800 pt-3">
                  <div className="flex justify-between py-1 border-b border-slate-850">
                    <span className="text-slate-400">Hướng xuất/nhập:</span>
                    <span className="font-bold text-slate-200">{activeReportDetail.details.direction}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-850">
                    <span className="text-slate-400">Số PinCode:</span>
                    <span className="font-bold text-slate-200">{activeReportDetail.details.pincode || 'Không có'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-850">
                    <span className="text-slate-400">Năm sản xuất:</span>
                    <span className="font-bold text-slate-200">{activeReportDetail.details.productionYear}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-850">
                    <span className="text-slate-400">Tình trạng vỏ:</span>
                    <span className="font-bold text-slate-200">{activeReportDetail.details.condition}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-850">
                    <span className="text-slate-400">Phân loại:</span>
                    <span className="font-bold text-slate-200">{activeReportDetail.details.classification}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-850">
                    <span className="text-slate-400">Phương án vệ sinh:</span>
                    <span className="font-bold text-slate-200">{activeReportDetail.details.cleaningType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-850 col-span-2">
                    <span className="text-slate-400">Tiền cược vỏ:</span>
                    <span className="font-bold text-slate-250 text-emerald-400">{activeReportDetail.details.depositFee}</span>
                  </div>
                  <div className="col-span-2 pt-2 text-left">
                    <span className="text-slate-400 block mb-1">Ghi chú giám định:</span>
                    <p className="bg-slate-950 p-2.5 rounded-lg text-slate-300 border border-slate-850 text-xs">
                      {activeReportDetail.details.notes || 'Không có ghi chú thêm.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Angle images list */}
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2.5">
                  ẢNH CHỤP GIÁM ĐỊNH ({activeReportDetail.imagesCount} ảnh)
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-t border-slate-800 pt-3">
                  {activeReportDetail.exteriorImages.map((img, idx) => (
                    <div key={idx} className="bg-slate-950 rounded-lg overflow-hidden border border-slate-850">
                      <div className="aspect-[4/3] bg-slate-900">
                        {img ? (
                          <img src={img} alt={`Góc ${idx + 1}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-650 text-[10px]">
                            Trống
                          </div>
                        )}
                      </div>
                      <div className="p-1 bg-slate-900 text-center text-[8px] font-bold text-slate-400">
                        Góc {idx + 1}
                      </div>
                    </div>
                  ))}

                  {/* Interior image */}
                  <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-850">
                    <div className="aspect-[4/3] bg-slate-900">
                      {activeReportDetail.interiorImage ? (
                        <img src={activeReportDetail.interiorImage} alt="Interior detail" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-650 text-[10px]">
                          Trống
                        </div>
                      )}
                    </div>
                    <div className="p-1 bg-slate-900 text-center text-[8px] font-bold text-slate-400">
                      Nội thất
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="p-4 bg-slate-950 border-t border-slate-850 flex justify-end gap-2">
              <button 
                onClick={() => {
                  alert("Tính năng in báo cáo PDF đang được phát triển.");
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg transition"
              >
                In báo cáo (PDF)
              </button>
              <button 
                onClick={() => setActiveReportDetail(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg transition"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
