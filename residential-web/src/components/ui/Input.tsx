import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  //Texto exibido acima do campo (opcional)
  label?: string;
}

/**
 * Campo de texto/número padronizado da aplicação.
 * Aceita todas as props nativas do input HTML (type, value, onChange, etc.)
 * e exibe um label opcional acima do campo.
 */
export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 ${className}`}
        {...props}
      />
    </div>
  );
}