import React from "react";
import { Route, Redirect } from "react-router-dom";
import useUser from 'hooks/useUser';

const PrivateRoute = (props) => {

  const { isAuthenticated } = useUser();
  return isAuthenticated ?
    (<Route path={props.path} exact={props.exact} component={props.component} />)
    : (<Redirect to="/login" />);

};
export default PrivateRoute;