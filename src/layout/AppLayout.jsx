// src/layout/AppLayout.jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function AppLayout() {
  const nav = useNavigate();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#000",                  
          borderBottom: "1px solid #1a1a1a"
        }}
      >
        <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 3 }, gap: 2 }}>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3, flex: 1 }}>
            <Box
              onClick={() => nav("/")}
              sx={{
                cursor: "pointer",
                fontWeight: 900,
                letterSpacing: 1,
                fontSize: 28,
                color: "#e50914",           
                fontFamily: `"Bebas Neue","Inter",system-ui,-apple-system`,
              }}
            >
              NETFLIX
            </Box>

            <Button
              component={NavLink}
              to="/"
              end
              disableRipple
              sx={{
                color: "#e5e5e5",
                textTransform: "none",
                fontSize: 18,
                px: 0,
                "&.active": { color: "#fff", fontWeight: 700 },
                "&:hover": { color: "#fff" },
              }}
            >
              Home
            </Button>
            <Button
              component={NavLink}
              to="/movies"
              disableRipple
              sx={{
                color: "#e5e5e5",
                textTransform: "none",
                fontSize: 18,
                px: 0,
                "&.active": { color: "#fff", fontWeight: 700 },
                "&:hover": { color: "#fff" },
              }}
            >
              Movies
            </Button>
          </Box>


          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              const q = new FormData(e.currentTarget).get("q")?.toString() || "";
              if (q.trim()) nav(`/search?q=${encodeURIComponent(q)}`);
            }}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <InputBase
              name="q"
              placeholder="Search"
              sx={{
                bgcolor: "#26282c",        
                border: "1px solid #3a3f45", 
                color: "#e5e5e5",
                px: 2,
                height: 44,
                width: { xs: 200, sm: 320 },
                borderRadius: 1.2,
                "::placeholder": { color: "#a7b0ba", opacity: 1 },
              }}
            />
            <IconButton
              type="submit"
              sx={{
                height: 44,
                width: 44,
                borderRadius: 1.2,
                border: "1px solid rgba(229,9,20,0.55)",
                bgcolor: "transparent",
                "&:hover": {
                  bgcolor: "rgba(229,9,20,0.08)",        
                },
              }}
            >
              <SearchIcon sx={{ color: "#e50914" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
}
