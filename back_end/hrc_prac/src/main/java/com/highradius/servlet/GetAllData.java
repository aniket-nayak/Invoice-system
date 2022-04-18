package com.highradius.servlet;

import java.io.IOException;
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
 * Servlet implementation class GetAllData
 */
@WebServlet("/GetAllData")
public class GetAllData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetAllData() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		WinterCrud wc = new WinterCrud();
		ArrayList<WinterInternship> data = wc.getAllData();
		Gson gson  = new Gson();
		String responseData = gson.toJson(data);
		response.setHeader("Access-Control-Allow-Origin", "*" );
		response.getWriter().print(responseData);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
