import { lazy } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import AddAccessCams from "./pages/Cams/AddAccessCams";
import DetailsAccessCams from "./pages/Cams/DetailsAccessCams";
import ListAccessCams from "./pages/Cams/ListAccessCams";
import MyCams from "./pages/Cams/MyCams";
import ShowCams from "./pages/Cams/ShowCams";
import LogoutLoading from "./pages/Login/LogoutLoading";
import OnlyViewCams from "./pages/OnlyViewCams/OnlyViewCams";
import CreateUser from "./pages/User/CreateUser";
import ShowUsers from "./pages/User/ShowUsers";

const Login = lazy(()=>import("./pages/Login/Login"))
const LoginLoading = lazy(()=>import("./pages/Login/LoginLoading"))
const Home = lazy(()=>import("./pages/Home/Home"))





export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/validalogin/:token" element={<LoginLoading />} />
                <Route path="/logout" element={<LogoutLoading />} />
                <Route path="/onlyviewcams/:token" element={<OnlyViewCams />} />
                <Route path="/home/:token" element={<Home />}>
                    <Route path="user" element={<CreateUser />} />
                    <Route path="user/:userid" element={<CreateUser />} />
                    <Route path="users" element={<ShowUsers />} />

                    <Route path="cams" element={<ShowCams />} />
                    <Route path="mycams" element={<MyCams />} />
                    <Route path="addaccesscams" element={<AddAccessCams />} />
                    <Route path="listaccesscams" element={<ListAccessCams />} />
                    <Route path="detailsaccesscams/:token" element={<DetailsAccessCams />} />
                </Route>

            </Routes>

        </Router>
    )
}

