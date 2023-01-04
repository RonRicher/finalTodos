import "./App.css";
import Header from "./components/Header";
import UserProvider from "./context/UserContext";

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
