package com.example.echo.exceptions;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class GlobalExceptionFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try{
            chain.doFilter(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            // Customize the response sent to the client
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
            httpResponse.setContentType("application/json");
            httpResponse.getWriter().write("{\"error\": {\"code\": 500, \"message\": \"Internal Server Error\"}}");
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void destroy() {}

}
