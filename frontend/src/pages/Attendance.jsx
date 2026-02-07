import {useEffect, useState} from "react";
import { getEmployees } from "../api/employee.api";
import { getAttendanceByEmployee } from "../api/attendance.api";

import AttendanceForm from "../components/attendance/AttendanceForm";
import AttendanceList from "../components/attendance/AttendanceList";

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEmployees = async () => {
        const res = await getEmployees();
        setEmployees(res.data);
    };

    const fetchAttendance = async (employeeId) => {
        setLoading(true);
        try {
            const res = await getAttendanceByEmployee(employeeId);
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
        <div style={{padding: "1.5rem"}}>
            <h2>Attendance Management</h2>

            <AttendanceForm 
                employees={employees}
                onAttendanceMarked={fetchAttendance}
            />

            <AttendanceList records = {records} loading={loading}/>
        </div>
    );
};


export default Attendance;