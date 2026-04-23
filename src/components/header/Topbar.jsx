import {
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";
import { PiBankFill } from "react-icons/pi";

const Topbar = ({
  onOpenIncomeModal,
  onOpenExpenseModal,
  onOpenInvestmentModal,
}) => {
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

          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            Gelirlerini, giderlerini, yatırımlarını ve notlarını tek yerden yönet.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            onClick={onOpenIncomeModal}
            className="btn h-14 rounded-[22px] border border-emerald-400/20 bg-emerald-500/12 px-6 text-base font-semibold text-emerald-300 shadow-[0_10px_30px_rgba(16,185,129,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-emerald-500/18"
          >
            <HiOutlineArrowTrendingUp className="text-xl" />
            Gelir Ekle
          </button>

          <button
            onClick={onOpenExpenseModal}
            className="btn h-14 rounded-[22px] border border-rose-400/20 bg-rose-500/12 px-6 text-base font-semibold text-rose-300 shadow-[0_10px_30px_rgba(244,63,94,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-rose-500/18"
          >
            <HiOutlineArrowTrendingDown className="text-xl" />
            Gider Ekle
          </button>

          <button
            onClick={onOpenInvestmentModal}
            className="btn h-14 rounded-[22px] border border-amber-400/20 bg-amber-500/12 px-6 text-base font-semibold text-amber-300 shadow-[0_10px_30px_rgba(245,158,11,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-amber-500/18"
          >
            <PiBankFill className="text-xl" />
            Yatırım Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;