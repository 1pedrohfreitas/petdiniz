import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { CreateUser, ShowUsers } from "./pages/User/User";
import { AddAccessCams, MyCams, ShowCams } from "./pages/Cams/Cams";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home/:token" element={<Home />}>
                    <Route path="user" element={<CreateUser />} />
                    <Route path="user/:userid" element={<CreateUser />} />
                    <Route path="users" element={<ShowUsers />} />

                    <Route path="cams" element={<ShowCams />} />
                    <Route path="mycams" element={<MyCams />} />
                    <Route path="addaccesscams" element={<AddAccessCams />} />
                    
                </Route>

            </Routes>

        </Router>
    )
}