import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "../../backend/store";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <Home />
            </Provider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
