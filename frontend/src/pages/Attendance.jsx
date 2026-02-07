import {useEffect, useState} from "react";
import { getEmployees } from "../api/employee.api";
import { getAttendanceByEmployee, getAttendanceByEmployeeAndDate } from "../api/attendance.api";

import AttendanceForm from "../components/attendance/AttendanceForm";
import AttendanceList from "../components/attendance/AttendanceList";

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filterDate, setFilterDate] = useState("");

    const fetchEmployees = async () => {
        const res = await getEmployees();
        setEmployees(res.data);
    };

    const fetchAttendance = async (employeeId) => {

        setSelectedEmployee(employeeId);
        setLoading(true);


        try {
            const res = filterDate
                ? await getAttendanceByEmployeeAndDate(employeeId, filterDate)
                : await getAttendanceByEmployee(employeeId);

            setRecords(res.data);
        }catch {
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div>
            <h2>Attendance Management</h2>

            <AttendanceForm 
                employees={employees}
                onAttendanceMarked={fetchAttendance}
            />

            {/* ====Date Filter=== */}
            {selectedEmployee && (
                <div style={{marginBottom : "1rem"}}>
                    <label>
                        Filter by date: &nbsp;
                        <input type = "date" value = {filterDate} 
                               onChange={(e) => setFilterDate(e.target.value)}
                        />
                    </label>
                    <button style = {{marginLeft: "0.5rem"}}
                            onClick={() => fetchAttendance(selectedEmployee)}
                    >
                        Apply!
                    </button>
                </div>
            )}

            <AttendanceList records = {records} loading={loading}/>
        </div>
    );
};


export default Attendance;