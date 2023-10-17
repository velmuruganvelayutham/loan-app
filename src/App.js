import logo from './logo.svg';
import React, { Suspense, lazy } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, Link } from "react-router-dom";
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
import LedgerForm from './Reports/LedgerForm';
const AddCustomer = lazy(() => import('./AddCustomer'));
const NavBar = lazy(() => import('./NavBar'));
const Footer = lazy(() => import('./Footer'));
const LoanForm = lazy(() => import('./LoanForm'));
const AddCityName = lazy(() => import('./AddCityName'));
const AddLineMan = lazy(() => import('./AddLineMan'));
const AddReceipt = lazy(() => import('./Receipt'));
const Ledger = lazy(() => import('./Reports/LedgerForm'));
const LinecheckingReport=lazy(()=>import('./Reports/LinecheckingReport'))

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
                <LedgerForm />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/linechecking"
          element={
            <>
              <SignedIn>
                <LinecheckingReport />
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

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

function App() {
  return (
    <div className="app">
      <React.Fragment >
       
        <Router basename="/loan-app" >
        <NavBar/>
          <Suspense fallback={<Loading />}>
            <ClerkProviderWithRoutes />
          </Suspense>
        </Router>
        <Footer />
      </React.Fragment>
    </div>
  );
}

export default App;
