const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-white/5 pt-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-5">
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300 sm:justify-start sm:text-sm">
        <span className="text-slate-500">Sayfa</span>
        <span className="font-bold text-white">{currentPage}</span>
        <span className="text-slate-500">/</span>
        <span>{totalPages}</span>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="group btn h-9 min-h-0 rounded-2xl border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-violet-500/10 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:px-4 sm:text-sm"
        >
          ‹
          <span className="hidden sm:inline">Önceki</span>
        </button>

        <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-black/10 p-1">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => onPageChange(pageNumber)}
                className={`h-8 w-8 rounded-xl text-xs font-bold transition sm:h-9 sm:w-9 sm:text-sm ${isActive
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/25"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="group btn h-9 min-h-0 rounded-2xl border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-violet-500/10 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:px-4 sm:text-sm"
        >
          <span className="hidden sm:inline">Sonraki</span>
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;