import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

const typeLabels = {
  income: "Gelir",
  expense: "Gider",
  investment: "Yatırım",
};

const OptionModal = ({
  isOpen,
  onClose,
  type,
  options = [],
  onSubmit,
  onDelete,
}) => {
  const [value, setValue] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = onSubmit(type, value);

    if (result.success) {
      setValue("");
    }
  };

  const handleDelete = (option) => {
    onDelete(type, option);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-3 py-4 backdrop-blur-[2px] sm:px-4 sm:py-6">
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl border border-violet-500/20 bg-slate-950 text-white shadow-2xl shadow-black/50 sm:rounded-[28px]">
        <div className="border-b border-white/5 px-4 py-3 sm:px-6 sm:py-4">
          <h3 className="text-lg font-bold sm:text-2xl">
            {typeLabels[type]} Alanları
          </h3>

          <p className="mt-1 text-xs text-slate-400 sm:mt-2 sm:text-sm">
            SelectBox içinde görünecek alanları ekleyebilir veya silebilirsin.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-5"
        >
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300 sm:mb-2 sm:text-sm">
              Yeni Alan Adı
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Örn: Prim, Elektrik, Altın"
                className="input dark-input h-10 flex-1 rounded-xl text-sm sm:h-12 sm:rounded-2xl"
              />

              <button
                type="submit"
                className="btn h-10 rounded-xl border-0 bg-violet-500 px-4 text-sm text-white hover:bg-violet-400 sm:h-12 sm:rounded-2xl sm:px-5"
              >
                Ekle
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-white sm:mb-3 sm:text-base">
              Mevcut Alanlar
            </h4>

            {options.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs text-slate-400 sm:rounded-2xl sm:px-4 sm:py-4 sm:text-sm">
                Henüz alan eklenmemiş.
              </div>
            ) : (
              <div className="space-y-2">
                {options.map((option) => (
                  <div
                    key={option}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-3"
                  >
                    <span className="min-w-0 truncate text-sm text-slate-200 sm:text-base">
                      {option}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDelete(option)}
                      className="btn btn-xs rounded-lg border-0 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 sm:btn-sm sm:rounded-xl"
                    >
                      <HiOutlineTrash className="text-base sm:text-lg" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-1 sm:pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn h-10 rounded-xl border border-white/10 bg-white/5 px-5 text-sm text-slate-200 hover:bg-white/10 sm:h-12 sm:rounded-2xl"
            >
              Kapat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OptionModal;