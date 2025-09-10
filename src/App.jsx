// App.js
import React, { useState, useEffect } from "react";
import ResearchPortfolio from "./ResearchPortfolio";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  // Apply theme to <html> or <body>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [theme]);

  return (
    <div className="App">
      {/* Dark Mode Toggle */}
   

      {/* Portfolio */}
      <ResearchPortfolio />
    </div>
  );
}

export default App;
