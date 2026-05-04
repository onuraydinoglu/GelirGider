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
  options = [],
  onOpenOptionModal,
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

  const currentOptions = options[currentType] || [];

  const selectOptions = form.title
    ? Array.from(new Set([...currentOptions, form.title]))
    : currentOptions;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (name === "type") {
        return {
          ...prev,
          type: value,
          title: "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
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
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-3 py-4 backdrop-blur-[2px] sm:px-4 sm:py-6">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-2xl border border-violet-500/20 bg-slate-950 text-white shadow-2xl shadow-black/50 sm:rounded-[28px]">
        <div className="border-b border-white/5 px-4 py-3 sm:px-6 sm:py-4">
          <h3 className="text-xl font-bold sm:text-2xl">{modalTitle}</h3>

          <p className="mt-1 text-xs text-slate-400 sm:mt-2 sm:text-sm">
            İşlem detaylarını doldur ve kaydet.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 px-4 py-4 sm:space-y-4 sm:px-6 sm:py-5"
        >
          {isEditMode && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300 sm:mb-2 sm:text-sm">
                Tür
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="select dark-input h-10 w-full rounded-xl text-sm sm:h-12 sm:rounded-2xl"
              >
                <option value="income">Gelir</option>
                <option value="expense">Gider</option>
                <option value="investment">Yatırım</option>
              </select>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300 sm:mb-2 sm:text-sm">
              Alan
            </label>

            <div className="flex gap-2">
              <select
                name="title"
                value={form.title}
                onChange={handleChange}
                className="select dark-input h-10 flex-1 rounded-xl text-sm sm:h-12 sm:rounded-2xl"
              >
                <option value="">Seçiniz</option>

                {selectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => onOpenOptionModal(currentType)}
                className="btn h-10 w-10 rounded-xl border border-violet-400/20 bg-violet-500/15 text-lg font-bold text-violet-300 hover:bg-violet-500/25 sm:h-12 sm:w-12 sm:rounded-2xl sm:text-xl"
              >
                +
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300 sm:mb-2 sm:text-sm">
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
                className="input dark-input h-10 w-full rounded-xl text-sm sm:h-12 sm:rounded-2xl"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300 sm:mb-2 sm:text-sm">
                Tarih
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="input dark-input h-10 w-full rounded-xl text-sm sm:h-12 sm:rounded-2xl"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300 sm:mb-2 sm:text-sm">
              Not
            </label>

            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows="3"
              placeholder="İşlemle ilgili not..."
              className="textarea dark-input min-h-20 w-full rounded-xl text-sm sm:min-h-28 sm:rounded-2xl"
            />
          </div>

          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end sm:gap-3 sm:pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="btn h-10 rounded-xl border border-white/10 bg-white/5 text-sm text-slate-200 hover:bg-white/10 sm:h-12 sm:rounded-2xl"
            >
              İptal
            </button>

            <button
              type="submit"
              className={`btn h-10 rounded-xl border-0 text-sm font-semibold sm:h-12 sm:rounded-2xl ${submitButtonClass}`}
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