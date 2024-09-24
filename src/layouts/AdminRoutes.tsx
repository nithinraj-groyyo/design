import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AdminRoutes = () => {
    const userRole = JSON.parse(localStorage.getItem("roles") as string);

    // if (userRole && userRole?.role === "Admin" && userRole?.isActive) {
        return <Outlet />;
    // }

    // return <Navigate to="/unauthorized" />;
};

export default AdminRoutes;