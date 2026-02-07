import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/employee.api";
import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeList from "../components/employees/EmployeeList";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEmployees = async () => {
        setLoading(true);

        try {
            const res = await getEmployees();
            setEmployees(res.data);
        } catch (err) {
            console.error("failed to fetch employees");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        fetchEmployees();
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div style = {{padding: "1.5rem"}}>
            <h2>Employee Management</h2>

            <EmployeeForm onEmployeeAdded={fetchEmployees} />

            <EmployeeList 
                employees={employees} 
                loading={loading}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Employees;