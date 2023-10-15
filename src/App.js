import logo from './logo.svg';
import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import AddCustomer from './AddCustomer';
import NavBar from './NavBar';
import Footer from './Footer';
import LoanForm from './LoanForm';
import AddCityName from './AddCityName';
import AddLineMan from './AddLineMan';
import AddReceipt from './Receipt';
import Ledger from './Reports/Ledger';

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignUp,
  UserButton,
  SignIn,
  useUser,
  ClerkLoading,
  RedirectToSignIn,
} from "@clerk/clerk-react";
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route
          path="/create"
          element={
            <>
              <ClerkLoading>
                <div>Clerk is loading</div>
              </ClerkLoading>
              <SignedIn>
                <AddCustomer />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/citycreate"
          element={
            <>
              <SignedIn>
                <AddCityName />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/linemancreate"
          element={
            <>
              <SignedIn>
                <AddLineMan />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/loan"
          element={
            <>
              <SignedIn>
                <LoanForm />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/receipt"
          element={
            <>
              <SignedIn>
                <AddReceipt />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/ledger"
          element={
            <>
              <SignedIn>
                <Ledger />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route index element={<Navigate to="/create" />} />
      </Routes>

    </ClerkProvider>
  );
}

function App() {
  return (
    <div className="app">
      <React.Fragment >
        <NavBar />
        <Router basename="/loan-app" >
          <ClerkProviderWithRoutes />
        </Router>
        <Footer />
      </React.Fragment>
    </div>
  );
}

export default App;
