import { Link } from "react-router-dom"
const Navigation = () =>{
    return (
        <nav>
            <ul>
                <Link to={"/"}><li>Home</li></Link>
                <Link to={"/AddDevice"}><li>Add Device</li></Link>
                <Link to={"/SurplusList"}><li>Surplus List</li></Link>
                <Link to={"/SurplusForm"}><li>Surplus Form</li></Link>
                <Link to={"/QRCodes"}><li>QR Codes</li></Link>
            </ul>
        </nav>
    )
}

export default Navigation