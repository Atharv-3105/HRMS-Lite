import Loader from "../common/Loader";

const EmployeeList = ({employees, loading, onDelete}) => {

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
                        <td>
                            <button onClick={() => onDelete(emp.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeList;