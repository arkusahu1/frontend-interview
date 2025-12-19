import { useCallback, useState } from "react";
import Toast from "../components/Toast";
import "../components/Toast.css";

const useToast = (position = "top-right") => {
  const [toasts, setToasts] = useState([]);
  const isBottom = position.includes("bottom");
  const triggerToast = useCallback((toastProps) => {
    const id = Date.now();

    setToasts((prev) =>
      isBottom
        ? [{ ...toastProps, id }, ...prev]
        : [...prev, { ...toastProps, id }]
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, toastProps.duration || 3000);
  }, [isBottom]);

  const onToastClose = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  const ToastComponent = (
    <div className={`toast-container ${position}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => onToastClose(toast.id)} />
      ))}
    </div>
  );

  return { ToastComponent, triggerToast };
};

export default useToast;
