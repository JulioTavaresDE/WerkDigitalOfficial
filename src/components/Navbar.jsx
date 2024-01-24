import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div>
        <ul>
            <li>
                <Link to="/">Login</Link>
            </li>
        
            
            <li>
                <Link to="/Home">Home</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar