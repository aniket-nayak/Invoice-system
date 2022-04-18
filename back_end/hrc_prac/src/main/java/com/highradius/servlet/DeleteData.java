package com.highradius.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.*;
import java.util.HashMap;

import com.google.gson.Gson;
import com.highradius.crud.WinterCrud;

/**
 * Servlet implementation class DeleteData
 */
@WebServlet("/DeleteData")
public class DeleteData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteData() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String rc = "SET FOREIGN_KEY_CHECKS=0";
		try {
			HashMap<Object, Object> Response=new HashMap<Object, Object>();
			int sl_no =Integer.parseInt(request.getParameter("sl_no"));
			//int sl_no=48578;
			WinterCrud wc = new WinterCrud();
			Connection conn = wc.getConnection();
			PreparedStatement pst = conn.prepareStatement(rc);
	        pst.executeUpdate();
	        String query = "DELETE FROM winter_internship WHERE sl_no in (?)";
	        PreparedStatement statement = conn.prepareStatement(query);
	        statement.setInt(1,sl_no);
	        if(statement.executeUpdate()>0) {
	        	Response.put("update", true);
	        }else {
	        	Response.put("update", false);
	        }
	        Gson gson = new Gson();
	        response.setHeader("Access-Control-Allow-Origin", "*");
	        String responseData = gson.toJson(Response);
	        response.getWriter().append(responseData);
			
		}catch(Exception e) {
			System.out.println("Exception Occured");
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
