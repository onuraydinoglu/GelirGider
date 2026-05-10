import {
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

import { PiBankFill } from "react-icons/pi";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const TransactionCard = ({ item, onDelete, onEdit }) => {
  const getTypeConfig = (type) => {
    if (type === "income") {
      return {
        icon: <HiOutlineArrowTrendingUp className="text-xl" />,
        wrapper: "bg-emerald-500/15 text-emerald-300",
        badge: "bg-emerald-500/15 text-emerald-300",
        amount: "text-emerald-400",
        label: "Gelir",
        prefix: "+",
      };
    }

    if (type === "expense") {
      return {
        icon: <HiOutlineArrowTrendingDown className="text-xl" />,
        wrapper: "bg-rose-500/15 text-rose-300",
        badge: "bg-rose-500/15 text-rose-300",
        amount: "text-rose-400",
        label: "Gider",
        prefix: "-",
      };
    }

    return {
      icon: <PiBankFill className="text-xl" />,
      wrapper: "bg-amber-500/15 text-amber-300",
      badge: "bg-amber-500/15 text-amber-300",
      amount: "text-amber-400",
      label: "Yatırım",
      prefix: "-",
    };
  };

  const config = getTypeConfig(item.type);
  const isInstallmentExpense =
    item.type === "expense" && item.installmentCount > 1;

  return (
    <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-3 transition duration-300 hover:border-violet-400/20 hover:bg-white/[0.06] sm:p-4">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${config.wrapper}`}
        >
          {config.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-sm font-bold text-white sm:text-base">
                  {item.title}
                </h3>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-xs ${config.badge}`}
                >
                  {config.label}
                </span>

                {isInstallmentExpense && (
                  <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-300 sm:text-xs">
                    {item.installmentIndex}/{item.installmentCount} Taksit
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                {formatDate(item.date)}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className={`text-base font-extrabold sm:text-lg ${config.amount}`}>
                {config.prefix}
                {formatCurrency(item.amount)}
              </p>
            </div>
          </div>

          {item.note && (
            <p className="mt-2 line-clamp-2 text-xs text-slate-400 sm:text-sm">
              {item.note}
            </p>
          )}

          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="btn btn-xs rounded-xl border border-sky-400/20 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20"
            >
              <HiOutlinePencilSquare className="text-base" />
              Düzenle
            </button>

            <button
              type="button"
              onClick={() => onDelete(item)}
              className="btn btn-xs rounded-xl border border-rose-400/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
            >
              <HiOutlineTrash className="text-base" />
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;