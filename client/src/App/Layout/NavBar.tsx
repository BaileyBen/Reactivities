import { Group } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  MenuItem,
  Typography,
  MenuList,
  LinearProgress,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../Lib/Hooks/useStore";
import { Observer } from "mobx-react-lite";

export default function NavBar() {
    const {uiStore} = useStore()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
            position: "relative"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* 
                          FIX APPLIED: One master MenuList wrapper handles the entire navigation layer.
                          By applying 'display: "flex"' and 'alignItems: "center"', all child links are 
                          forced to align side-by-side horizontally across the bar instead of stacking!
                        */}
            <MenuList
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              {/* --- BRANDING / LOGO CONTAINER --- */}
              <Box sx={{ flexGrow: 0 }}>
                <MenuItem
                  component={NavLink}
                  to="/"
                  sx={{ display: "flex", gap: 2 }}
                >
                  <Group fontSize="large" />
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Reactivities
                  </Typography>
                </MenuItem>
              </Box>

              {/* --- HORIZONTAL NAVIGATION LINKS CONTAINER --- */}
              {/* flexGrow: 1 pushes the remaining items away, ensuring your user menu sits nicely on the right side */}
              <Box sx={{ display: "flex", flexGrow: 1, gap: 1 }}>
                <MenuItemLink to="/activities">Activities</MenuItemLink>
                <MenuItemLink to="/createActivity">
                  Create Activity
                </MenuItemLink>
                <MenuItemLink to="/counter">Counter</MenuItemLink>
              </Box>

              {/* --- USER ACCOUNT MANAGEMENT LINKS --- */}
              <Box sx={{ flexGrow: 0 }}>
                <MenuItem
                  sx={{
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  User menu
                </MenuItem>
              </Box>
            </MenuList>
          </Toolbar>
        </Container>
                <Observer>
                    {() => uiStore.isLoading ? (
                    <LinearProgress
                    color="secondary"
                    sx={{
                      position: 'absolute', 
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 4
                    }}/>    
                        ) : null }
                </Observer>

      </AppBar>
    </Box>
  );
}
