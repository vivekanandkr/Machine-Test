import { useCallback, useState } from "react";
import { Modal, Button, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import { useCreateStudent } from "../hooks/useCreateStudent";
import { getStudentById } from "../api/student.api";
import Loader from "./Loader";
import moment from "moment";
import { showSuccess, showError } from "../utils/alert";

const emptyForm = { name: "", roll_no: "", standard: "", date_of_birth: "" };

function StudentModal({ show, handleClose, onSuccess, studentId }) {
    const { saveStudent, loading } = useCreateStudent();
    const [formData, setFormData] = useState(emptyForm);
    const [fetching, setFetching] = useState(false);
    const isEdit = Boolean(studentId);

    const onEnter = useCallback(() => {
        if (studentId) {
            setFetching(true);
            getStudentById(studentId)
                .then((res) => {
                    const s = res?.data || res;
                    setFormData({
                        name: s.name || "",
                        roll_no: s.roll_no || "",
                        standard: s.standard || "",
                        date_of_birth: s.date_of_birth ? moment(s.date_of_birth).format("YYYY-MM-DD") : "",
                    });
                })
                .catch(console.error)
                .finally(() => setFetching(false));
        } else {
            setFormData(emptyForm);
        }
    }, [studentId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await saveStudent(formData, studentId);
            handleClose();
            onSuccess();
            showSuccess(res?.message);
        } catch (err) {
            showError(err);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} onEnter={onEnter} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? "Edit Student" : "Add Student"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {fetching ? (
                    <Loader />
                ) : (
                    <Row>
                        <Col md={6}>
                            <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                                <Form.Control name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Name" />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel controlId="floatingInput" label="Roll No." className="mb-3">
                                <Form.Control name="roll_no" value={formData.roll_no} onChange={handleChange} type="number" min={1} placeholder="Roll No." />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel controlId="floatingSelect" label="Standard">
                                <Form.Select name="standard" value={formData.standard} onChange={handleChange} aria-label="Standard">
                                    <option>Select Standard</option>
                                    <option value="1st">1st</option>
                                    <option value="2nd">2nd</option>
                                    <option value="3rd">3rd</option>
                                    <option value="4th">4th</option>
                                    <option value="5th">5th</option>
                                    <option value="6th">6th</option>
                                    <option value="7th">7th</option>
                                    <option value="8th">8th</option>
                                    <option value="9th">9th</option>
                                    <option value="10th">10th</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel controlId="floatingInput" label="Date Of Birth" className="mb-3">
                                <Form.Control name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} type="date" placeholder="Date Of Birth" max={new Date().toISOString().split("T")[0]} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                <Button variant="primary" onClick={handleSubmit} disabled={loading || fetching}>
                    {loading ? "Saving..." : isEdit ? "Update" : "Save"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StudentModal;
