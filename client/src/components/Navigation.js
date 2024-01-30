import { Link } from "react-router-dom"
const Navigation = () =>{
    return (
        <nav>
            <ul>
                <Link to={"/"}><li>Home</li></Link>
                {/* <li>Templates</li> */}
                <Link to={"/AddDevice"}
                ><li>Add Device</li></Link>
                {/* <li>Delete Items</li> */}
            </ul>
        </nav>
    )
}

export default Navigation