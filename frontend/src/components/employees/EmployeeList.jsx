import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { getPresentDays } from "../../api/employee.api";

const EmployeeList = ({employees, loading, onDelete}) => {

    const [presentCounts, setPresentCounts] = useState({});

    useEffect(() => {
        const fetchCounts = async () => {
            const counts = {};
            for (const emp of employees) {
                try {
                    const res = await getPresentDays(emp.id);
                    counts[emp.id] = res.data;
                } catch {
                    counts[emp.id] = 0;
                }
            }
            setPresentCounts(counts);
        };

        if(employees.length) fetchCounts();
    }, [employees]);

    if( loading ) return <Loader />;

    if( !employees.length) {
        return <p>No employees added yet.</p>;
    }

    return (
        <table border = "1" cellPadding= "8" style = {{width: "100%"}}>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Present Days</th>
                    <th>Actions</th>
                </tr>
            </thead>


            <tbody>
                {employees.map((emp) => (
                    <tr key = {emp.id}>
                        <td>{emp.employee_id}</td>
                        <td>{emp.full_name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.department}</td>
                        <td>{presentCounts[emp.id] ?? "-"}</td>
                        <td>
                            <button stlye = {{backgroundColor: "#dc2626"}} 
                                    onClick={() => onDelete(emp.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeList;