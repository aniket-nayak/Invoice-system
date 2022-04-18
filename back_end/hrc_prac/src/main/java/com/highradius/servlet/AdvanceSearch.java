package com.highradius.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.highradius.crud.WinterCrud;
import com.highradius.pojo.WinterInternship;



/**
 * Servlet implementation class AdvanceSearch
 */
@WebServlet("/AdvanceSearch")
public class AdvanceSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdvanceSearch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setHeader("Access-Control-Allow-Origin", "*" );
		HashMap<Object,Object> value=new HashMap<Object,Object>();
		try {
			int cust_number = Integer.parseInt(request.getParameter("cust_number"));
			int invoice_id = Integer.parseInt(request.getParameter("invoice_id"));
			String doc_id = request.getParameter("doc_id");
			String buisness_year = request.getParameter("buisness_year");
			/*int cust_number=1930438491;
			int invoice_id = 1930438491;
			String doc_id = "200769623";
			String buisness_year ="2020";*/
			WinterCrud wc = new WinterCrud();
			WinterInternship data = wc.searchData(cust_number, doc_id, invoice_id, buisness_year);
			System.out.println(data);
			value.put("data", data);
				Gson gson=new Gson();
				String jsonresponse=gson.toJson(value);
				response.getWriter().append(jsonresponse);
			
			
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
