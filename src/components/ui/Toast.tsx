import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { X, Check, AlertTriangle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 max-w-sm">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const icons = {
    success: <Check size={14} strokeWidth={2} />,
    error: <AlertTriangle size={14} strokeWidth={2} />,
    info: <Info size={14} strokeWidth={2} />,
  };

  const colors = {
    success: "border-ink bg-paper",
    error: "border-accent bg-paper",
    info: "border-ink bg-paper",
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 border-2 shadow-[2px_2px_0_0_#111] ${colors[toast.type]}`}
      role="alert"
    >
      <span className={toast.type === "error" ? "text-accent" : "text-ink"}>
        {icons[toast.type]}
      </span>
      <span className="font-mono text-xs flex-1">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-neutral-400 hover:text-ink transition-colors cursor-pointer"
        aria-label="Dismiss"
      >
        <X size={12} />
      </button>
    </div>
  );
}
