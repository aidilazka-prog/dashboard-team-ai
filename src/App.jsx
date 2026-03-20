import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import KanbanBoard from './pages/kanban/KanbanBoard';
import ProjectList from './pages/projects/ProjectList';
import ProjectDetail from './pages/projects/ProjectDetail';
import MeetingList from './pages/meetings/MeetingList';
import MeetingDetail from './pages/meetings/MeetingDetail';
import OkrDashboard from './pages/okrs/OkrDashboard';
import AiAssistant from './pages/ai/AiAssistant';
import Settings from './pages/settings/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/meetings" element={<MeetingList />} />
          <Route path="/meetings/:id" element={<MeetingDetail />} />
          <Route path="/okrs" element={<OkrDashboard />} />
          <Route path="/ai" element={<AiAssistant />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
