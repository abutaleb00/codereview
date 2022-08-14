import React from "react";
import { Route } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

// let x, y, z;
export function match(x, y) {
  if (typeof x === "string" && typeof y === "object") {
    console.log(x, y.length);

    for (let i = 0; i < y.length; i++) {
      if (y[i].protectedurl === x) {
        return true;
      }
    }
    return false;
  }
  return false;
}

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  //console.log("in protected route", Component, rest);
  const loggedIn = localStorage.getItem("loggedIn");
  let listofUrls = JSON.parse(localStorage.getItem("webFeatures"));
  if (listofUrls !== null) {
    console.log("path", rest.path, listofUrls, match(rest.path, listofUrls));
    if (match(rest.path, listofUrls)) {
      return (
        <Route
          {...rest}
          render={(props) => {
            //console.log("props in protected Route", props);
            if (loggedIn === "true") {
              return <Component {...props} />;
            }
          }}
        />
      );
    } else {
      return (
        <>
          {confirmAlert({
            title: "Error Message",
            message: <p className="mod-p"> {"You are not Authorized"} </p>,
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  window.location.href = process.env.PUBLIC_URL + "/dashboard";
                },
              },
            ],
          })}
        </>
      );
    }
  } else {
    return (
      <Route
        {...rest}
        render={(props) => {
          //console.log("props in protected Route", props);
          if (loggedIn === "true") {
            return <Component {...props} />;
          }
        }}
      />
    );
  }
  // return (
  //   <Route
  //     {...rest}
  //     render={(props) => {
  //       //console.log("props in protected Route", props);
  //       if (loggedIn === "true") {
  //         return <Component {...props} />;
  //       } else {
  //         return (
  //           <Redirect
  //             to={{
  //               pathname: "/",
  //               state: {
  //                 from: props.location,
  //               },
  //             }}
  //           />
  //         );
  //       }
  //     }}
  //   />
  // );
};
