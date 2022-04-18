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

export default function AddForm({
  business_code,
  cust_number,
  clear_date,
  buisness_year,
  doc_id,
  posting_date,
  document_create_date,
  due_in_date,
  invoice_currency,
  document_type,
  posting_id,
  total_open_amount,
  baseline_create_date,
  cust_payment_terms,
  open,
  invoice_id,
  changeHandler,
  submitHandler,
  handleClose,
})
{
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="xl"TransitionComponent={Transition}
        keepMounted >
        <DialogTitle style={{ background: "#2E3B55" , color:"#FFFFFF" }}>Add</DialogTitle>
        <DialogContent style={{ background: "#2E3B55"}}>
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
              <Grid item xs={3}>
                <TextField
                  id="business_code"
                  name="business_code"
                  label="Business Code"
                  variant="filled"
                  value={business_code}
                  style={{ width: 300, background:"#FFFFFF", color:"grey" }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="cust_number"
                  name="cust_number"
                  value={cust_number}
                  label="Customer Number"
                  variant="filled"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="clear_date"
                  name="clear_date"
                  value={clear_date}
                  label="Clear Date"
                  variant="filled"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="buisness_year"
                  name="buisness_year"
                  value={buisness_year}
                  label="Bussiness Year"
                  variant="filled"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="doc_id"
                  name="doc_id"
                  value={doc_id}
                  label="Document Id"
                  variant="filled"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="posting_date"
                  name="posting_date"
                  value={posting_date}
                  label="Posting Date"
                  variant="filled"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="document_create_date"
                  name="document_create_date"
                  value={document_create_date}
                  label="Document Create Date"
                  variant="filled"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="due_in_date"
                  name="due_in_date"
                  value={due_in_date}
                  label="Due Date"
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="invoice_currency"
                  name="invoice_currency"
                  value={invoice_currency}
                  label="Invoice Currency"
                  variant="filled"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="document_type"
                  name="document_type"
                  value={document_type}
                  label="Document Type"
                  variant="filled"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="posting_id"
                  name="posting_id"
                  value={posting_id}
                  label="Posting Id"
                  variant="filled"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="total_open_amount"
                  name="total_open_amount"
                  value={total_open_amount}
                  label="Total Open Amount"
                  variant="filled"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="baseline_create_date"
                  name="baseline_create_date"
                  value={baseline_create_date}
                  label="Baseline Create Date"
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="cust_payment_terms"
                  name="cust_payment_terms"
                  value={cust_payment_terms}
                  label="Customer Payment Terms"
                  variant="filled"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="invoice_id"
                  name="invoice_id"
                  value={invoice_id}
                  label="Invoice Id"
                  variant="filled"
                  style={{ width: 300, background:"#FFFFFF", color:"grey"  }}
                  onChange={changeHandler}
                />
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 12, sm: 12, md: 12, lg: 6 }}
            >
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  style={{ width: "45%", color:"#FFFFFF" ,borderColor:"#FFFFFF", marginRight:"10vmin"}}
                  type="submit"
                  onClick={submitHandler}
                >
                  Add
                </Button>
                <Button
                  variant="outlined"
                  style={{ width: "45%",color:"#FFFFFF",borderColor:"#FFFFFF" }}
                  onClick={handleClose}
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
