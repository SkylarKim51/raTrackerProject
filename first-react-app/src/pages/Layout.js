import { Outlet, Link } from "react-router-dom";
import '.././index.css'

const Layout = () => {
    return(
        <>
        <div className="nav-area">
            <nav>
                {/* <ul className="navigation-items">
                    <li>
                        <Link to="/">Home </Link>
                    </li>
                    <li>
                        <Link to="/MakeEntry"> Make An Entry </Link>
                    </li>
                    <li>
                        <Link to="/Contact"> Contact</Link>
                    </li>
                </ul> */}
                <a href="/"> Home </a> |
                <a href="/MakeEntry"> Make An Entry  </a> |
                <a href="/MyEntries"> My Entries  </a> |
                <a href="/About"> About </a> |
                <a href="/Contact"> Contact </a>
            </nav>
        </div>
            <Outlet />
        </>
    )
};

export default Layout;