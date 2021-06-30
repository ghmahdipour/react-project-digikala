import React from 'react'
import { childRoutes }  from '../route'
import manageHOC from '../utils/manage'
import { Route, Redirect } from 'react-router-dom'

const Layout = () => {
  return (
    <React.Fragment>
        <Redirect to="/search"/>
        {childRoutes.map((route, index) => ( 
        <Route key={index} path={route.path} component={manageHOC(route.component)} exactly={route.exactly} />
        ))}
    </React.Fragment>
  );
};

export default Layout