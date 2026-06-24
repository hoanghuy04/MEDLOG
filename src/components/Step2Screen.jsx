import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Step2Screen({
  formData,
  handleContainerNumberChange,
  handleFormSubmit,
  navigateTo
}) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
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

      {/* Stepper */}
      <div className="bg-white px-6 py-3 border-b border-slate-200 flex items-center justify-center flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">1</div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase">HÌNH ẢNH GIÁM ĐỊNH</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-350"></div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">2</div>
            <span className="text-[10px] font-extrabold text-emerald-600 uppercase">THÔNG TIN CONTAINER</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 text-slate-800">

        <form onSubmit={handleFormSubmit} className="space-y-4">

          <div className="grid grid-cols-2 gap-3 text-left">

            <div className="col-span-2">
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                * SỐ CONTAINER
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.containerNumber}
                  onChange={(e) => handleContainerNumberChange(e.target.value.toUpperCase())}
                  placeholder="Ví dụ: MAEU1234567"
                  className="w-full px-3 py-2 bg-white border border-slate-250 rounded-lg text-sm text-slate-950 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                * NGÀY GIÁM ĐỊNH
              </label>
              <input
                type="date"
                required
                value={formData.inspectionDate}
                onChange={(e) => handleContainerNumberChange(formData.containerNumber, { inspectionDate: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                SỐ PINCODE
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleContainerNumberChange(formData.containerNumber, { pincode: e.target.value })}
                placeholder="Nhập mã pin..."
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                NĂM SẢN XUẤT
              </label>
              <select
                required
                value={formData.productionYear}
                onChange={(e) => handleContainerNumberChange(formData.containerNumber, { productionYear: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Chọn năm --</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                * HÃNG KT
              </label>
              <select
                required
                value={formData.shippingLine}
                onChange={(e) => handleContainerNumberChange(formData.containerNumber, { shippingLine: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none"
              >
                <option value="">-- Chọn hãng --</option>
                <option value="MAERSK">MAERSK</option>
                <option value="MSC">MSC</option>
                <option value="CMA CGM">CMA CGM</option>
                <option value="COSCO">COSCO</option>
                <option value="ONE">ONE</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                * KÍCH CỠ
              </label>
              <select
                required
                value={formData.size}
                onChange={(e) => handleContainerNumberChange(formData.containerNumber, { size: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none"
              >
                <option value="">-- Chọn kích cỡ --</option>
                <option value="20' GP">20' GP (Thường)</option>
                <option value="40' GP">40' GP (Thường)</option>
                <option value="40' HC">40' HC (Cao)</option>
                <option value="45' HC">45' HC (Siêu cao)</option>
                <option value="2x 20' GP">2x 20' GP</option>
                <option value="2x 20'">2x 20'</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                TÌNH TRẠNG CONTAINER
              </label>
              <select
                value={formData.condition}
                onChange={(e) => handleContainerNumberChange(formData.containerNumber, { condition: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none"
              >
                <option value="Bình thường">Bình thường</option>
                <option value="Móp méo">Móp méo</option>
                <option value="Rách vách">Rách vách</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                * PHÂN LOẠI CONT
              </label>
              <select
                value={formData.classification}
                onChange={(e) => handleContainerNumberChange(formData.containerNumber, { classification: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none"
              >
                <option value="Loại A">Loại A</option>
                <option value="Loại B">Loại B</option>
              </select>
            </div>

          </div>

          {/* Vệ sinh container Button group */}
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
                    onClick={() => handleContainerNumberChange(formData.containerNumber, { cleaningType: opt })}
                    className={`flex-1 py-2 text-[10px] font-extrabold tracking-wide uppercase transition ${isActive
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

          <div className="text-left">
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
              TIỀN CƯỢC (VNĐ)
            </label>
            <input
              type="text"
              value={formData.depositFee}
              onChange={(e) => handleContainerNumberChange(formData.containerNumber, { depositFee: e.target.value })}
              placeholder="Ví dụ: 250,000"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none"
            />
          </div>

          <div className="text-left">
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
              GHI CHÚ GIÁM ĐỊNH
            </label>
            <textarea
              rows="2"
              value={formData.notes}
              onChange={(e) => handleContainerNumberChange(formData.containerNumber, { notes: e.target.value })}
              placeholder="Nhập ghi chú chi tiết về tình trạng cont..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-950 focus:outline-none"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm tracking-wider rounded-lg transition uppercase"
            >
              GỬI BÁO CÁO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
