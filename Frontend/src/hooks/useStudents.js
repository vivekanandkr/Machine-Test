import { useEffect, useState } from "react";
import { getStudents } from "../api/student.api.js";

export const useStudents = (filters = { page: 1, limit: 10, refreshKey: 0 }) => {
    const [students, setStudents] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const { refreshKey: _, ...params } = filters;
                const cleanParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== "" && v != null));
                const res = await getStudents(cleanParams);
                if (!cancelled) {
                    setStudents(res?.data || []);
                    setTotal(res?.totalCount || 0);
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchStudents();
        return () => {
            cancelled = true;
        };
    }, [filters.page, filters.limit, filters.refreshKey, filters.name, filters.sortBy, filters.order]);

    return { students, total, loading };
};
