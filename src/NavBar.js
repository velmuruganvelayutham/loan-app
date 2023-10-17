import React from "react";
import { Button, Navbar, Container, Nav, NavLink } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import "./i18n";

function NavBar() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const handleSelect = (eventKey, e) => {
        e.preventDefault();
        console.log(`selected ${eventKey}`, e, e.target.innerText);
        const languageValue = e.target.innerText;
        if (languageValue === "English") {
            i18n.changeLanguage('en');
        } else if (languageValue === "Tamil") {
            i18n.changeLanguage('ta');
        } else if (languageValue === "Borrower") {
            navigate(`/create`);
        }
        else if (languageValue === "City") {
            navigate("/citycreate");
        }
        else if (languageValue === "LineMan") {
            navigate("/linemancreate");
        }
        else if (languageValue === "Loan") {
            navigate("/loan");
        }
        else if (languageValue === "Receipt") {
            navigate("/receipt");
        }
        else if (languageValue === "Ledger") {
            navigate("/ledger");
        }
        else if (languageValue === "LineChecking") {
            navigate("/linechecking");
        }
        

    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" onSelect={handleSelect} >
            <Container>
                <Navbar.Brand href="#home">Loan App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto" as="ul" >
                        <Nav.Item><Nav.Link as={NavLink} to="/create">Home</Nav.Link></Nav.Item>
                        <NavDropdown title="Language" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">English</NavDropdown.Item>
                            <NavDropdown.Item href="#">Tamil</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Master" id="basic-nav-dropdown">
                            <NavDropdown.Item href="create">Borrower</NavDropdown.Item>
                            <NavDropdown.Item href="citycreate">City</NavDropdown.Item>
                            <NavDropdown.Item href="linemancreate">LineMan</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Entry" id="basic-nav-dropdown">
                            <NavDropdown.Item href="loan">Loan</NavDropdown.Item>
                            <NavDropdown.Item href="receipt">Receipt</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Report" id="basic-nav-dropdown">
                            <NavDropdown.Item href="ledger">Ledger</NavDropdown.Item>
                            <NavDropdown.Item href="linechecking">LineChecking</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;