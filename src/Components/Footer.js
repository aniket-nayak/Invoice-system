import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "styled-components";

function Footer() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#2E3B55",
      },
    },
  });
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <AppBar
            position="static"
            color="primary"
            style={{ background: "#2E3B55" }}
          >
            <Toolbar style={{ height: "2rem" }}>
              <Typography
                variant="h6"
                align="center"
                marginTop={-3}
                component="div"
                sx={{ flexGrow: 1 }}
              >
                <h5>
                  {
                    <span style={{ color: "blue" }}>
                      <u>Privacy Policy </u>
                    </span>
                  }{" "}
                  | ©️ 2022 HighRadius Corporation All rights reserved
                </h5>
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
    </div>
  );
}

export default Footer;
