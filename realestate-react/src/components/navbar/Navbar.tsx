import { Link } from "react-router-dom";
import './Navbar.css';

const NavBar = ({ user }: { user:any }) => {
    return (
        <nav className="nav-bar">
            <div className="nav-container">
                <Link to='/' className='nav-home'>SuperMegaXRealEstateHyper</Link>
            </div>
            <div className="nav-container">
                {
                    user ? (
                        <>
                            <Link to='/user'>{user.name}</Link>
                            <Link to='/logout'>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                        </>
                    )
                }
            </div>
        </nav>
    );
}

export default NavBar;