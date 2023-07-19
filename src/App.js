import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";

import "./App.css";
import theme from "./theme";
import Header from "./components/Header/Header";
import store from "./store";
import TopFilms from "./features/topFilms/TopFilms";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilmDetails from "./features/FilmDetails/FilmDetails";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <div>
            <Header />
            <Routes>
              <Route path="/film/:filmId" element={<FilmDetails />} />
              <Route path="/top-films" element={<TopFilms />} />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
