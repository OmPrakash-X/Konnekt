import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const types = {
    success: {
      bg: 'bg-green-500 dark:bg-green-600',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    error: {
      bg: 'bg-red-500 dark:bg-red-600',
      icon: <XCircle className="w-5 h-5" />,
    },
    warning: {
      bg: 'bg-yellow-500 dark:bg-yellow-600',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    info: {
      bg: 'bg-blue-500 dark:bg-blue-600',
      icon: <Info className="w-5 h-5" />,
    },
  };

  const { bg, icon } = types[type];

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
      <div className={`${bg} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}>
        {icon}
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 hover:opacity-80 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
