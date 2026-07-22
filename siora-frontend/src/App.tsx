import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { DashboardAluno } from './pages/DashboardAluno';
import { DashboardProfessor } from './pages/DashboardProfessor';
import { DetalhesDisciplinaAluno } from './pages/DetalhesDisciplinaAluno';
import { DetalhesDisciplinaProfessor } from './pages/DetalhesDisciplinaProfessor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-aluno" element={<DashboardAluno />} />
        <Route path="/dashboard-professor" element={<DashboardProfessor />} />
        <Route path="/disciplina/:id" element={<DetalhesDisciplinaAluno />} />
        <Route path="/detalhes-disciplina-professor/:id" element={<DetalhesDisciplinaProfessor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;