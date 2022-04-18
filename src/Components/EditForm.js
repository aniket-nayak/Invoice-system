import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditForm({
  ic,
  cpt,
  edit,
  editHandleClose,
  editChangeHandler,
  onChangeInv,
  onChangeCust,
  editSubmitHandler,
}) {
  return (
    <div>
      <Dialog
        open={edit}
        onClose={editHandleClose}
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle style={{ background: "#2E3B55" , color:"#FFFFFF" }}>EDIT</DialogTitle>
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
                  id="invoice_currency"
                  name="invoice_currency"
                  value={ic}
                  type="text"
                  label="Invoice Currency"
                  variant="filled"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  // onChange={editChangeHandler}
                  onChange={onChangeInv}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="cust_payment_terms"
                  name="cust_payment_terms"
                  type="text"
                  value={cpt}
                  label="Customer Payment Terms"
                  variant="filled"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  // onChange={editChangeHandler}
                  onChange={onChangeCust}
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
                  style={{ width: "45%", color:"#FFFFFF" ,borderColor:"#FFFFFF", marginRight:"2vmin" }}
                  type="submit"
                  onClick={editSubmitHandler}
                >
                  UPDATE
                </Button>
                <Button
                  variant="outlined"
                  style={{ width: "45%", color:"#FFFFFF" ,borderColor:"#FFFFFF" }}
                  onClick={editHandleClose}
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
