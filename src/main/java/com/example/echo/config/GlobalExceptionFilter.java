package com.example.echo.config;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = "/*", filterName = "GlobalExceptionFilter", dispatcherTypes = {DispatcherType.REQUEST, DispatcherType.ASYNC}, asyncSupported = true)
public class GlobalExceptionFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try{
            chain.doFilter(request, response);
        } catch (Exception e) {
            var msg = e.getMessage();
            // Customize the response sent to the client
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
            httpResponse.setContentType("application/json");
            httpResponse.getWriter().write("{\"error\": {\"code\": 500, \"message\": \"" + msg + "\"}}");
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void destroy() {}

}
