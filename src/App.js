import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Company, CompanyTable } from "./pages/Company";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ToastProvider } from "react-toast-notifications";
import UserContextProvider from "./context/userContext";

const App = () => {
  return (
    <Router>
      <UserContextProvider>
        <ToastProvider autoDismiss autoDismissTimeout={2000}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/company" component={CompanyTable} />
            <Route exact path="/company/:BOMcode" component={Company} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </ToastProvider>
      </UserContextProvider>
    </Router>
  );
};

export default App;
