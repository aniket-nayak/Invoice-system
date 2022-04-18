import axios from "axios"


export const getData = async () => {
    let response = await axios.get("http://localhost:8080/hrc_prac/GetAllData");
    //console.log(response.data);
    return response.data;
}

export const addForm=async({business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id})=>{
    let data="business_code="+business_code+"&cust_number="+cust_number+"&clear_date="+clear_date+"&buisness_year="+buisness_year+"&doc_id="+doc_id+"&posting_date="+posting_date+"&document_create_date="+document_create_date+"&due_in_date="+due_in_date+"&invoice_currency="+invoice_currency+"&document_type="+document_type+"&posting_id="+posting_id+"&total_open_amount="+total_open_amount+"&baseline_create_date="+baseline_create_date+"&cust_payment_terms="+cust_payment_terms+"&invoice_id="+invoice_id;
    let response=await axios.get("http://localhost:8080/hrc_prac/InsertData?"+data);
    return response.data;
}
export const searchForm=async( cust_number)=>{
    console.log(cust_number)
    let data="cust_num="+cust_number;
    let response=await axios.get("http://localhost:8080/hrc_prac/GetByCustomerId?"+data);
    return response.data;
}
export const editForm=async({invoice_currency,cust_payment_terms,sl_no})=>{
    //let data="invoice_currency="+invoice_currency+"&cust_payment_terms="+cust_payment_terms+"&sl_no="+sl_no;
    //console.log(data);
    let response=await axios.get(`http://localhost:8080/hrc_prac/UpdateData?invoice_currency=${invoice_currency}&cust_payment_terms=${cust_payment_terms}&sl_no=${sl_no}`);
    return response.data;
}

export const deleteForm = async(sl_no)=>{
    let data = "sl_no="+sl_no;
    if(sl_no.length===1){
        let response= await axios.get("http://localhost:8080/hrc_prac/DeleteData?"+data);
        return response.data;
    }else{
        sl_no.map(async (n)=>{
            let response= await axios.get("http://localhost:8080/hrc_prac/DeleteData?sl_no="+n);
            return response.n;
        })
    }
   
}

export const advanceSearch = async({customer_number, document_id, invoice_id, buisness_year})=>{
    let data ="doc_id="+document_id+"&cust_number="+ customer_number+"&invoice_id="+invoice_id+"&buisness_year="+buisness_year;
    console.log(data);
    let response=await axios.get("http://localhost:8080/hrc_prac/AdvanceSearch?"+data);
    console.log(response.data);
    return response.data;
}