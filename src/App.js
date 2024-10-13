import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Header from './components/Header';
import { useAuthContext } from './hooks/useAuthContext';
import Footer from './components/Footer';

function App() {
  const { isAuthReady, user } = useAuthContext();
  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                user ? <Home /> : <Navigate replace={true} to="/login" />
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate replace={true} to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate replace={true} to="/" />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      ) : (
        <h1 className="loading">Loading ...</h1>
      )}
    </div>
  );
}

export default App;
