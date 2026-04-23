import { useEffect, useMemo, useState } from "react";
import { getToday } from "../../utils/helpers";

const createInitialForm = (initialData, type) => ({
  id: initialData?.id || null,
  title: initialData?.title || "",
  amount: initialData?.amount ?? "",
  note: initialData?.note || "",
  date: initialData?.date || getToday(),
  type: initialData?.type || type,
});

const FinanceModal = ({
  isOpen,
  onClose,
  onSubmit,
  type,
  mode = "create",
  initialData = null,
}) => {
  const [form, setForm] = useState(() => createInitialForm(initialData, type));

  const isEditMode = mode === "edit";
  const currentType = form.type || type;

  const modalTitle = useMemo(() => {
    if (currentType === "income") {
      return isEditMode ? "Geliri Güncelle" : "Gelir Ekle";
    }

    if (currentType === "expense") {
      return isEditMode ? "Gideri Güncelle" : "Gider Ekle";
    }

    return isEditMode ? "Yatırımı Güncelle" : "Yatırım Ekle";
  }, [currentType, isEditMode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    document.body.style.overflow = "";
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;
    if (!form.amount || Number(form.amount) <= 0) return;

    onSubmit({
      id: form.id,
      title: form.title,
      amount: Number(form.amount),
      note: form.note,
      date: form.date,
      type: form.type,
    });

    handleClose();
  };

  const submitButtonClass =
    currentType === "income"
      ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
      : currentType === "expense"
        ? "bg-rose-500 text-white hover:bg-rose-400"
        : "bg-amber-400 text-slate-950 hover:bg-amber-300";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-[2px]">
      <div className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-violet-500/20 bg-slate-950 text-white shadow-2xl shadow-black/50">
        <div className="border-b border-white/5 px-5 py-4 sm:px-6">
          <h3 className="text-2xl font-bold">{modalTitle}</h3>
          <p className="mt-2 text-sm text-slate-400">
            İşlem detaylarını doldur ve kaydet.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5 sm:px-6">
          {isEditMode && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Tür
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="input dark-input h-12 w-full rounded-2xl"
              >
                <option value="income">Gelir</option>
                <option value="expense">Gider</option>
                <option value="investment">Yatırım</option>
              </select>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Başlık
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder={
                currentType === "income"
                  ? "Örn: Maaş"
                  : currentType === "expense"
                    ? "Örn: Kira"
                    : "Örn: Altın Alımı"
              }
              className="input dark-input h-12 w-full rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Tutar
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                className="input dark-input h-12 w-full rounded-2xl"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Tarih
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="input dark-input h-12 w-full rounded-2xl"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Not
            </label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows="4"
              placeholder="İşlemle ilgili not..."
              className="textarea dark-input w-full rounded-2xl"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="btn h-12 rounded-2xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            >
              İptal
            </button>

            <button
              type="submit"
              className={`btn h-12 rounded-2xl border-0 font-semibold ${submitButtonClass}`}
            >
              {isEditMode ? "Güncelle" : "Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinanceModal;