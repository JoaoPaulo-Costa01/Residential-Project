import type { SelectHTMLAttributes } from "react";

//Representa uma opção exibida no combo-box
interface SelectOption {
  //Valor enviado ao formulário/API
  value: string | number;
  //Texto exibido ao usuário
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  //Texto exibido acima do campo (opcional)
  label?: string;
  // Lista de opções disponíveis no combo-box
  options: SelectOption[];
  // Texto exibido como primeira opção desabilitada (opcional)
  placeholder?: string;
}

/**
 * Combo-box padronizado da aplicação. Usado, por exemplo, para
 * selecionar a pessoa ou o tipo (Despesa/Receita) de uma transação.
 */
export function Select({
  label,
  id,
  options,
  placeholder,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-slate-500 ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}