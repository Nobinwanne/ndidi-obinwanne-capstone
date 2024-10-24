import chatui from "./components/ChatUi/ChatUi";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<chatui />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
