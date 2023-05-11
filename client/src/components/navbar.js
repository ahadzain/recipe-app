import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'
import './navbar.css'

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();
    const handleLogout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth")
    }

    return (
        <div className="container navbar">
            <Link to={'/'} className="nav-link">Home</Link>
            <Link to={'/create-recipe'} className="nav-link">Create</Link>
            { !cookies.access_token ? (
                <Link to={'/auth'} className="nav-link">Login/Register</Link>
            ) : (
                <>
                    <Link to={'/saved-recipes'} className="nav-link">Saved</Link>
                    <button onClick={handleLogout} className="nav-btn">Logout</button>
                </>
            )}
        </div>
    )
}