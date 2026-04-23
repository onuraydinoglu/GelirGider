const EmptyState = () => {
  return (
    <div className="glass-card flex min-h-[240px] flex-col items-center justify-center p-6 text-center">
      <h3 className="text-2xl font-semibold text-white">Henüz kayıt yok</h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
        İlk gelir veya gider kaydını ekleyerek sistemi kullanmaya başlayabilirsin.
      </p>
    </div>
  );
};

export default EmptyState;