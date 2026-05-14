import React, { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { useStudents } from "../hooks/useStudents";
import { deleteStudent } from "../api/student.api";
import { showSuccess, showError, showConfirm } from "../utils/alert";
import Loader from "./Loader";
import moment from "moment";
import { BsFillCaretDownFill, BsFillCaretRightFill, BsFillTrashFill, BsPencilSquare, BsSortDown, BsSortUp, BsArrowDownUp } from "react-icons/bs";
import { StudentMarksRow, useExpandableMarks } from "./StudentMarksRow";

function PaginatedTable({ refreshKey, search, onEdit, onDeleted }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("");
    const rowsPerPage = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const handleSort = (column) => {
        if (sortBy === column) {
            setOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
        } else {
            setSortBy(column);
            setOrder("ASC");
        }
        setCurrentPage(1);
    };

    const renderSortIcon = (column) => {
        if (sortBy !== column) return <BsArrowDownUp size={12} className="ms-1 text-muted" />;
        return order === "ASC" ? <BsSortUp size={14} className="ms-1" /> : <BsSortDown size={14} className="ms-1" />;
    };

    const { students, total, loading } = useStudents({
        page: currentPage,
        limit: rowsPerPage,
        refreshKey,
        name: search,
        sortBy,
        order,
    });

    const totalPages = Math.ceil(total / rowsPerPage);
    const { expandedId, toggle } = useExpandableMarks();

    const handleDelete = async (id) => {
        const result = await showConfirm("This student will be permanently deleted.");
        if (!result.isConfirmed) return;
        try {
            const res = await deleteStudent(id);
            showSuccess(res?.message);
            onDeleted();
        } catch (err) {
            showError(err);
        }
    };

    return (
        <div className="mt-3">
            <div style={{ /*maxHeight: "65vh", overflowY: "auto"*/ }}>
            <Table className="mb-0" bordered hover>

                <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    <tr>
                        <th>Marks</th>
                        <th role="button" onClick={() => handleSort("name")}>Name {renderSortIcon("name")}</th>
                        <th role="button" onClick={() => handleSort("standard")}>Standard {renderSortIcon("standard")}</th>
                        <th role="button" onClick={() => handleSort("roll_no")}>Roll No {renderSortIcon("roll_no")}</th>
                        <th role="button" onClick={() => handleSort("date_of_birth")}>Date Of Birth {renderSortIcon("date_of_birth")}</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="7" className="text-center">
                                <Loader />
                            </td>
                        </tr>
                    ) : students.length > 0 ? (
                        students.map((student) => (
                            <React.Fragment key={student.id}>
                                <tr>
                                    <td>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggle(student.id);
                                            }}
                                        >
                                            {expandedId === student.id ? (
                                                <BsFillCaretDownFill size={24} className="text-secondary" />
                                            ) : (
                                                <BsFillCaretRightFill size={24} className="text-secondary" />
                                            )}
                                        </a>
                                    </td>
                                    <td>{student.name}</td>
                                    <td>{student.standard}</td>
                                    <td>{student.roll_no}</td>
                                    <td>{moment(student.date_of_birth).format("DD-MM-YYYY")}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onEdit(student.id);
                                            }}
                                        >
                                            <BsPencilSquare size={24} className="text-info" />
                                        </a>
                                        <a
                                            href="#"
                                            className="ms-3"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(student.id);
                                            }}
                                        >
                                            <BsFillTrashFill size={24} className="text-danger" />
                                        </a>
                                    </td>
                                </tr>
                                {expandedId === student.id && (
                                    <StudentMarksRow studentId={student.id} colSpan={7} />
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>
            <Table className="mb-0" bordered>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            <div>
                                {total ? (
                                    <div>
                                        Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, total)} of {total} entries
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </td>
                        <td colSpan={2}>
                            <Pagination style={{ justifySelf: "flex-end" }} className="m-0">
                                <Pagination.First onClick={() => setCurrentPage(1)} disabled={total === 0 || currentPage === 1} />
                                <Pagination.Prev disabled={total === 0 || currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                                <Pagination.Next disabled={total === 0 || currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
                                <Pagination.Last onClick={() => setCurrentPage(Math.ceil(total / rowsPerPage))} disabled={total === 0 || currentPage === Math.ceil(total / rowsPerPage)} />
                            </Pagination>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}

export default PaginatedTable;
