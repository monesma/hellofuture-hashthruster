// src/App.tsx
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import TokenDetail from './pages/TokenDetail';
import AddToken from './pages/superAdmin/AddToken';
import UpdateToken from './pages/superAdmin/UpdateToken';
import Login from './pages/user/Login'
import Profil from './pages/user/Profil'
import { Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from './helpers/RequireAuth';



function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <RequireAuth auth={true} superAdmin={false}>
              <Home />
            </RequireAuth>
          } />
          <Route path="/project/:id" element={
            <RequireAuth auth={true} superAdmin={false}>
              <ProjectDetail />
            </RequireAuth>
          } />
          <Route path="/token/:id" element={
            <RequireAuth auth={true} superAdmin={false}>
              <TokenDetail />
            </RequireAuth>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={
            <RequireAuth auth={true} superAdmin={false}>
              <Profil />
            </RequireAuth>
          } />
          
          <Route path="/addToken" element={
            <RequireAuth auth={true} superAdmin={true}>
              <AddToken />
            </RequireAuth>
          } />
          <Route path="/updateToken/:id" element={
            <RequireAuth auth={true} superAdmin={true}>
              <UpdateToken />
            </RequireAuth>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
