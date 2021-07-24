import React from "react";
import { Route, Redirect } from "react-router-dom";
import cookie from 'react-cookies'


export const ProtectedRouteUser = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {

        // const logindata = localStorage.getItem('userlogin') === 'true'
        const logindata = cookie.load('userlogin') === 'true';
  
      
        if (logindata) {

          var data=cookie.load('userdata');


          if(data.email_verification=='NotVerified'){
            return <Redirect to="/emailverification" />
          }else{
            return <Component {...props} />;
          }


        } else {

          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );

        }
      }}
    />
  );
};