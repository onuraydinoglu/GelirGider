const AlertMessage = ({ alert }) => {
  if (!alert) return null;

  return (
    <div className="mb-6">
      <div
        className={`rounded-2xl border px-4 py-4 text-sm font-medium ${alert.type === "success"
            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
            : "border-rose-500/20 bg-rose-500/10 text-rose-300"
          }`}
      >
        {alert.message}
      </div>
    </div>
  );
};

export default AlertMessage;