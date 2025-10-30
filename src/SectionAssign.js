import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col,Badge } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "./utils/constant";
import PlaceHolder from "./components/spinner/placeholder";
import { useTranslation } from "react-i18next";
import { useAuth } from "@clerk/clerk-react";

function SectionAssign() {
  const { getToken } = useAuth();
  const { t } = useTranslation();
  
  const [sections, setSections] = useState([]);
  const [linemen, setLinemen] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedLinemen, setSelectedLinemen] = useState([]);
  const [sectionAssignments, setSectionAssignments] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch sections
  useEffect(() => {
    async function fetchSections() {
      try {
        setIsLoading(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get(`${baseURL}/section/get`);
        setSections(res.data);
        setIsLoading(false);
        setErrorMessage("");
      } catch (error) {
        console.log("Error fetching sections:", error);
        setErrorMessage("Error loading sections");
        setIsLoading(false);
      }
    }
    fetchSections();
  }, [getToken]);

  // Fetch linemen
  useEffect(() => {
    async function fetchLinemen() {
      try {
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get(`${baseURL}/linemancreate/get`);
        setLinemen(res.data);
        setErrorMessage("");
      } catch (error) {
        console.log("Error fetching linemen:", error);
        setErrorMessage("Error loading linemen");
      }
    }
    fetchLinemen();
  }, [getToken]);

  // Fetch section assignments
  useEffect(() => {
    async function fetchAssignments() {
      try {
        setIsLoading(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get(`${baseURL}/sectionassign/get`);
        setSectionAssignments(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching assignments:", error);
        setIsLoading(false);
      }
    }
    fetchAssignments();
  }, [updateUI, getToken]);

  // Handle lineman selection/deselection
  const handleLinemanToggle = (linemanId) => {
    if (selectedLinemen.includes(linemanId)) {
      setSelectedLinemen(selectedLinemen.filter(id => id !== linemanId));
    } else {
      setSelectedLinemen([...selectedLinemen, linemanId]);
    }
  };

  // Handle form submission (Save or Update)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (selectedSection === "" || selectedLinemen.length === 0) {
      alert("Please select a section and at least one lineman");
      setValidated(true);
      return;
    }

    try {
      setIsLoading(true);
      const token = await getToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      if (editMode) {
        // Update existing assignment
        await axios.put(`${baseURL}/sectionassign/update/${editId}`, {
          section_id: selectedSection,
          linemen_ids: selectedLinemen
        });
        alert("Assignment updated successfully!");
      } else {
        // Create new assignment
        await axios.post(`${baseURL}/sectionassign/save`, {
          section_id: selectedSection,
          linemen_ids: selectedLinemen
        });
        alert("Section assigned successfully!");
      }

      setIsLoading(false);
      setSelectedSection("");
      setSelectedLinemen([]);
      setValidated(false);
      setEditMode(false);
      setEditId(null);
      setUpdateUI(prev => !prev);
      setErrorMessage("");
    } catch (error) {
      console.log("Error saving assignment:", error);
      setErrorMessage(editMode ? "Error updating assignment" : "Error saving section assignment");
      setIsLoading(false);
    }
  };

  // Handle edit assignment
  const handleEdit = (assignment) => {
    setEditMode(true);
    setEditId(assignment._id);
    setSelectedSection(assignment.section_id);
    setSelectedLinemen(assignment.linemen_ids);
    setValidated(false);
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditMode(false);
    setEditId(null);
    setSelectedSection("");
    setSelectedLinemen([]);
    setValidated(false);
  };

  // Handle delete assignment
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        setIsLoading(true);
        const token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.delete(`${baseURL}/sectionassign/delete/${id}`);
        setUpdateUI(prev => !prev);
        setIsLoading(false);
        alert("Assignment deleted successfully!");
      } catch (error) {
        console.log("Error deleting assignment:", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <Container className="py-4">
      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <h2 className="text-center mb-4" style={{ color: '#333' }}>
          {editMode ? '✏️ '+t('editsectionassineditheader') : t('sectionassinheader')}
        </h2>
        
        
        
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <PlaceHolder />
        ) : (
          <>
            {/* Assignment Form */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: '600', color: '#495057' }}>
                      {t('section')} <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      required
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      style={{ fontSize: '14px' }}
                    >
                      <option value="">-- {t('section')} --</option>
                      {sections.map((section) => (
                        <option key={section._id} value={section._id}>
                          {section.sectionname}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {t('section')} {t('required')}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label style={{ fontWeight: '600', color: '#495057' }}>
                    {t('selectlinemen')} <span className="text-danger">*</span> 
                  </Form.Label>
                  <div 
                    className="border rounded p-3" 
                    style={{ 
                      maxHeight: '300px', 
                      overflowY: 'auto',
                      backgroundColor: '#f8f9fa',
                      border: '1px solid #dee2e6'
                    }}
                  >
                    {linemen.length === 0 ? (
                      <p className="text-muted mb-0">No linemen available</p>
                    ) : (
                      linemen.map((lineman) => (
                        <div 
                          key={lineman._id}
                          className="p-2 mb-2 rounded"
                          style={{ 
                            backgroundColor: selectedLinemen.includes(lineman._id) ? '#e7f3ff' : '#fff',
                            border: '1px solid #dee2e6',
                            transition: 'all 0.2s'
                          }}
                        >
                          <Form.Check
                            type="checkbox"
                            id={`lineman-${lineman._id}`}
                            label={`${lineman.linemanname} - ${lineman.mobileno || 'N/A'}`}
                            checked={selectedLinemen.includes(lineman._id)}
                            onChange={() => handleLinemanToggle(lineman._id)}
                            style={{ fontSize: '14px', color: '#212529' }}
                          />
                        </div>
                      ))
                    )}
                  </div>
                  {selectedLinemen.length === 0 && validated && (
                    <div className="text-danger small mt-1">
                      Please select at least one lineman.
                    </div>
                  )}
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
                  <div className="p-3 bg-light rounded border">
                    <strong style={{ color: '#495057' }}>Selected: </strong>
                    {selectedLinemen.length > 0 ? (
                      selectedLinemen.map((id) => {
                        const lineman = linemen.find(l => l._id === id);
                        return lineman ? (
                          <Badge bg="success" className="me-2 mb-1" key={id} style={{ fontSize: '13px' }}>
                            {lineman.linemanname}
                          </Badge>
                        ) : null;
                      })
                    ) : (
                      <span className="text-muted">None</span>
                    )}
                    <div className="mt-2 small text-muted">
                      {selectedLinemen.length} lineman(s) selected
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button 
                    variant={editMode ? "primary" : "success"} 
                    type="submit" 
                    disabled={isLoading} 
                    className="me-2"
                  >
                    {isLoading ? (editMode ? 'Updating...' : 'Saving...') : (editMode ? '✓'+(t('updateassignment')) : '✓ '+(t('assignsection')))}
                  </Button>
                  {editMode && (
                    <Button 
                      variant="warning" 
                      onClick={handleCancel}
                      className="me-2"
                    >
                      ✕ {t('canceledit')}
                    </Button>
                  )}
                  <Button 
                    variant="outline-secondary" 
                    onClick={handleCancel}
                  >
                    ✕ {t('newbutton')}
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </div>

      {/* Display Assignments */}
      <div className="bg-white rounded shadow-sm p-4">
        <h4 className="mb-3" style={{ color: '#333' }}>{t('currentassignments')}</h4>
        
        {sectionAssignments.length === 0 ? (
          <p className="text-muted">No assignments found</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover" style={{ backgroundColor: '#fff' }}>
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr>
                  <th style={{ color: '#495057', fontWeight: '600' }}>#</th>
                  <th style={{ color: '#495057', fontWeight: '600' }}>{t('section')}</th>
                  <th style={{ color: '#495057', fontWeight: '600' }}>{t('assignedlinemen')}</th>
                  <th style={{ color: '#495057', fontWeight: '600' }}>{t('tableaction')}</th>
                </tr>
              </thead>
              <tbody>
                {sectionAssignments.map((assignment, index) => (
                  <tr key={assignment._id}>
                    <td>{index + 1}</td>
                    <td style={{ fontWeight: '500' }}>{assignment.sectionname || 'N/A'}</td>
                    <td>
                      {assignment.linemen && assignment.linemen.length > 0 ? (
                        assignment.linemen.map((lineman, idx) => (
                          <Badge bg="primary" className="me-1 mb-1" key={idx} style={{ fontSize: '12px' }}>
                            {lineman.linemanname}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted">No linemen assigned</span>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEdit(assignment)}
                        className="me-2"
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(assignment._id)}
                      >
                        🗑 Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
}

export default SectionAssign;
