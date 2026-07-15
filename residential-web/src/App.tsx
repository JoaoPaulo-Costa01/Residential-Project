import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { PageContainer } from "./components/layout/PageContainer";
import { TotalsPage } from "./pages/TotalsPage";
import { PeoplePage } from "./pages/PeoplePage";
import { TransactionsPage } from "./pages/TransactionsPage";

/**
 * Componente raiz da aplicação. Define a estrutura visual fixa
 * (Navbar + PageContainer) e o roteamento entre as três telas:
 * Resumo, Moradores e Transações.
 */
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <PageContainer>
        <Routes>
          <Route path="/" element={<TotalsPage />} />
          <Route path="/pessoas" element={<PeoplePage />} />
          <Route path="/transacoes" element={<TransactionsPage />} />
        </Routes>
      </PageContainer>
    </BrowserRouter>
  );
}

export default App;