import { lazy } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
const AddAccessCams = lazy(()=>import("./pages/Cams/AddAccessCams"))
const DetailsAccessCams = lazy(()=>import("./pages/Cams/DetailsAccessCams"))
const ListAccessCams = lazy(()=>import("./pages/Cams/ListAccessCams"))
const MyCams = lazy(()=>import("./pages/Cams/MyCams"))
const ShowCams = lazy(()=>import("./pages/Cams/ShowCams")) 

const Login = lazy(()=>import("./pages/Login/Login"))
const LoginLoading = lazy(()=>import("./pages/Login/LoginLoading"))
const LogoutLoading = lazy(()=>import("./pages/Login/LogoutLoading"))
const Home = lazy(()=>import("./pages/Home/Home"))

const OnlyViewCams = lazy(()=>import("./pages/OnlyViewCams/OnlyViewCams"))

const CreateUser = lazy(()=>import("./pages/User/CreateUser"))
const ShowUsers = lazy(()=>import("./pages/User/ShowUsers"))



export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/validalogin/:token" element={<LoginLoading />} />
                <Route path="/logout/" element={<LogoutLoading />} />
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

