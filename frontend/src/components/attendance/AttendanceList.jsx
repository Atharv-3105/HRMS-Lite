import Loader from "../common/Loader";

const AttendanceList = ({records, loading}) => {
    if(loading) return <Loader/>

    if(!records.length) {
        return <p>No attendance records found.</p>;
    }

    return (
        <table border = "1" cellPadding="8" style = {{width: "100%"}}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {records.map((rec) => (
                    <tr key = {rec.id}>
                        <td>{rec.date}</td>
                        <td>{rec.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AttendanceList;