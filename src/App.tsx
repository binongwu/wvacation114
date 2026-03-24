import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { LayoutDashboard, Home as HomeIcon } from 'lucide-react';
import './index.css';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem 2rem', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', gap: '2rem', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.8)' }}>
        <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)' }}>
          508成果展
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', marginLeft: 'auto' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <HomeIcon size={18} /> 成果總覽
          </Link>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <LayoutDashboard size={18} /> 管理後台
          </Link>
        </div>
      </nav>
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
