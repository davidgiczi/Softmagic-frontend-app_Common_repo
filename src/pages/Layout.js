import { Outlet, Link } from "react-router-dom";

const Layout = () => {

return(
    <>
    <nav>
    <div>
    <p><Link to="/softmagic/links" className="Link-row"><font>Hasznos linkek</font></Link></p>
    <p><Link to="/softmagic/upload" className="Link-row"><font>Dokumentumok küldése</font></Link></p>
    <p><Link to="/softmagic/documents" className="Link-row"><font>Dokumentumtár</font></Link></p>
    </div>
    </nav>
    <Outlet />
    </>
)
};

export default Layout;