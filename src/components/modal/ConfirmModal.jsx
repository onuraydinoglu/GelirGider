const ConfirmModal = ({ isOpen, onClose, onConfirm, title, description }) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open px-3">
      <div className="w-full max-w-md rounded-[28px] border border-violet-500/20 bg-slate-950 p-6 text-white shadow-2xl shadow-black/50">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="py-3 text-sm leading-7 text-slate-400">{description}</p>

        <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="btn h-12 rounded-2xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
          >
            Vazgeç
          </button>
          <button
            onClick={onConfirm}
            className="btn h-12 rounded-2xl border-0 bg-rose-500 text-white hover:bg-rose-400"
          >
            Onayla
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmModal;