import React, { useRef, useState ,useMemo} from "react";
import ReactToPrint from "react-to-print";

const SampleDynamic = ({ pendingLoans}) => {
  const printRef = useRef();
  const [isPrintMode, setIsPrintMode] = useState(false);
  const recordsPerPage = 35;
  // Function to render a single page
  const totalPages = useMemo(() => Math.ceil(pendingLoans.length / recordsPerPage), [pendingLoans]);
  const renderPage = (page) => {
    const startIndex = (page - 1) * recordsPerPage;
    const pageRecords = pendingLoans.slice(startIndex, startIndex + recordsPerPage);

    return (
      <div key={page} style={{ padding: "20px" }}>
        <h3 style={{ textAlign: "center" }}>Page {page}</h3>
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Start Date</th>
              <th>Loan Number</th>
              <th>Customer</th>
              <th>Relation Type</th>
              <th>Father Name</th>
              <th>Address</th>
              <th>Mobile No</th>
              <th>Finished Date</th>
              <th>Pending</th>
              <th>Due Pending</th>
            </tr>
          </thead>
          <tbody>
            {pageRecords?pageRecords.map((customer, index) => {
              const serialNo = startIndex + index + 1;
              const pending = customer.totalamount - customer.collectedtotal;
              const duePending = pending > 0 ? pending : "";

              return (
                <tr key={index}>
                  <td style={{ fontSize: "11px", textAlign: "center" }}>{serialNo}</td>
                  <td style={{ fontSize: "11px" }}>{customer.startdate}</td>
                  <td style={{ fontSize: "11px" }}>{customer.loannumber}</td>
                  <td style={{ fontSize: "11px" }}>{customer.customer}</td>
                  <td style={{ fontSize: "11px" }}>
                    {customer.relationtype === 0 ? "Father" : "Husband"}
                  </td>
                  <td style={{ fontSize: "11px" }}>{customer.fathername}</td>
                  <td style={{ fontSize: "11px" }}>{customer.address}</td>
                  <td style={{ fontSize: "11px" }}>{customer.mobileno}</td>
                  <td style={{ fontSize: "11px" }}>{customer.finisheddate}</td>
                  <td style={{ fontSize: "11px", textAlign: "center" }}>{pending}</td>
                  <td style={{ fontSize: "11px", textAlign: "center" }}>{duePending}</td>
                </tr>
              );
            }):null}
          </tbody>
        </table>
      </div>
    );
  };

  // Function to render all pages for printing
  const renderAllPages = () => {
    return (
      <div>
        {Array.from({ length: totalPages }, (_, index) => renderPage(index + 1))}
      </div>
    );
  };

  const handleBeforePrint = () => {
    setIsPrintMode(true); // Show print content
    setTimeout(() => {
        // Trigger the print dialog after a short delay
        window.print();
      }, 500); // Delay to allow content to render properly
  
  };

  const handleAfterPrint = () => {
    setIsPrintMode(false); // Hide print content after printing
  };

  return (
    <div>
      <h1>Paginated Print Example</h1>

      {/* Hidden container for printing */}
      <div
        ref={printRef}
        style={{
          display: isPrintMode ? "block" : "none", // Dynamically show/hide during printing
        }}
      >
        {renderAllPages()}
      </div>

      {/* Print Button */}
      
      <ReactToPrint
        trigger={() => (
          <button
            type="button"
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "blue",
              color: "white",
            }} 
          >
            Print All Pages
          </button>
        )}
        content={() => printRef.current}
        onBeforePrint={handleBeforePrint}
        onAfterPrint={handleAfterPrint}
      />
    </div>
  );
};

export default SampleDynamic;
