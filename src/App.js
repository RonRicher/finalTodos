import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { searchPexels } from "./js/pexels";

function App() {

  useEffect(() => {
    searchPexels()
  })

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
