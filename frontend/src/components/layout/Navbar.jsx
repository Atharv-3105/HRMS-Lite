import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            padding: "0.75rem 1.5rem",
            marginBottom: "1.5rem"
        }}>
            <NavLink to = "/employees" 
                     style={{marginRight: "1rem", fontWeight: 500}}>
                Employees
            </NavLink>
            <NavLink to = "/attendance"
                     style = {{fontWeight: 500}}>
                Attendance 
            </NavLink>
        </nav>
    );
};

export default Navbar;