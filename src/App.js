import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Switch, Route,  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Proba from "./sajatosztalyok/Proba";
import Emlek from "./sajatosztalyok/Emlek"
import Adat_torles from "./sajatosztalyok/Adat_torles";
import Kulso from "./sajatosztalyok/Kulso";
import En from "./sajatosztalyok/en_szerkesztes";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser,  showAdminBoard } = this.state;

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        Én könyv
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/En">Én</Nav.Link>
          <Nav.Link href="/Kulso" >Külső tulajdonságok</Nav.Link>
          <Nav.Link href="/Emlek">Emlékek</Nav.Link>
          {showAdminBoard && (
          <NavDropdown title="Admin" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/Adat_torles">Emélkek törlése</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
         )}
        </Nav>

        {currentUser ? (

        <Nav>
          <Nav.Link
           href="/profile">
             {currentUser.username}
           </Nav.Link>

          <Nav.Link eventKey={2} href="/login" onClick={this.logOut}>
            Kijelentkezés
          </Nav.Link>
        </Nav>
        ) : (
          <Nav>
          <Nav.Link
           href="/login">
             Bejelenzkezés
           </Nav.Link>

          <Nav.Link eventKey={2} href="/register">
            Regisztráció
          </Nav.Link>
        </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>


        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/Proba" component={Proba} />
            <Route path="/Emlek" component={Emlek} />
            <Route path="/Adat_torles" component={Adat_torles} />
            <Route path="/Kulso" component={Kulso} />
            <Route path="/En" component={En} />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
