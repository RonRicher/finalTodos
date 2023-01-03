<<<<<<< HEAD

import { useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
=======
import "./App.css";
import Header from "./components/Header";
import UserProvider from "./context/UserContext";
>>>>>>> ff0ae461c9b8c65fca845f40c65866f7fe423461

function App() {

  return (
    <div className="App">
      <UserProvider>
        <Header />
      </UserProvider>
    </div>
  );
}

export default App;
