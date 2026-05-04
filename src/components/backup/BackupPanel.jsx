import { useRef, useState } from "react";
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowUpTray,
  HiOutlineTrash,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { downloadBackupFile } from "../../utils/backup";

const BackupPanel = ({
  transactions,
  options,
  onImport,
  onAskClearAll,
  setAlert,
}) => {
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const buttonBase =
    "btn h-10 rounded-xl px-3 text-xs font-semibold lg:h-12 lg:px-4 lg:text-sm";

  const handleBackup = () => {
    downloadBackupFile(transactions, options);

    setAlert({
      type: "success",
      message: "Yedek dosyası indirildi.",
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsedData = JSON.parse(text);
      const result = onImport(parsedData);

      setAlert({
        type: result.valid ? "success" : "error",
        message: result.message,
      });
    } catch {
      setAlert({
        type: "error",
        message: "Dosya okunamadı ya da JSON formatı bozuk.",
      });
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="glass-card mb-4 p-4 sm:mb-6 sm:p-6">
      <div
        className={`flex flex-col lg:flex-row lg:items-center lg:justify-between ${isOpen ? "gap-4" : "gap-0"
          } lg:gap-4`}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between text-left lg:hidden"
        >
          <h2 className="text-lg font-bold text-white">Yedekleme Alanı</h2>

          <HiOutlineChevronDown
            className={`text-xl text-slate-300 transition ${isOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        <div className="hidden lg:block">
          <h2 className="text-2xl font-bold text-white">Yedekleme Alanı</h2>
        </div>

        <div className="flex-1 lg:max-w-lg">
          <div
            className={`mt-2 grid grid-cols-2 gap-2 lg:mt-0 lg:grid lg:grid-cols-3 lg:gap-4 ${isOpen ? "grid" : "hidden"
              }`}
          >
            <button
              type="button"
              onClick={handleBackup}
              className={`${buttonBase} border border-white/10 bg-white/5 text-slate-200 hover:border-violet-400/30 hover:bg-violet-500/10`}
            >
              <HiOutlineArrowDownTray className="text-sm lg:text-base" />
              Yedek Al
            </button>

            <button
              type="button"
              onClick={handleImportClick}
              className={`${buttonBase} border-0 bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400`}
            >
              <HiOutlineArrowUpTray className="text-sm lg:text-base" />
              İçe Aktar
            </button>

            <button
              type="button"
              onClick={onAskClearAll}
              className={`${buttonBase} col-span-2 border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 lg:col-span-1`}
            >
              <HiOutlineTrash className="text-sm lg:text-base" />
              Tümünü Temizle
            </button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default BackupPanel;