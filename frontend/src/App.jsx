import { BrowserRouter } from "react-router-dom";
import AppRoutes  from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
         <div className = "container">
            <AppRoutes/>
         </div>
    </BrowserRouter>
  );
}

export default App;
