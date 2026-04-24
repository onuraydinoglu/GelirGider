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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-[2px]">
      <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-violet-500/20 bg-slate-950 text-white shadow-2xl shadow-black/50">
        <div className="border-b border-white/5 px-5 py-4">
          <h3 className="text-xl font-bold">
            {typeLabels[type]} Alanları
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            SelectBox içinde görünecek alanları ekleyebilir veya silebilirsin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Yeni Alan Adı
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Örn: Prim, Elektrik, Altın"
                className="input dark-input h-12 flex-1 rounded-2xl"
              />

              <button
                type="submit"
                className="btn h-12 rounded-2xl border border-violet-400/20 bg-violet-500/15 px-5 text-violet-300 hover:bg-violet-500/25"
              >
                Ekle
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
            <p className="mb-3 text-sm font-medium text-slate-300">
              Mevcut Alanlar
            </p>

            {options.length === 0 ? (
              <p className="text-sm text-slate-500">
                Henüz alan eklenmemiş.
              </p>
            ) : (
              <div className="space-y-2">
                {options.map((option) => (
                  <div
                    key={option}
                    className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2"
                  >
                    <span className="text-sm text-slate-200">{option}</span>

                    <button
                      type="button"
                      onClick={() => handleDelete(option)}
                      className="btn btn-sm rounded-xl border-0 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25"
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn h-12 rounded-2xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
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