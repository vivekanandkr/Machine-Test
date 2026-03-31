import { useState } from "react";
import { createStudent, updateStudent } from "../api/student.api.js";

export const useCreateStudent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const saveStudent = async (payload, id) => {
        setLoading(true);
        setError(null);

        const cleaned = Object.fromEntries(
            Object.entries(payload).filter(([, v]) => v !== "")
        );

        try {
            const res = id ? await updateStudent(id, cleaned) : await createStudent(cleaned);
            return res;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { saveStudent, loading, error };
};
