import React from 'react';
import { AlertCircle, CheckCircle2, HelpCircle, X } from 'lucide-react';

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: 'info' | 'confirm' | 'prompt' | 'success';
  inputValue?: string;
  inputPlaceholder?: string;
  onInputChange?: (value: string) => void;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  title,
  message,
  type = 'info',
  inputValue = '',
  inputPlaceholder = '',
  onInputChange,
  onConfirm,
  onCancel,
  confirmText = 'Tamam',
  cancelText = 'Vazgeç',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-100 relative">
        <button
          onClick={onCancel || onConfirm}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3.5 mb-4">
          <div className="shrink-0 mt-0.5">
            {type === 'success' && (
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
            {type === 'confirm' && (
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
            )}
            {type === 'prompt' && (
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
            )}
            {type === 'info' && (
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-slate-600 text-sm mt-1 whitespace-pre-line leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {type === 'prompt' && (
          <div className="mt-2 mb-5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange && onInputChange(e.target.value)}
              placeholder={inputPlaceholder}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') onConfirm();
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-800 text-sm"
            />
          </div>
        )}

        <div className="flex justify-end gap-2.5 mt-5 pt-3 border-t border-slate-100">
          {(type === 'confirm' || type === 'prompt') && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
