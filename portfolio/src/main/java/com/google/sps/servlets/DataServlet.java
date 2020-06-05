// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 
package com.google.sps.servlets;
 
import java.io.IOException;
import com.google.sps.data.Book;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
 
/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public final class DataServlet extends HttpServlet {

  private ArrayList<Book> library = new ArrayList<Book>();
  private final String[] test = {"Best Kept Secret", "Jeffrey Archer", "3", "1"};
  private ArrayList<String> comments = new ArrayList<String>();
//   for(String temp : test){
//       comments.add(temp);
//   }
 
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
   
    Book requestedBook = library.get(library.size()-1);
    String json = convertToJsonUsingGson(library);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
      String book_title = request.getParameter("title");
      String author = request.getParameter("author");
      Book temp = new Book(book_title, author);
      library.add(temp); 
      response.sendRedirect("/index.html");
  }
 
  private String convertToJson(ArrayList<String> text){
    String json = "{";
    json += "\"Title\": ";
    json += "\"" + text.get(0) + "\"";
    json += ", ";
    json += "\"Author\": ";
    json += "\"" + text.get(1) + "\"";
    json += ", ";
    json += "\"Upvotes\": ";
    json += "\"" + text.get(2) + "\"";
    json += ", ";
    json += "\"Downvotes\": ";
    json += "\"" + text.get(3) + "\"";
    json += "}";
    return json;
  }

  private String convertToJsonUsingGson(ArrayList<Book> text) {
    Gson gson = new Gson();
    String json = gson.toJson(text);
    return json;
  }
}
