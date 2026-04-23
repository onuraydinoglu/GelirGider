import SummaryCard from "./SummaryCard";
import { formatCurrency } from "../../utils/formatCurrency";

const SummaryGrid = ({ totals }) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Toplam Bakiye"
        value={formatCurrency(totals.balance)}
        subtitle="Gelir - Gider"
        colorClass={totals.balance >= 0 ? "bg-emerald-400" : "bg-rose-400"}
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
        title="Toplam İşlem"
        value={totals.totalCount}
        subtitle="Sistemdeki kayıt sayısı"
        colorClass="bg-sky-400"
        iconBg="from-sky-500/80 to-indigo-500/50"
      />
    </div>
  );
};

export default SummaryGrid;