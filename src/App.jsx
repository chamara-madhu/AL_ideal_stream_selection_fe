import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOME_PATH } from "./constants/routes";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PATH} exact element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
