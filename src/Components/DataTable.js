import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";
import { visuallyHidden } from "@mui/utils";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import {
  getData,
  addForm,
  editForm,
  deleteForm,
  searchForm,
  advanceSearch,
} from "../Services/Data";
import DeleteDialog from "./DeleteDialog";
import AdvanceSearchForm from "./AdvanceSearchForm";
import axios from "axios";
import { AppBar, TextField, Toolbar } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  console.log(array, "array");
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "sl_no", label: "Sl No", width: 250, align: "right" },
  { id: "business_code", label: "Business Code", width: 250, align: "right" },
  {
    id: "cust_number",
    label: "Customer Number",
    minWidth: 170,
    align: "right",
  },
  {
    id: "clear_date",
    label: "Clear Date",
    minWidth: 170,
    align: "right",
  },
  {
    id: "buisness_year",
    label: "Buisness Year",
    minWidth: 170,
    align: "right",
  },
  {
    id: "doc_id",
    label: "Document Id",
    minWidth: 170,
    align: "right",
  },
  {
    id: "posting_date",
    label: "Posting Date",
    minWidth: 170,
    align: "right",
  },
  {
    id: "document_create_date",
    label: "Document Create Date",
    minWidth: 170,
    align: "right",
  },
  {
    id: "due_in_date",
    label: "Due Date",
    minWidth: 170,
    align: "right",
  },
  {
    id: "invoice_currency",
    label: "Invoice Currency",
    minWidth: 170,
    align: "right",
  },
  {
    id: "document_type",
    label: "Document Type",
    minWidth: 170,
    align: "right",
  },
  {
    id: "posting_id",
    label: "Posting Id",
    minWidth: 170,
    align: "right",
  },
  {
    id: "total_open_amount",
    label: "Total Open Amount",
    minWidth: 170,
    align: "right",
  },
  {
    id: "baseline_create_date",
    label: "Baseline Create Date",
    minWidth: 170,
    align: "right",
  },
  {
    id: "cust_payment_terms",
    label: "Customer Payment Terms",
    minWidth: 170,
    align: "right",
  },
  {
    id: "invoice_id",
    label: "Invoice Id",
    minWidth: 170,
    align: "right",
  },
  {
    id: "aging_bucket",
    label: "Aging Bucket",
    minWidth: 170,
    align: "right",
  },
];
const styleBody = makeStyles((theme) => ({
  root: {
    background: "#2E3B55",
    color: "#FFFFFF",
    "&:hover": {
      color: "#FFFFFF",
    },
  },
}));
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const styles = styleBody();

  return (
    <TableHead>
      <TableRow className={styles.root}>
        <TableCell padding="checkbox" className={styles.root}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
            style={{ color: "#FFFFFF" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ background: "#2E3B55", color: "#FFFFFF" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function DataTable() {
  const [selected, setSelected] = React.useState([]);
  const [cptField, setCptField] = React.useState("");
  const [icField, setIcField] = React.useState("");

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  //const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  //console.log(selected);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [data, setData] = useState([]);
  useEffect(async () => {
    setData(await getData());
  }, []);
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const [custarr, setcustarr] = useState([]);
  const [invarr, setinvarr] = useState([]);
  const handleClick = (event, name, cust_payment_terms, invoice_currency) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    let selectedCpt = [];
    let selectedIc = [];

    if (selectedIndex === -1) {
      selectedCpt = selectedCpt.concat(custarr, cust_payment_terms);
      selectedIc = selectedIc.concat(invarr, invoice_currency);
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      selectedCpt = selectedCpt.concat(custarr.slice(1));
      selectedIc = selectedIc.concat(invarr.slice(1));
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      selectedCpt = selectedCpt.concat(custarr.slice(0, -1));
      selectedIc = selectedIc.concat(invarr.slice(0, -1));
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      selectedCpt = selectedCpt.concat(
        custarr.slice(0, selectedIndex),
        custarr.slice(selectedIndex + 1)
      );
      selectedIc = selectedIc.concat(
        invarr.slice(0, selectedIndex),
        invarr.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    setcustarr(selectedCpt);
    setinvarr(selectedIc);
    setCptField(selectedCpt[0]);
    setIcField(selectedIc[0]);
    console.log(selectedCpt, "HHHH");
    console.log(selectedIc, "HHHH");
    console.log(newSelected, "HHHH");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const reload = () => {
    //window.location.reload(true);
    setData([]);
    axios
      .get("http://localhost:8080/hrc_prac/GetAllData")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const openAdvanceSearchHandler = () => {
    setOpenAdvanceSearch(true);
  };
  const closeAdvanceSearchHandler = () => {
    setOpenAdvanceSearch(false);
  };
  // const [searchData, setSearchData] = useState({
  //   customer_number: "",
  //   buisness_year: "",
  //   document_id: "",
  //   invoice_id: "",
  // });
  // const {
  //   cn,
  //   by,
  //   did,
  //   iid,
  // } = searchData;

  const searchChangeHandler = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };
  //console.log(searchData);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const openHandler = () => {
    setOpen(true);
  };
  const [addData, setAddData] = useState({
    business_code: "",
    cust_number: "",
    clear_date: "",
    buisness_year: "",
    doc_id: "",
    posting_date: "",
    document_create_date: "",
    due_in_date: "",
    invoice_currency: "",
    document_type: "",
    posting_id: "",
    total_open_amount: "",
    baseline_create_date: "",
    cust_payment_terms: "",
    invoice_id: "",
  });
  const {
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
    invoice_id,
  } = addData;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddData({ ...addData, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    let response = await addForm(addData);
    if (response) {
      setAddData({
        business_code: "",
        cust_number: "",
        clear_date: "",
        buisness_year: "",
        doc_id: "",
        posting_date: "",
        document_create_date: "",
        due_in_date: "",
        invoice_currency: "",
        document_type: "",
        posting_id: "",
        total_open_amount: "",
        baseline_create_date: "",
        cust_payment_terms: "",
        invoice_id: "",
      });
      setOpen(false);
    }
  };
  const [edit, setEdit] = React.useState(false);
  const editHandler = () => {
    setEdit(true);
  };
  const editHandleClose = () => {
    setEdit(false);
  };
  //console.log(icField, cptField);
  const [editData, setEditData] = useState({
    invoice_currency: icField,
    cust_payment_terms: cptField,
    sl_no: "",
  });
  const onChangeInv = (e) => {
    console.log(e.target.value, "e.target.value");
    setIcField(e.target.value);
  };

  const onChangeCust = (e) => {
    console.log(e.target.value, "e.target.value");
    setCptField(e.target.value);
  };
  const editChangeHandler = (e) => {
    const { name, value } = e.target;
    // console.log(name,value,'VALUE')
    setEditData({ ...editData, [name]: value, sl_no: sl });
  };

  const editSubmitHandler = async (e) => {
    e.preventDefault();
    let response = await editForm({
      invoice_currency: icField,
      cust_payment_terms: cptField,
      sl_no: sl,
    });
    if (response) {
      setEditData({
        invoice_currency: "",
        cust_payment_terms: "",
        sl_no: "",
      });
    }
    setEdit(false);
  };
  const sl = selected[0];
  //console.log(sl);

  const [deleteData, setDeleteData] = useState(false);
  const deleteHandler = () => {
    setDeleteData(true);
  };
  const deleteHandleClose = () => {
    setDeleteData(false);
  };
  //console.log(selected);
  console.log(selected[0]);
  console.log(cptField);
  console.log(icField);
  //const [deleteRows, setDeleteRows] = useState([selected[0]]);
  // console.log(deleteRows);

  const deleteSubmitHandler = async (e) => {
    e.preventDefault();
    let response = await deleteForm(selected);
    if (response) {
    }
    setDeleteData(false);
  };

  // dataField.map(n=>{setCpterms(n.cust_payment_terms)})
  // dataField.map(n=>{setIcurrency(n.invoice_currency)})
  console.log(icField, cptField, "HHHHHHHHHHHH");
  const [searchData, setSearchData] = React.useState({
    customer_number: "",
    buisness_year: "",
    document_id: "",
    invoice_id: "",
  });
  // const [data, setData] = React.useState([]);
  //console.log(data);
  const [openAdvanceSearch, setOpenAdvanceSearch] = useState(false);
  const advanceSearchSubmitHandler = async (e) => {
    e.preventDefault();
    let response = await advanceSearch(searchData);
    //console.log(response, searchData, "HELLO");
    if (response) {
      console.log([response.data]);
      if (response.data == undefined) {
        setData([]);
      } else {
        setData([response.data]);
      }
    } else {
      setData([]);
    }
    setSearchData({
      customer_number: "",
      buisness_year: "",
      document_id: "",
      invoice_id: "",
    });
    setOpenAdvanceSearch(false);
  };
  const [q, setQ] = React.useState("");
  const simpleSearch = async (e) => {
    e.preventDefault();
    setQ(e.target.value);
    let response = await searchForm(e.target.value);
    console.log(response, "HELLOOO");
    if (response.length > 0) {
      setData(response);
    } else {
      setData([]);
    }
  };

  //console.log(selected);
  return (
    <div>
      <AdvanceSearchForm
        searchData={searchData}
        openAdvanceSearch={openAdvanceSearch}
        openAdvanceSearchHandler={openAdvanceSearchHandler}
        closeAdvanceSearchHandler={closeAdvanceSearchHandler}
        searchChangeHandler={searchChangeHandler}
        advanceSearchSubmitHandler={advanceSearchSubmitHandler}
      />

      <AddForm
        open={open}
        addData={addData}
        handleClose={handleClose}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
      <EditForm
        edit={edit}
        selected={selected}
        editHandleClose={editHandleClose}
        editChangeHandler={editChangeHandler}
        editSubmitHandler={editSubmitHandler}
        onChangeInv={onChangeInv}
        onChangeCust={onChangeCust}
        cpt={cptField}
        ic={icField}
      />
      <DeleteDialog
        deleteData={deleteData}
        deleteHandleClose={deleteHandleClose}
        deleteSubmitHandler={deleteSubmitHandler}
      />
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <AppBar position="static" style={{ background: "#2E3B55" }}>
          <Toolbar variant="dense">
            <ButtonGroup size="large" aria-label="large button group">
              <Button
                variant="contained"
                style={{ maxWidth: "150px", minWidth: "150px" }}
              >
                PREDICT
              </Button>
              <Button variant="outlined" style={{ color: "#FFFFFF" }}>
                ANALYTICS VIEW 
              </Button>
              <Button
                variant="outlined"
                onClick={openAdvanceSearchHandler}
                style={{ color: "#FFFFFF" }}
              >
                ADVANCE SEARCH
              </Button>
              <Button
                variant="outlined"
                onClick={reload}
                style={{ mx: "20px" }}
              >
                <RefreshIcon color="primary" />
              </Button>
            </ButtonGroup>
            <TextField
              id="outlined-basic"
              label="Search Custumer Id"
              variant="filled"
              value={q}
              onChange={simpleSearch}
              style={{
                width: 250,
                background: "#FFFFFF",
                color: "grey",
                height: "3.5vh",
                margin: "2vh",
                paddingBottom: "3vh",
                decoration: "none",
                borderRadius: "5px",
              }}
            />
            <ButtonGroup
              size="large"
              aria-label="large button group"
            ></ButtonGroup>
            <Button
              variant="outlined"
              disabled={selected.length < 1 ? false : true}
              sx={{ mx: "30px" }}
              style={{
                maxWidth: "150px",
                maxHeight: "38px",
                minWidth: "150px",
                minHeight: "38px",
                color: "#FFFFFF",
              }}
              onClick={openHandler}
            >
              ADD
            </Button>
            <Button
              disabled={selected.length === 1 ? false : true}
              variant="outlined"
              sx={{ mx: "30px" }}
              onClick={editHandler}
              style={{
                maxWidth: "150px",
                maxHeight: "38px",
                minWidth: "150px",
                minHeight: "38px",
                color: "#FFFFFF",
              }}
            >
              EDIT
            </Button>
            <Button
              disabled={selected.length >= 1 ? false : true}
              variant="outlined"
              sx={{ mx: "30px" }}
              onClick={deleteHandler}
              style={{
                maxWidth: "150px",
                maxHeight: "38px",
                minWidth: "150px",
                minHeight: "38px",
                color: "#FFFFFF",
              }}
            >
              DELETE
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }} style={{ background: "#2E3B55" }}>
          {data.length > 0 ? (
            <TableContainer
              sx={{ minHeight: "65vh", maxHeight: "70vh" }}
              style={{ background: "#2E3B55" }}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={data.length}
                />

                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}

                  {stableSort(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data, index) => {
                      const isItemSelected = isSelected(data.sl_no);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      //console.log(data.sl_no)
                      // const variable =data.length;
                      // console.log(rowCount)
                      // if(data.length > 0){
                      return (
                        <TableRow
                          onClick={(event) =>
                            handleClick(
                              event,
                              data.sl_no,
                              data.cust_payment_terms,
                              data.invoice_currency
                            )
                          }
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={data.sl_no}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              onClick={(event) =>
                                handleClick(event, data.sl_no)
                              }
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              style={{ color: "#FFFFFF" }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.sl_no}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.business_code}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.cust_number}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.clear_date}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.buisness_year}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.doc_id}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.posting_date}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.document_create_date}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.due_in_date}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.invoice_currency}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.document_type}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.posting_id}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.total_open_amount}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.baseline_create_date}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.cust_payment_terms}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.invoice_id}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: "#FFFFFF" }}
                          >
                            {data.aging_bucket}
                          </TableCell>
                        </TableRow>
                      );
                      // }
                    })}
                  {emptyRows > 0 && (
                    <TableRow>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <div
                style={{
                  background: "#2E3B55",
                  color: "white",
                  fontSize: "40px",
                  alignItems: "center",
                  padding: "25vh 74vh",
                }}
              >
                <h1>NO DATA</h1>
              </div>
            </>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ color: "#FFFFFF" }}
          />
        </Paper>
      </Box>
    </div>
  );
}

export default DataTable;
