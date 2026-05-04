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
  const buttonBase =
    "btn h-11 sm:h-14 rounded-2xl sm:rounded-[22px] px-4 sm:px-6 text-sm sm:text-base font-semibold backdrop-blur transition hover:-translate-y-0.5";

  return (
    <div className="glass-card neon-border mb-4 p-4 sm:mb-6 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-3xl">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-300/80 sm:mb-3 sm:text-xs sm:tracking-[0.32em]">
            Finans yönetim paneli
          </p>

          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Gelir & Gider Takibi
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-300 sm:mt-4 sm:text-base sm:leading-7">
            Gelirlerini, giderlerini, yatırımlarını ve notlarını tek yerden
            yönet.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          <button
            onClick={onOpenIncomeModal}
            className={`${buttonBase} border border-emerald-400/20 bg-emerald-500/12 text-emerald-300 shadow-[0_10px_30px_rgba(16,185,129,0.12)] hover:bg-emerald-500/18`}
          >
            <HiOutlineArrowTrendingUp className="text-lg sm:text-xl" />
            Gelir Ekle
          </button>

          <button
            onClick={onOpenExpenseModal}
            className={`${buttonBase} border border-rose-400/20 bg-rose-500/12 text-rose-300 shadow-[0_10px_30px_rgba(244,63,94,0.12)] hover:bg-rose-500/18`}
          >
            <HiOutlineArrowTrendingDown className="text-lg sm:text-xl" />
            Gider Ekle
          </button>

          <button
            onClick={onOpenInvestmentModal}
            className={`${buttonBase} col-span-2 sm:col-span-1 border border-amber-400/20 bg-amber-500/12 text-amber-300`}
          >
            <PiBankFill className="text-lg sm:text-xl" />
            Yatırım Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;