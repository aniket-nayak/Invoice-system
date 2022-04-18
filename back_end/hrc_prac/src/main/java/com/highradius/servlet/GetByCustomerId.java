package com.highradius.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.pojo.WinterInternship;
import com.highradius.crud.WinterCrud;
import com.google.gson.Gson;
import java.util.*;

/**
 * Servlet implementation class GetByCustomerId
 */
@WebServlet("/GetByCustomerId")
public class GetByCustomerId extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetByCustomerId() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		int custnum = Integer.parseInt(request.getParameter("cust_num"));
		WinterCrud wc = new WinterCrud();
		response.setHeader("Access-Control-Allow-Origin", "*" );
		try {
			ArrayList<WinterInternship> data = wc.getByCustomerId(custnum);
			Gson gson = new Gson();
			String responseData = gson.toJson(data);
			response.getWriter().print(responseData);
//			PrintWriter out = response.getWriter();
			
//	        out.write(responseData);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
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
