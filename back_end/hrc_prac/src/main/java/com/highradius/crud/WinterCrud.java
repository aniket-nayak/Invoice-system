package com.highradius.crud;
import java.sql.*;
import java.util.*;

import com.highradius.pojo.WinterInternship;

public class WinterCrud {
	static String URL="jdbc:mysql://localhost:3306/hrc?zeroDateTimeBehavior=convertToNull";
	static String USER="root";
	static String PASSWORD="root";
	public static Connection getConnection() {
		Connection conn=null;
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn=DriverManager.getConnection(URL, USER, PASSWORD);
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}catch(SQLException e) {
			e.printStackTrace();
		}
		System.out.println("Connection = "+ conn);
		return conn;
	}
	
	
	public ArrayList<WinterInternship> getAllData(){
		ArrayList<WinterInternship> intern = new ArrayList<>();
		try {
			
			Connection conn = getConnection();
			String sql = "SELECT * FROM winter_internship";
			PreparedStatement ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				WinterInternship wi = new WinterInternship();
				wi.setSl_no(rs.getInt("sl_no"));
				wi.setBusiness_code(rs.getString("business_code"));
				wi.setCust_number(rs.getInt("cust_number"));
				wi.setClear_date(rs.getString("clear_date"));
				wi.setBuisness_year(rs.getString("buisness_year"));
                wi.setDoc_id(rs.getString("doc_id"));
                wi.setPosting_date(rs.getString("posting_date"));
                wi.setDocument_create_date(rs.getString("document_create_date"));
                wi.setDocument_create_date1(rs.getString("document_create_date1"));
                wi.setDue_in_date(rs.getString("due_in_date"));
                wi.setInvoice_currency(rs.getString("invoice_currency"));
                wi.setDocument_type(rs.getString("document_type"));
                wi.setPosting_id(rs.getInt("posting_id"));
                wi.setTotal_open_amount(rs.getDouble("total_open_amount"));
                wi.setBaseline_create_date(rs.getString("baseline_create_date"));
                wi.setCust_payment_terms(rs.getString("cust_payment_terms"));
                wi.setInvoice_id(rs.getInt("invoice_id"));
                wi.setIsOpen(rs.getInt("isOpen"));
                wi.setAging_bucket(rs.getString("aging_bucket"));
                wi.setIs_deleted(rs.getInt("is_deleted"));
                
                intern.add(wi);
			}
			
		}catch(SQLException e) {
			
			e.printStackTrace();
			System.out.println("EXCEPTION OCCURED");
			
		}
		return intern;
	}
	public ArrayList<WinterInternship> getByCustomerId(int data) throws SQLException {
		ArrayList<WinterInternship> intern = new ArrayList<>();
		try {
			
			Connection conn = getConnection();
			String sql = "select * from winter_internship where cust_number is null or cust_number like '%"+(data)+"%'";
			PreparedStatement ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				WinterInternship wi = new WinterInternship();
				wi.setSl_no(rs.getInt("sl_no"));
				wi.setBusiness_code(rs.getString("business_code"));
				wi.setCust_number(rs.getInt("cust_number"));
				wi.setClear_date(rs.getString("clear_date"));
				wi.setBuisness_year(rs.getString("buisness_year"));
                wi.setDoc_id(rs.getString("doc_id"));
                wi.setPosting_date(rs.getString("posting_date"));
                wi.setDocument_create_date(rs.getString("document_create_date"));
                wi.setDocument_create_date1(rs.getString("document_create_date1"));
                wi.setDue_in_date(rs.getString("due_in_date"));
                wi.setInvoice_currency(rs.getString("invoice_currency"));
                wi.setDocument_type(rs.getString("document_type"));
                wi.setPosting_id(rs.getInt("posting_id"));
                wi.setTotal_open_amount(rs.getDouble("total_open_amount"));
                wi.setBaseline_create_date(rs.getString("baseline_create_date"));
                wi.setCust_payment_terms(rs.getString("cust_payment_terms"));
                wi.setInvoice_id(rs.getInt("invoice_id"));
                wi.setIsOpen(rs.getInt("isOpen"));
                wi.setAging_bucket(rs.getString("aging_bucket"));
                wi.setIs_deleted(rs.getInt("is_deleted"));
                
                intern.add(wi);
			}
			
		}catch(SQLException e) {
			
			e.printStackTrace();
			System.out.println("EXCEPTION OCCURED");
			
		}
		return intern;
	}
	
	public int insertData(WinterInternship w) {
		int status =0;
		String rc = "SET FOREIGN_KEY_CHECKS=0";
		try {
			Connection conn = getConnection();
			 String querry = "INSERT INTO winter_internship (business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency"
					 +",document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) values "
	                 +"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			 PreparedStatement pst = conn.prepareStatement(rc);
			 pst.executeUpdate();
			 
			 PreparedStatement ps = conn.prepareStatement(querry);
	            ps.setString(1, w.getBusiness_code());
	            ps.setInt(2, w.getCust_number());
	            ps.setString(3, w.getClear_date());
	            ps.setString(4, w.getBuisness_year());
	            ps.setString(5, w.getDoc_id());
	            ps.setString(6, w.getPosting_date());
	            ps.setString(7, w.getDocument_create_date());
	            ps.setString(8, w.getDue_in_date());
	            ps.setString(9, w.getInvoice_currency());
	            ps.setString(10, w.getDocument_type());
	            ps.setInt(11, w.getPosting_id());
	            ps.setDouble(12, w.getTotal_open_amount());
	            ps.setString(13, w.getBaseline_create_date());
	            ps.setString(14, w.getCust_payment_terms());
	            ps.setInt(15, w.getInvoice_id());
	            
	            status = ps.executeUpdate();
	            conn.close();

		}catch(SQLException e) {
			e.printStackTrace();
		}
		
		return status;
	}
	
	public WinterInternship searchData(int cust_number, String doc_id , int invoice_id, String buisness_year) {
        WinterInternship w;
        try {
            Connection conn = getConnection();
            String search_querry = "SELECT * FROM winter_internship WHERE doc_id = ? AND cust_number = ? AND invoice_id = ? AND buisness_year=?";
            PreparedStatement ps = conn.prepareStatement(search_querry);
            ps.setString(1, doc_id);
            ps.setInt(2, cust_number);
            ps.setInt(3, invoice_id);
            ps.setString(4, buisness_year);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                w = new WinterInternship();
                w.setSl_no(rs.getInt("sl_no"));
                w.setBusiness_code(rs.getString("business_code"));
                w.setCust_number(rs.getInt("cust_number"));
                w.setClear_date(rs.getString("clear_date"));
                w.setBuisness_year(rs.getString("buisness_year"));
                w.setDoc_id(rs.getString("doc_id"));
                w.setPosting_date(rs.getString("posting_date"));
                w.setDocument_create_date(rs.getString("document_create_date"));
                w.setDocument_create_date1(rs.getString("document_create_date1"));
                w.setDue_in_date(rs.getString("due_in_date"));
                w.setInvoice_currency(rs.getString("invoice_currency"));
                w.setDocument_type(rs.getString("document_type"));
                w.setPosting_id(rs.getInt("posting_id"));
                w.setTotal_open_amount(rs.getDouble("total_open_amount"));
                w.setBaseline_create_date(rs.getString("baseline_create_date"));
                w.setCust_payment_terms(rs.getString("cust_payment_terms"));
                w.setInvoice_id(rs.getInt("invoice_id"));
                w.setIsOpen(rs.getInt("isOpen"));
                w.setAging_bucket(rs.getString("aging_bucket"));
                w.setIs_deleted(rs.getInt("is_deleted"));
                return w;
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("exception occur");
        }
        w = null;
        return w;
    }
}
