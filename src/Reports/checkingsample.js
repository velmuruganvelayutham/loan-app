import React, { useState, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";

const SimplePrintExampleWithHeader = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPrinting, setIsPrinting] = useState(false);

  // Sample data for records
  const records = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    date: `2025-01-${i + 1 < 10 ? "0" + (i + 1) : i + 1}`,
  }));

  const recordsPerPage = 10; // Number of records per page
  const totalPages = Math.ceil(records.length / recordsPerPage);

  // Handle print action
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print(); // Trigger print dialog
      setIsPrinting(false); // After print, stop printing mode
    }, 1000);
  };

  // Render a single page with header content
  const renderPage = (page) => {
    const startIndex = (page - 1) * recordsPerPage;
    const pageRecords = records.slice(startIndex, startIndex + recordsPerPage);

    return (
      <Fragment key={page}>
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2>Customer Record List</h2>
          <p>Printed on: {new Date().toLocaleDateString()}</p>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {pageRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ pageBreakAfter: "always" }}></div> {/* Ensure page breaks after each table */}
      </Fragment>
    );
  };

  return (
    <div>
      {/* Print Button */}
      <button onClick={handlePrint} className="btn btn-primary mb-3">
        Print All Pages
      </button>

      {/* Render pagination and current page view */}
      {!isPrinting ? (
        <div>
          {renderPage(currentPage)}

          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            />
          </Pagination>
        </div>
      ) : (
        // Render all pages for printing with header
        <div>
          {Array.from({ length: totalPages }, (_, i) => renderPage(i + 1))}
        </div>
      )}
    </div>
  );
};

export default SimplePrintExampleWithHeader;
