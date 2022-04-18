import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  TextField,
} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdvanceSearchForm({
  customer_number,
  buisness_year,
  document_id,
  invoice_id,
  openAdvanceSearch,
  searchChangeHandler,
  closeAdvanceSearchHandler,
  advanceSearchSubmitHandler
}) {
  return (
    <div>
      <Dialog
        open={openAdvanceSearch}
        onClose={closeAdvanceSearchHandler}
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle style={{ background: "#2E3B55", color: "#FFFFFF" }}>
          ADVANCE SEARCH
        </DialogTitle>
        <DialogContent style={{ background: "#2E3B55" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
              flexGrow: 1,
            }}
            noValidate
            autoComplete="off"
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 4, md: 3, lg: 4 }}
            >
              <Grid item xs={6}>
                <TextField
                  id="customer_number"
                  name="customer_number"
                  value={customer_number}
                  type="text"
                  label="Customer Number"
                  variant="filled"
                  onChange={searchChangeHandler}
                  style={{ width: 350, background: "#FFFFFF", color: "grey" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="buisness_year"
                  name="buisness_year"
                  type="text"
                  value={buisness_year}
                  label="Business Year"
                  variant="filled"
                  onChange={searchChangeHandler}
                  style={{ width: 350, background: "#FFFFFF", color: "grey" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="document_id"
                  name="document_id"
                  type="text"
                  value={document_id}
                  label="Document Id"
                  variant="filled"
                  onChange={searchChangeHandler}
                  style={{ width: 350, background: "#FFFFFF", color: "grey" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="invoice_id"
                  name="invoice_id"
                  type="text"
                  value={invoice_id}
                  label="Invoice Id"
                  variant="filled"
                  onChange={searchChangeHandler}
                  style={{ width: 350, background: "#FFFFFF", color: "grey" }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 12, sm: 12, md: 6, lg: 6 }}
            >
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  style={{
                    width: "46%",
                    color: "#FFFFFF",
                    borderColor: "#FFFFFF",
                    marginRight: "2vmin",
                  }}
                  type="submit"
                  onClick={advanceSearchSubmitHandler}
                >
                  SEARCH
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    width: "46%",
                    color: "#FFFFFF",
                    borderColor: "#FFFFFF",
                    marginLeft: "3vmin",
                  }}
                  onClick={closeAdvanceSearchHandler}
                >
                  CLOSE
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
