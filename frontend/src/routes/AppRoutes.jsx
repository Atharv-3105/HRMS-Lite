import {Routes, Route, Navigate} from "react-router-dom";
import Employees from "../pages/Employees";
import Attendance from "../pages/Attendance";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path = "/" element = {<Navigate to = "/employees" />} />
            <Route path = "/employees" element = {<Employees/>} />
            <Route path = "/attendance" element = {<Attendance />} />
        </Routes>
    );
};

export default AppRoutes;