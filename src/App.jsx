import React, { useState, useEffect } from 'react';

// Import Components

import BottomTabs from './components/BottomTabs';
import LoginScreen from './components/LoginScreen';
import MonitorScreen from './components/MonitorScreen';
import Step1Screen from './components/Step1Screen';
import Step2Screen from './components/Step2Screen';
import SuccessScreen from './components/SuccessScreen';
import ProfileScreen from './components/ProfileScreen';
import CameraScreen from './components/CameraScreen';
import CameraOverviewModal from './components/CameraOverviewModal';
import ReportDetailModal from './components/ReportDetailModal';
import ImageEditScreen from './components/ImageEditScreen';

// Pre-defined Container Images from Unsplash for realistic mockup
const CONTAINER_IMAGES = {
  main: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
  yard: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  port: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80",
  warehouse: "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=800&q=80",
  interiorEmpty: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
  cams: [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=200&q=80",
    "",
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=200&q=80",
  ],
  angles: [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=400&q=80",
  ]
};

const INITIAL_FORM = {
  direction: 'IN',
  containerNumber: '',
  inspectionDate: new Date().toISOString().split('T')[0],
  pincode: '',
  productionYear: '',
  shippingLine: '',
  size: '',
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


  // Login States
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('vtos2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Camera & Image Collection States
  const [selectedCam, setSelectedCam] = useState(4); // default active CAM 4
  const [camGridAllOpen, setCamGridAllOpen] = useState(false);
  const [cameras] = useState([
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

  // Stepper Image slots
  const [exteriorImages, setExteriorImages] = useState(Array(10).fill(null));
  const [interiorImages, setInteriorImages] = useState([]); // Multiple interior images support

  // Custom camera parameters
  const [capturingSlotIndex, setCapturingSlotIndex] = useState(null);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [showCameraGrid, setShowCameraGrid] = useState(true);
  const [cameraFacing, setCameraFacing] = useState('rear'); // rear, front

  // Image editing parameters
  const [editingImage, setEditingImage] = useState(null); // { slot, url, type, label }

  // Form Details (Step 2)
  const [formData, setFormData] = useState({ ...INITIAL_FORM });

  // Reports database / history list
  const [submittedReports, setSubmittedReports] = useState([]);
  const [activeReportDetail, setActiveReportDetail] = useState(null);

  // System settings




  // Navigation Helper
  const navigateTo = (screenName, customReportDetail = null) => {
    if (customReportDetail) {
      setActiveReportDetail(customReportDetail);
    }
    setCurrentScreen(screenName);
    if (screenName === 'home') setActiveTab('giamsat');
    if (screenName === 'step1' || screenName === 'step2' || screenName === 'camera' || screenName === 'success' || screenName === 'edit-image') {
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
    if (username === 'admin' && password === 'vtos2026') {
      setIsLoggedIn(true);
      setLoginError('');
      navigateTo('home');
    } else {
      setLoginError('Tài khoản hoặc mật khẩu không đúng.');
    }
  };

  // Handle container number input and auto-fill pincode and shippingLine
  const handleContainerNumberChange = (val, otherFields = {}) => {
    const uppercaseVal = (val || '').toUpperCase();
    setFormData(prev => {
      const updated = { ...prev, ...otherFields, containerNumber: uppercaseVal };

      // If val is empty, clear pincode and shippingLine
      if (!uppercaseVal) {
        updated.pincode = '';
        updated.shippingLine = '';
      } else {
        // Auto-fill shipping line based on prefix as soon as 2 characters are typed
        if (uppercaseVal.length >= 2) {
          const prefix = uppercaseVal.substring(0, 4);
          let shippingLine = 'MAERSK'; // Default fallback if unrecognized
          if (prefix.startsWith('MAE') || prefix.startsWith('MSK') || prefix.startsWith('MA')) shippingLine = 'MAERSK';
          else if (prefix.startsWith('MSC') || prefix.startsWith('MS')) shippingLine = 'MSC';
          else if (prefix.startsWith('COS') || prefix.startsWith('CO')) shippingLine = 'COSCO';
          else if (prefix.startsWith('CMA') || prefix.startsWith('CM')) shippingLine = 'CMA CGM';
          else if (prefix.startsWith('ONE') || prefix.startsWith('ON')) shippingLine = 'ONE';

          updated.shippingLine = shippingLine;
        }

        if (uppercaseVal.length >= 4) {
          // Auto-fill pincode if empty
          if (!updated.pincode || (updated.pincode.startsWith('PIN-') && updated.pincode.length <= 4) || updated.pincode === '') {
            const digits = uppercaseVal.replace(/[^0-9]/g, '');
            updated.pincode = 'PIN-' + (digits || Math.floor(100000 + Math.random() * 900000));
          }
        }
      }

      return updated;
    });
  };

  // Capture photos in simulated camera
  const triggerShutter = (customUrl) => {
    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 200);

    setTimeout(() => {
      if (typeof capturingSlotIndex === 'string' && capturingSlotIndex.startsWith('interior')) {
        const finalImg = (typeof customUrl === 'string') ? customUrl : CONTAINER_IMAGES.interiorEmpty;
        if (capturingSlotIndex === 'interior-new') {
          setInteriorImages(prev => [...prev, finalImg]);
        } else {
          const idx = parseInt(capturingSlotIndex.split('-')[1]);
          setInteriorImages(prev => {
            const updated = [...prev];
            updated[idx] = finalImg;
            return updated;
          });
        }
      } else {
        const finalImg = (typeof customUrl === 'string') ? customUrl : CONTAINER_IMAGES.angles[capturingSlotIndex % CONTAINER_IMAGES.angles.length];
        const newImages = [...exteriorImages];
        newImages[capturingSlotIndex] = finalImg;
        setExteriorImages(newImages);
      }
      navigateTo('step1');
    }, 350);
  };

  const startInspection = () => {
    setExteriorImages([...CONTAINER_IMAGES.angles]);
    setInteriorImages([]);
    setFormData({
      ...INITIAL_FORM,
      containerNumber: ''
    });
    navigateTo('step1');
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.containerNumber) {
      alert("Vui lòng điền SỐ CONTAINER!");
      return;
    }
    if (!formData.shippingLine) {
      alert("Vui lòng chọn HÃNG KHAI THÁC!");
      return;
    }
    if (!formData.size) {
      alert("Vui lòng chọn KÍCH CỠ!");
      return;
    }
    if (!formData.productionYear) {
      alert("Vui lòng chọn NĂM SẢN XUẤT!");
      return;
    }

    const reportId = formData.containerNumber;
    const completedTime = `${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - ${new Date().toLocaleDateString('vi-VN')}`;

    const newReport = {
      id: reportId,
      time: completedTime,
      inspector: "Nguyễn Văn An (ID: 8821)",
      imagesCount: exteriorImages.filter(x => x !== null).length + interiorImages.length,
      details: { ...formData },
      exteriorImages: [...exteriorImages],
      interiorImages: [...interiorImages],
      interiorImage: interiorImages[0] || null
    };

    setSubmittedReports(prev => [newReport, ...prev]);
    navigateTo('success');
  };



  const logout = () => {
    setIsLoggedIn(false);
    setUsername('admin');
    setPassword('vtos2026');
    setExteriorImages(Array(10).fill(null));
    setInteriorImages([]);
    setFormData({ ...INITIAL_FORM });
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
        return <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded animate-pulse">ACTIVE</span>;
      case 'fault':
        return <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">FAULT</span>;
      case 'offline':
        return <span className="bg-gray-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">OFFLINE</span>;
      default:
        return <span className="bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">ONLINE</span>;
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-100 flex justify-center items-center overflow-hidden">
      <div className="h-full w-full max-w-[550px] bg-slate-50 flex flex-col overflow-hidden select-none relative md:shadow-2xl md:border-x md:border-slate-200">

        {/* VIEWPORT CLIENT */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 relative">

          {/* SCREEN: LOGIN */}
          {currentScreen === 'login' && (
            <LoginScreen
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleLogin={handleLogin}
              loginError={loginError}
            />
          )}

          {/* SCREEN: HOME (Giám sát) */}
          {currentScreen === 'home' && (
            <MonitorScreen
              cameras={cameras}
              selectedCam={selectedCam}
              setSelectedCam={setSelectedCam}
              setCamGridAllOpen={setCamGridAllOpen}
              CONTAINER_IMAGES={CONTAINER_IMAGES}
              startInspection={startInspection}
            />
          )}

          {/* SCREEN: STEP 1 (Exterior images) */}
          {currentScreen === 'step1' && (
            <Step1Screen
              exteriorImages={exteriorImages}
              setExteriorImages={setExteriorImages}
              interiorImages={interiorImages}
              setInteriorImages={setInteriorImages}
              setCapturingSlotIndex={setCapturingSlotIndex}
              navigateTo={navigateTo}
              getAngleLabel={getAngleLabel}
              CONTAINER_IMAGES={CONTAINER_IMAGES}
              setEditingImage={setEditingImage}
            />
          )}

          {/* SCREEN: CUSTOM CAMERA */}
          {currentScreen === 'camera' && (
            <CameraScreen
              capturingSlotIndex={capturingSlotIndex}
              showCameraGrid={showCameraGrid}
              setShowCameraGrid={setShowCameraGrid}
              isFlashActive={isFlashActive}
              triggerShutter={triggerShutter}
              cameraFacing={cameraFacing}
              setCameraFacing={setCameraFacing}
              navigateTo={navigateTo}
              CONTAINER_IMAGES={CONTAINER_IMAGES}
            />
          )}

          {/* SCREEN: STEP 2 (Form Info) */}
          {currentScreen === 'step2' && (
            <Step2Screen
              formData={formData}
              handleContainerNumberChange={handleContainerNumberChange}
              handleFormSubmit={handleFormSubmit}
              navigateTo={navigateTo}
            />
          )}

          {/* SCREEN: UPLOAD SUCCESS */}
          {currentScreen === 'success' && (
            <SuccessScreen
              formData={formData}
              navigateTo={navigateTo}
              exteriorImages={exteriorImages}
              interiorImages={interiorImages}
            />
          )}

          {/* SCREEN: PROFILE & DEVICE SETTINGS */}
          {currentScreen === 'profile' && (
            <ProfileScreen
              username={username}
              submittedReports={submittedReports}
              setActiveReportDetail={setActiveReportDetail}
              logout={logout}
              navigateTo={navigateTo}
            />
          )}

          {/* SCREEN: IMAGE EDITOR */}
          {currentScreen === 'edit-image' && editingImage && (
            <ImageEditScreen
              editingImageUrl={editingImage.url}
              slotLabel={editingImage.label}
              onBack={() => {
                setEditingImage(null);
                navigateTo('step1');
              }}
              onRetake={() => {
                setCapturingSlotIndex(editingImage.slot);
                navigateTo('camera');
              }}
              onSave={(editParams) => {
                const originalUrl = editingImage.url;
                const editedUrl = originalUrl + (originalUrl.includes('?') ? '&' : '?') + `edited=true&rotation=${editParams.rotation}&flip=${editParams.isFlipped}&aspect=${editParams.aspectRatio}`;

                if (editingImage.type === 'exterior') {
                  const updated = [...exteriorImages];
                  updated[editingImage.slot] = editedUrl;
                  setExteriorImages(updated);
                } else {
                  const updated = [...interiorImages];
                  // editingImage.slot format: "interior-idx"
                  const idxStr = String(editingImage.slot).split('-')[1];
                  const idx = parseInt(idxStr, 10);
                  if (!isNaN(idx)) {
                    updated[idx] = editedUrl;
                    setInteriorImages(updated);
                  }
                }
                setEditingImage(null);
                navigateTo('step1');
              }}
            />
          )}

          {/* SCREEN: REPORT DETAIL */}
          {currentScreen === 'report-detail' && activeReportDetail && (
            <ReportDetailModal
              activeReportDetail={activeReportDetail}
              setActiveReportDetail={setActiveReportDetail}
              navigateTo={navigateTo}
            />
          )}

        </div>

        {/* BOTTOM TABS */}
        <BottomTabs
          isLoggedIn={isLoggedIn}
          currentScreen={currentScreen}
          activeTab={activeTab}
          navigateTo={navigateTo}
          startInspection={startInspection}
        />

        {/* 1. Camera Overview Modal */}
        <CameraOverviewModal
          camGridAllOpen={camGridAllOpen}
          setCamGridAllOpen={setCamGridAllOpen}
          cameras={cameras}
          getCameraStatusBadge={getCameraStatusBadge}
          CONTAINER_IMAGES={CONTAINER_IMAGES}
        />



      </div>
    </div>
  );
}

export default App;
