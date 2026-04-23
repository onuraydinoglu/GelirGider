const SummaryCard = ({ title, value, subtitle, colorClass, iconBg }) => {
  return (
    <div className="glass-card overflow-hidden p-5 sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </h3>
          <p className="mt-3 text-sm text-slate-400">{subtitle}</p>
        </div>

        <div className={`h-3 w-3 rounded-full ${colorClass}`} />
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.03]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${iconBg} opacity-90`}
          style={{ width: "68%" }}
        />
      </div>
    </div>
  );
};

export default SummaryCard;