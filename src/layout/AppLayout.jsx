// src/layout/AppLayout.jsx
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Button,
  Drawer,
  List,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NetflixLogo from "../compopnents/NetflixLogo";

export default function AppLayout() {
  const nav = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault();
    //url 바꿔주기 페이지에 url값을 받아온다 리프레시 했을 때 무비에 키워드가 들어온채 셋팅
    //들어온 키워드 값을 쿼리값으로 넣어준다
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };
  return (
    <>
      <AppBar sx={{ bgcolor: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => setOpenMenu(true)}
              sx={{ display: { xs: "block", md: "none" }, color: "white" }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              onClick={() => nav("/")}
              sx={{
                cursor: "pointer",
                color: "red",
                fontFamily: "Bebas Neue, sans-serif",
              }}
            >
              <NetflixLogo showLabel={false} size={isMobile ? 60 : 100} />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Button component={NavLink} to="/" sx={{ color: "white" }}>
                Home
              </Button>
              <Button component={NavLink} to="/movies" sx={{ color: "white" }}>
                Movies
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="form"
              onSubmit={searchByKeyword}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <InputBase
                placeholder="Search..."
                type="search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                sx={{
                  bgcolor: "#333",
                  color: "white",
                  px: 2,
                  borderRadius: 1,
                }}
              />
              <IconButton type="submit" sx={{ color: "red" }}>
                <SearchIcon />
              </IconButton>
            </Box>

            <IconButton
              type="submit"
              onClick={() => nav("/search")}
              sx={{ display: { xs: "block", md: "none" }, color: "white" }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 모바일 메뉴 */}
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
        <List sx={{ width: 200 }}>
          <ListItemButton
            onClick={() => {
              nav("/");
              setOpenMenu(false);
            }}
          >
            Home
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              nav("/movies");
              setOpenMenu(false);
            }}
          >
            Movies
          </ListItemButton>
        </List>
      </Drawer>

      <main style={{ paddingTop: 64 }}>
        <Outlet />
      </main>

    </>
  );
}
