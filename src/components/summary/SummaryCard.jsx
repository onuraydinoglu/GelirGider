const SummaryCard = ({ title, value, subtitle, colorClass, iconBg }) => {
  return (
    <div className="glass-card overflow-hidden p-3 sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-3 sm:mb-6">
        <div>
          <p className="text-xs text-slate-400 sm:text-sm">{title}</p>

          <h3 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:mt-3 sm:text-3xl">
            {value}
          </h3>

          <p className="mt-1.5 text-xs text-slate-400 sm:mt-3 sm:text-sm">
            {subtitle}
          </p>
        </div>

        <div className={`h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 ${colorClass}`} />
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.03] sm:h-2">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${iconBg} opacity-90`}
          style={{ width: "68%" }}
        />
      </div>
    </div>
  );
};

export default SummaryCard;