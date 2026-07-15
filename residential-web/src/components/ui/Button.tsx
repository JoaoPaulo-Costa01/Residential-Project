import type { ButtonHTMLAttributes } from "react";

//Estilos visuais disponíveis para o botão
type ButtonVariant = "primary" | "danger" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //Define a aparência do botão (padrão: "primary")
  variant?: ButtonVariant;
}

//Classes de estilo específicas para cada variante do botão 
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-slate-900 text-white hover:bg-slate-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
};

/**
 * Botão padrão da aplicação. Repassa todas as props nativas do HTML
 * (onClick, type, disabled, etc.) e aplica um estilo consistente
 * de acordo com a variante escolhida.
 */
export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}