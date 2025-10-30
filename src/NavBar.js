import React from "react";
import { Navbar, Container, Nav, NavLink, NavItem } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { isFeatureReceiptByImageEnabled } from "./utils/constant";
import "./i18n";
import {
    SignedIn,
    UserButton
} from "@clerk/clerk-react";
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
            
        } else if(languageValue==="Home"){
            navigate('/home')
        }
        else if (languageValue === "Borrower") {
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
        else if (languageValue === "Receipt By No") {
            navigate("/receipt1");
        }
        else if (languageValue === "Receipt By Image") {
            navigate("/receiptByImage");
        }
        else if (languageValue === "Ledger") {
            navigate("/ledger");
        }
        else if (languageValue === "LineChecking") {
            navigate("/linechecking");
        }
        else if (languageValue === "TotalLedger") {
            navigate("/totalledger");
        }
        else if (languageValue === "Line") {
            navigate("/line")
        }
        else if (languageValue === "UpdateBookByCity") {
            navigate("/updatebookcity")
        }
        else if (languageValue === "LinemanBookWise") {
            navigate("/linemanbookcity")
        }
        else if (languageValue === "GivenMoneyDetails"){
            navigate("/givenmoneydetails")
        }
        else if (languageValue === "AccountMaster"){
            navigate("/accountmaster")
        }
        else if (languageValue === "AccountEntry"){
            navigate("/accountentry")
        }
        else if (languageValue === "AccountReport"){
            navigate("/accountreport")
        }
        else if (languageValue === "Section"){
            navigate("/section")
        }
        else if (languageValue === "Section Assign"){
            navigate("/sectionassign")
        }
        else if (languageValue === "Help"){
            navigate("/help")
        }
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" onSelect={handleSelect} >
            <Container>
                <Navbar.Brand href="#home" data-cypress-loan-app-id="app-customer-name" className="hide-on-print">{process.env.REACT_APP_LOAN_APP_CUSTOMER}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto" as="ul" >
                        <Nav.Link href="#">Home</Nav.Link>
                        
                        <NavDropdown title="Language" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">English</NavDropdown.Item>
                            <NavDropdown.Item href="#">Tamil</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Master" id="loan-app-nav-dropdown-master">
                            <NavDropdown.Item href="create">Borrower</NavDropdown.Item>
                            <NavDropdown.Item href="citycreate" id="loan-app-nav-dropdown-item-city">City</NavDropdown.Item>
                            <NavDropdown.Item href="linemancreate" id="loan-app-nav-dropdown-item-lineman">LineMan</NavDropdown.Item>
                            <NavDropdown.Item href="linecreate" id="loan-app-nav-dropdown-item-line">Line</NavDropdown.Item>
                            <NavDropdown.Item href="section" id="loan-app-nav-dropdown-item-section">Section</NavDropdown.Item>
                            <NavDropdown.Item href="sectionassign" id="loan-app-nav-dropdown-item-sectionassign">Section Assign</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Entry" id="loan-app-nav-dropdown-entry">
                            <NavDropdown.Item id="loan-app-dropdown-item-loan" href="loan">Loan</NavDropdown.Item>
                            <NavDropdown.Item id="loan-app-dropdown-item-receipt" href="receipt">Receipt</NavDropdown.Item>
                            <NavDropdown.Item id="loan-app-dropdown-item-receipt-by-no" href="receipt1">Receipt By No</NavDropdown.Item>
                            {isFeatureReceiptByImageEnabled() && (
                                <NavDropdown.Item id="loan-app-dropdown-item-receipt-by-image" href="receiptByImage">Receipt By Image</NavDropdown.Item>
                            )}
                        </NavDropdown>
                        <NavDropdown title="Report" id="basic-nav-dropdown">
                            <NavDropdown.Item href="ledger">Ledger</NavDropdown.Item>
                            <NavDropdown.Item href="linechecking">LineChecking</NavDropdown.Item>
                            <NavDropdown.Item href="updatebookcity">GivenMoneyDetails</NavDropdown.Item>
                            <NavDropdown.Item href="totalledger">TotalLedger</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Accounts" id="basic-nav-dropdown">
                            <NavDropdown.Item href="accountmaster">AccountMaster</NavDropdown.Item>
                            <NavDropdown.Item href="accountentry">AccountEntry</NavDropdown.Item>
                            <NavDropdown.Item href="accountreport">AccountReport</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item href="updatebookcity">UpdateBookByCity</NavDropdown.Item>
                            <NavDropdown.Item href="updatebookcity">LinemanBookWise</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="help" >
                            <NavDropdown.Item href="help">Help</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Item>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;