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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

export default function AppLayout() {
  const nav = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

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
                fontSize: 26,
                fontWeight: "bold",
                color: "red",
                fontFamily: "Bebas Neue, sans-serif",
              }}
            >
              NETFLIX
            </Box>
            
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2}}>
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
              onSubmit={(e) => {
                e.preventDefault();
                const q = e.target.q.value;
                if (q) nav(`/search?q=${q}`);
              }}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <InputBase
                name="q"
                placeholder="Search..."
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
          <ListItemButton onClick={() => { nav("/"); setOpenMenu(false); }}>
            Home
          </ListItemButton>
          <ListItemButton onClick={() => { nav("/movies"); setOpenMenu(false); }}>
            Movies
          </ListItemButton>
        </List>
      </Drawer>

      <Outlet />
    </>
  );
}
