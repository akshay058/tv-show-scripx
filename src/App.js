import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowDetailsPage from "./pages/ShowDetailsPage";
import ShowsListPage from "./pages/ShowsListPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/tv-shows/details/:id"
            element={<ShowDetailsPage />}
          ></Route>
          <Route path="/tv-shows/:search" element={<ShowsListPage />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
