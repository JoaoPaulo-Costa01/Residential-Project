import { NavLink } from "react-router-dom";

// Define o rótulo em português e a rota de cada item do menu
const NAV_ITEMS = [
  { label: "Resumo", path: "/" },
  { label: "Moradores", path: "/pessoas" },
  { label: "Transações", path: "/transacoes" },
];

/**
 * Barra de navegação superior fixa no topo da aplicação.
 * Utiliza NavLink para destacar automaticamente a rota ativa,
 * permitindo a transição entre Resumo, Moradores e Transações.
 */
export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          Controle de Gastos Residenciais
        </span>

        <ul className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}