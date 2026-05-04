import SummaryCard from "./SummaryCard";
import { formatCurrency } from "../../utils/formatCurrency";

const SummaryGrid = ({ totals }) => {
  return (
    <div className="mb-4 grid grid-cols-2 gap-2 sm:mb-6 sm:gap-4 xl:grid-cols-4">
      <SummaryCard
        title="Toplam Bakiye"
        value={formatCurrency(totals.balance)}
        subtitle="Gelir - Gider - Yatırım"
        colorClass={totals.balance >= 0 ? "bg-violet-500/80" : "bg-rose-400"}
        iconBg="from-violet-500/80 to-fuchsia-500/50"
      />

      <SummaryCard
        title="Toplam Gelir"
        value={formatCurrency(totals.totalIncome)}
        subtitle="Kayıtlı tüm gelirler"
        colorClass="bg-emerald-400"
        iconBg="from-emerald-400/80 to-cyan-400/50"
      />

      <SummaryCard
        title="Toplam Gider"
        value={formatCurrency(totals.totalExpense)}
        subtitle="Kayıtlı tüm giderler"
        colorClass="bg-rose-400"
        iconBg="from-rose-500/80 to-pink-500/50"
      />

      <SummaryCard
        title="Toplam Yatırım"
        value={formatCurrency(totals.totalInvestment)}
        subtitle="Kayıtlı tüm yatırımlar"
        colorClass="bg-amber-400"
        iconBg="from-amber-400/80 to-yellow-500/50"
      />
    </div>
  );
};

export default SummaryGrid;