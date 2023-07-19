import React, { useCallback, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { CircularProgress, IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import {
  getFilmsBySearch,
  getTopFilms,
  increment,
} from "../../features/topFilms/topFilmsSlice";

export default function Header() {
  const [search, setSearch] = useState("");

  const isLoading = useSelector((state) => state.topFilms.isLoading);

  const dispatch = useDispatch();

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const getFilms = useCallback(async () => {
    await dispatch(getTopFilms());
  }, [dispatch]);

  const handleSearch = async () => {
    await dispatch(getFilmsBySearch(search));
  };

  useEffect(() => {
    getFilms();
  }, [getFilms]);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          color="warning"
          value={search}
          onChange={handleChangeSearch}
          InputProps={{
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <IconButton sx={{ color: "#fff" }} onClick={handleSearch}>
                    <Search />
                  </IconButton>
                )}
              </>
            ),
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
