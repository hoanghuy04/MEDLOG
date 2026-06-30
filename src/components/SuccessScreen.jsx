import React from 'react';
import { Check } from 'lucide-react';

export default function SuccessScreen({
  formData,
  navigateTo,
  exteriorImages,
  interiorImages = []
}) {
  const imagesCount = exteriorImages.filter(Boolean).length + interiorImages.length;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
        <h2 className="text-base font-bold text-slate-900 m-0">Hoàn tất Giám định</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-20 text-slate-850 text-center">
        
        <div className="flex justify-center pt-4">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 ready-glow">
            <Check className="w-9 h-9 text-slate-950 stroke-[3]" />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-black text-slate-900">GỬI BÁO CÁO THÀNH CÔNG!</h3>
          <p className="text-xs text-slate-400">Dữ liệu giám định đã được đồng bộ lên hệ thống Medlog</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-left">
          <span className="inline-block bg-emerald-100 text-emerald-800 text-[8px] font-black px-1.5 py-0.5 rounded mb-3 uppercase tracking-wider">
            READY
          </span>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">TÓM TẮT THÔNG TIN</h4>
          
          <div className="space-y-1.5 text-xs text-slate-650">
            <div className="flex justify-between">
              <span>Container ID:</span>
              <span className="font-bold text-slate-900 font-mono">{formData.containerNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Hãng tàu / Kích cỡ:</span>
              <span className="font-bold text-slate-900">{formData.shippingLine} / {formData.size}</span>
            </div>
            <div className="flex justify-between">
              <span>Phân loại:</span>
              <span className="font-bold text-slate-900">{formData.classification} - {formData.condition}</span>
            </div>
            <div className="flex justify-between">
              <span>Phương án vệ sinh:</span>
              <span className="font-bold text-slate-900">{formData.cleaningType.replace(/_/g, ' ')}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-1.5 mt-1.5">
              <span>Ảnh giám định ngoại thất:</span>
              <span className="font-bold text-slate-900">{exteriorImages.filter(Boolean).length} / 10 ảnh</span>
            </div>
            <div className="flex justify-between">
              <span>Ảnh nội thất đã chụp:</span>
              <span className="font-bold text-slate-900">{interiorImages.length} ảnh</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              const repId = formData.containerNumber;
              const completedTime = `${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - ${new Date().toLocaleDateString('vi-VN')}`;
              
              // We trigger viewing the report detail
              const currentReport = {
                id: repId,
                time: completedTime,
                imagesCount: imagesCount,
                exteriorImages: [...exteriorImages],
                interiorImage: interiorImages[0] || null, // default first interior
                interiorImages: [...interiorImages],
                details: { ...formData }
              };
              navigateTo('profile', currentReport);
            }}
            className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition uppercase tracking-wider"
          >
            Xem báo cáo chi tiết
          </button>
          
          <button
            onClick={() => navigateTo('home')}
            className="w-full py-2.5 bg-slate-200 hover:bg-slate-250 text-slate-800 font-bold text-xs rounded-lg transition uppercase tracking-wider"
          >
            Quay về Giám sát
          </button>
        </div>

      </div>
    </div>
  );
}
