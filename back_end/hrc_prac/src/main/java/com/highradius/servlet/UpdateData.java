package com.highradius.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.crud.WinterCrud;

/**
 * Servlet implementation class UpdateData
 */
@WebServlet("/UpdateData")
public class UpdateData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateData() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setHeader("Access-Control-Allow-Origin", "*" );
		try {
			int sl_no = Integer.parseInt(request.getParameter("sl_no"));
			//int sl_no =2;
			String invoice_currency= request.getParameter("invoice_currency");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			//String invoice_currency= "CAD";
			//String cust_payment_terms = "NAN9";
			System.out.println(invoice_currency + cust_payment_terms);
			WinterCrud wc = new WinterCrud();
			Connection conn = wc.getConnection();
			String query = "UPDATE winter_internship SET invoice_currency = ?,  cust_payment_terms = ? WHERE sl_no = ?";
			PreparedStatement pst = conn.prepareStatement(query);
			pst.setString(1, invoice_currency);
			pst.setString(2, cust_payment_terms);
			pst.setInt(3, sl_no);
			pst.executeUpdate();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
