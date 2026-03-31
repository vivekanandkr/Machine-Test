import { Button, Col, Form, Row } from "react-bootstrap";
import PaginatedTable from "./components/PaginatedTable";
import StudentModal  from "./components/StudentModal";
import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

function App() {
    const [showModal, setShowModal] = useState(false);
    const [editStudentId, setEditStudentId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const handleOpen = () => { setEditStudentId(null); setShowModal(true); };
    const handleEdit = (id) => { setEditStudentId(id); setShowModal(true); };
    const handleClose = () => setShowModal(false);
    const handleSuccess = () => setRefreshKey((k) => k + 1);

    return (
        <>
            <h1>All Students</h1>
            <Row className="align-items-center">
                <Col md={6} sm={12}>
                    <Form.Control placeholder="Search students by name..." type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                </Col>
                <Col className="ms-auto mt-sm-2" md={"auto"} sm={12}>
                    <Button onClick={handleOpen} type="button">
                        Add New Student
                    </Button>
                </Col>
                <StudentModal  show={showModal} handleClose={handleClose} onSuccess={handleSuccess} studentId={editStudentId} />
            </Row>

            <PaginatedTable refreshKey={refreshKey} search={debouncedSearch} onEdit={handleEdit} onDeleted={handleSuccess} />
        </>
    );
}

export default App;
