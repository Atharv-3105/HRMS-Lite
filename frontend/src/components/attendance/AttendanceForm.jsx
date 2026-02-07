import {useState} from "react";
import { markAttendance } from "../../api/attendance.api";

const AttendanceForm = ({employees, onAttendanceMarked}) => {
    const [form, setForm] = useState({
        employee_id: "",
        date: "",
        status: "Present",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await markAttendance({
                employee_id: Number(form.employee_id),
                date: form.date,
                status: form.status,
            });
            onAttendanceMarked(form.employee_id);
        } catch (err) {
            setError(err.response?.data?.detail || "failed to mark attendance");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit = {handleSubmit} style = {{marginBottom: "2rem"}}>
            <h3>Mark Attendance</h3>

            <select 
                name = "employee_id"
                value = {form.employee_id}
                onChange={handleChange}
                required
            >

                <option value = "">Select Employee</option>
                {employees.map((emp) => (
                    <option key = {emp.id} value = {emp.id}>
                        {emp.full_name} ({emp.employee_id})
                    </option>
                ))}
            </select>
            <br/>

            <input 
                type = "date"
                name = "date"
                value = {form.date}
                onChange={handleChange}
                required
            />
            <br/>

            <select 
                name = "status"
                value = {form.status}
                onChange = {handleChange}
            >
                <option value = "Present">Present</option>
                <option value = "Absent">Absent</option>
            </select>
            <br/>

            {error && <p style = {{color : "red"}}>{error}</p>}

            <button type = "submit" disabled = {loading}>
                {loading ? "Saving...": "Mark Attendance"}
            </button>
        </form>
    );
};

export default AttendanceForm;