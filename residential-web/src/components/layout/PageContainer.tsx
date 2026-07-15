import type { ReactNode } from "react";
//O PageContainer serve como uma "moldura" padronizada para todas as telas do seu sistema. 

interface PageContainerProps {
  children: ReactNode;
}

/**
 * Wrapper padrão utilizado por todas as páginas da aplicação.
 * Centraliza o conteúdo horizontalmente e aplica um padding consistente,
 * evitando repetição de classes de layout em cada tela.
 */
export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      {children}
    </main>
  );
}