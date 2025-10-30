import React, { Suspense, lazy, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  ClerkLoading,
  RedirectToSignIn
} from "@clerk/clerk-react";
import LedgerForm from './Reports/LedgerForm';


const ReceiptByImage = lazy(() => import('./ReceiptByImage'));
const AddCustomer = lazy(() => import('./AddCustomer'));
const NavBar = lazy(() => import('./NavBar'));
const Footer = lazy(() => import('./Footer'));
const LoanForm = lazy(() => import('./LoanForm'));
const AddCityName = lazy(() => import('./AddCityName'));
const AddLineMan = lazy(() => import('./AddLineMan'));
const AddReceipt = lazy(() => import('./Receipt'));
const Ledger = lazy(() => import('./Reports/LedgerForm'));
const LinecheckingReport = lazy(() => import('./Reports/LinecheckingReport'))
const TotalLedger = lazy(() => import('./Reports/totalLedger'));
const Receipt1 = lazy(() => import('./Receipt1'));
const Line = lazy(() => import('./AddLine'));
const UpdateBookCity=lazy(()=>import('./Settings/UpdateBookCity'))
const LinemanBookWise=lazy(()=>import('./Reports/LinemanBookWise'))
const GivenMoneyDetails=lazy(()=>import('./Reports/GivenMoneyDetailsReport'))
const Home=lazy(()=>import ('./Home'))
const AccountMaster=lazy(()=>import('./AccountMaster'))
const AccountEntry=lazy(()=>import('./AccountItems'))
const AccountReport=lazy(()=>import('./AccountReports'))
//const HelpPage=lazy(()=>import('./pages/HelpPage'))
const SectionCreate=lazy(()=>import('./AddSection'))
const SectionAssign=lazy(()=>import('./SectionAssign'))
//const CheckingSample=lazy(()=>import('./Reports/checkingsample'))
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const baseName = process.env.REACT_APP_LOAN_APP_BASE_NAME;
function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
      <Route
          path="/Home"
          element={
            <>
              <ClerkLoading>
                <div>Clerk is loading</div>
              </ClerkLoading>
              <SignedIn>
                <NavBar />
                <Home />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <ClerkLoading>
                <div>Clerk is loading</div>
              </ClerkLoading>
              <SignedIn>
                <NavBar />
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
                <NavBar />
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
                <NavBar />
                <AddLineMan />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/line"
          element={
            <>
              <SignedIn>
                <NavBar />
                <Line />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/section"
          element={
            <>
              <SignedIn>
                <NavBar />
                <SectionCreate />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/sectionassign"
          element={ <>
              <SignedIn>
                <NavBar />
                <SectionAssign />
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
                <NavBar />
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
                <NavBar />
                <AddReceipt />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path='/receipt1'
          element={
            <>
              <SignedIn>
                <NavBar />
                <Receipt1 />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
        <Route path='/receiptByImage'
          element={
            <>
              <SignedIn>
                <NavBar />
                <ReceiptByImage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
        <Route
          path="/ledger"
          element={
            <>

              <SignedIn>
                <NavBar />
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
                <NavBar />
                <LinecheckingReport />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/totalledger"
          element={
            <>
              <SignedIn>
                <NavBar />
                <TotalLedger />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route
          path="/updatebookcity"
          element={
            <>
              <SignedIn>
                <NavBar />
                <UpdateBookCity />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route
          path="/linemanbookcity"
          element={
            <>
              <SignedIn>
                <NavBar />
                <LinemanBookWise />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route
          path="/givenmoneydetails"
          element={
            <>
              <SignedIn>
                <NavBar />
                <GivenMoneyDetails />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route
          path="/accountmaster"
          element={
            <>
              <SignedIn>
                <NavBar />
                <AccountMaster />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route
          path="/accountentry"
          element={
            <>
              <SignedIn>
                <NavBar />
                <AccountEntry />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route
          path="/accountreport"
          element={
            <>
              <SignedIn>
                <NavBar />
                <AccountReport />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
         
        <Route index element={<Navigate to="/home" />} />
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

        <Router basename={baseName} >
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
