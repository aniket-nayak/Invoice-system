import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HRC from "../HRC.svg";
import abc_product from "../abc_product.svg";


function Header() {
 
  return (
    <>
      <div>
       
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ background: "#2E3B55" }}>
            <Toolbar>
              <Typography variant="h6" component="div">
                <img src={abc_product} className="App-logo" alt="logo" />
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <img src={HRC} className="App-logo" alt="logo" />
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        
      </div>
    </>
  );
}

export default Header;
