import {
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";

const Topbar = ({ onOpenIncomeModal, onOpenExpenseModal }) => {
  return (
    <div className="glass-card neon-border mb-6 p-5 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-violet-300/80">
            Finans yönetim paneli
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Gelir & Gider Takibi
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            onClick={onOpenIncomeModal}
            className="btn w-40 h-12 rounded-2xl border border-white/10 bg-emerald-500 text-slate-200 hover:border-violet-400/30 hover:bg-emerald-600/70"
          >
            <HiOutlineArrowTrendingUp className="text-xl" />
            Gelir Ekles
          </button>

          <button
            onClick={onOpenExpenseModal}
            className="btn h-12 rounded-2xl border border-white/10 bg-rose-500 text-slate-200 hover:border-violet-400/30 hover:bg-rose-600/70"
          >
            <HiOutlineArrowTrendingDown className="text-xl" />
            Gider Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;