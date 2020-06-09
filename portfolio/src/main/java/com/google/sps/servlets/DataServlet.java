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
import com.google.sps.data.Globals;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
 
/** Servlet that handles all my received book data */
@WebServlet("/data")
public final class DataServlet extends HttpServlet {
    
 
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        List<Book> library = new ArrayList<>();
   
        List<Entity> results = getAllBooks(request, Globals.range);
        for(Entity entity : results){
            String book_title = (String) entity.getProperty("title");
            String author = (String) entity.getProperty("author");
            Book tempBook = new Book(book_title, author);
            library.add(tempBook);
        }


        Gson gson = new Gson();

        response.setContentType("application/json;");
        response.getWriter().println(gson.toJson(library));
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        try {
            String book_title = request.getParameter("title");
            String author = request.getParameter("author");
            Globals.range = request.getParameter("range");
            if(book_title.length() == 0 || author.length() == 0){
                response.sendRedirect("/recommendations.html");;
            }else{
                Book temp = new Book(book_title, author);
                Entity bookEntry = new Entity("Book");
                bookEntry.setProperty("title", book_title);
                bookEntry.setProperty("author", author);
                bookEntry.setProperty("number", temp.id);

                DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
                datastore.put(bookEntry);

            response.sendRedirect("/recommendations.html");
            }
        }catch(NullPointerException e) {
            System.out.println("NullPointerException thrown!");
            response.sendRedirect("/recommendations.html");
        }
    }

    private List<Entity> getAllBooks(HttpServletRequest request, String range){
        Query query = new Query("Book").addSort("number", SortDirection.DESCENDING);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery pq = datastore.prepare(query);
        int limit = Integer.parseInt(range);
        List<Entity> results = pq.asList(FetchOptions.Builder.withLimit(limit));
        return results;
  }
}