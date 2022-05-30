import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { Login, LoginLoading, LogoutLoading } from "./pages/Login/Login";
import { CreateUser, ShowUsers } from "./pages/User/User";
import { ListAccessCams, DetailsAccessCams, AddAccessCams, MyCams, ShowCams } from "./pages/Cams/Cams";
import { OnlyViewCams } from "./pages/OnlyViewCams/OnlyViewCams";

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

