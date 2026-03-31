import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { getStudentMarks, createMark, updateMark, deleteMark } from "../api/student.api";
import { showSuccess, showError, showConfirm } from "../utils/alert";
import Loader from "./Loader";
import { BsFillTrashFill, BsPencilSquare, BsCheckLg, BsXLg } from "react-icons/bs";

const SUBJECTS = ["Hindi", "English", "Marathi", "Maths", "Science", "Social Science", "General Knowledge"];
const emptyForm = { subject: "", score: "" };

function StudentMarksRow({ studentId, colSpan }) {
    const [marks, setMarks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState(emptyForm);
    const [addForm, setAddForm] = useState(emptyForm);
    const [showAddRow, setShowAddRow] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchMarks = () => {
        setLoading(true);
        getStudentMarks(studentId)
            .then((res) => setMarks(res?.data || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        let cancelled = false;
        getStudentMarks(studentId)
            .then((res) => {
                if (!cancelled) setMarks(res?.data || []);
            })
            .catch(console.error)
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [studentId]);

    const handleAdd = async () => {
        if (!addForm.subject || addForm.score === "") return;
        setSaving(true);
        try {
            const res = await createMark(studentId, { subject: addForm.subject, score: Number(addForm.score) });
            showSuccess(res?.message);
            setAddForm(emptyForm);
            setShowAddRow(false);
            fetchMarks();
        } catch (err) {
            showError(err);
        } finally {
            setSaving(false);
        }
    };

    const handleEditStart = (mark) => {
        setEditingId(mark.id);
        setEditForm({ subject: mark.subject, score: mark.score });
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditForm(emptyForm);
    };

    const handleEditSave = async () => {
        setSaving(true);
        try {
            const res = await updateMark(editingId, { subject: editForm.subject, score: Number(editForm.score) });
            showSuccess(res?.message);
            setEditingId(null);
            setEditForm(emptyForm);
            fetchMarks();
        } catch (err) {
            showError(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await showConfirm("This mark will be permanently deleted.");
        if (!result.isConfirmed) return;
        try {
            const res = await deleteMark(id);
            showSuccess(res?.message);
            fetchMarks();
        } catch (err) {
            showError(err);
        }
    };

    const usedSubjects = marks ? marks.filter((m) => m.id !== editingId).map((m) => m.subject) : [];
    const availableSubjectsForAdd = SUBJECTS.filter((s) => !usedSubjects.includes(s));
    const availableSubjectsForEdit = SUBJECTS.filter((s) => !usedSubjects.includes(s) || s === editForm.subject);

    return (
        <tr>
            <td colSpan={colSpan} className="p-2 bg-light">
                {loading ? (
                    <div className="text-center p-3">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <Table size="sm" className="m-0" bordered>
                            <thead>
                                <tr className="table-light">
                                    <th>Subject</th>
                                    <th>Score</th>
                                    <th style={{ width: "120px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marks && marks.length > 0 ? (
                                    marks.map((mark) =>
                                        editingId === mark.id ? (
                                            <tr key={mark.id}>
                                                <td>
                                                    <Form.Select
                                                        size="sm"
                                                        value={editForm.subject}
                                                        onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                                                    >
                                                        {availableSubjectsForEdit.map((s) => (
                                                            <option key={s} value={s}>
                                                                {s}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        size="sm"
                                                        type="number"
                                                        min={0}
                                                        max={100}
                                                        value={editForm.score}
                                                        onChange={(e) => setEditForm({ ...editForm, score: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (!saving) handleEditSave();
                                                        }}
                                                    >
                                                        <BsCheckLg size={20} className="text-success" />
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="ms-2"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleEditCancel();
                                                        }}
                                                    >
                                                        <BsXLg size={18} className="text-secondary" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr key={mark.id}>
                                                <td>{mark.subject}</td>
                                                <td>{mark.score}</td>
                                                <td>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleEditStart(mark);
                                                        }}
                                                    >
                                                        <BsPencilSquare size={18} className="text-info" />
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="ms-2"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDelete(mark.id);
                                                        }}
                                                    >
                                                        <BsFillTrashFill size={18} className="text-danger" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ),
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center text-muted">
                                            No marks found
                                        </td>
                                    </tr>
                                )}

                                {showAddRow && (
                                    <tr>
                                        <td>
                                            <Form.Select
                                                size="sm"
                                                value={addForm.subject}
                                                onChange={(e) => setAddForm({ ...addForm, subject: e.target.value })}
                                            >
                                                <option value="">Select Subject</option>
                                                {availableSubjectsForAdd.map((s) => (
                                                    <option key={s} value={s}>
                                                        {s}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </td>
                                        <td>
                                            <Form.Control
                                                size="sm"
                                                type="number"
                                                min={0}
                                                max={100}
                                                placeholder="Score"
                                                value={addForm.score}
                                                onChange={(e) => setAddForm({ ...addForm, score: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!saving) handleAdd();
                                                }}
                                            >
                                                <BsCheckLg size={20} className="text-success" />
                                            </a>
                                            <a
                                                href="#"
                                                className="ms-2"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowAddRow(false);
                                                    setAddForm(emptyForm);
                                                }}
                                            >
                                                <BsXLg size={18} className="text-secondary" />
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        {!showAddRow && !editingId && availableSubjectsForAdd.length > 0 && (
                            <div className="mt-2">
                                <Button
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={() => {
                                        setEditingId(null);
                                        setShowAddRow(true);
                                    }}
                                >
                                    + Add Mark
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </td>
        </tr>
    );
}

export { StudentMarksRow };

export function useExpandableMarks() {
    const [expandedId, setExpandedId] = useState(null);

    const toggle = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    return { expandedId, toggle };
}
