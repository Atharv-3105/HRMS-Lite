import {useState} from "react";
import {createEmployee} from "../../api/employee.api";

const EmployeeForm = ({onEmployeeAdded}) => {

    const [form, setForm] = useState({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await createEmployee(form);
            setForm({
                employee_id: "",
                full_name: "",
                email: "",
                department: "",
            });
            onEmployeeAdded();
        } catch(err) {
            setError(err.response?.data?.detal || "something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style = {{marginBottom: "2rem"}}>
            <h3>Add Employee</h3>

            <input name = "employee_id" placeholder="Employee ID"
                   value = {form.employee_id} onChange={handleChange} required
            />
            <br />

            <input name = "full_name" placeholder="Full Name"
                   value = {form.full_name} onChange={handleChange}
            />
            <br />

            <input name = "email" type="email" placeholder="Email"
                   value = {form.email} onChange={handleChange} required
            />
            <br />

            <input name = "department" placeholder = "Department"
                   value = {form.department} onChange={handleChange} required
            />
            <br />

            {error && <p style = {{color: "red"}}>{error}</p>}

            <button type = "submit" disabled = {loading}>
                {loading ? "Adding..." : "Add Employee"}
            </button>
        </form>
    );
};

export default EmployeeForm;