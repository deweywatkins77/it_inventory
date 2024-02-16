import { useQuery } from "@apollo/client"
import { getSurplus } from "../utils/queries";
import "../styles/surplusform.css"

const SurplusForm =()=>{
    const { loading, error, data } = useQuery(getSurplus);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    const surplusItems = data.getSurplus
    return(
        <>
            <h3>Georgia Institute of Technology</h3>
            <h1>Non-Inventory Property Surplus Report</h1>
            <div className="formHeader">
                <div className="fromSection">
                    <p>From:___________________________________<br/>Coordinator's Name </p>
                    <p className="textRight">Phone:______________<br/>&nbsp;</p>
                    <p>Department#:______________</p>
                    <p className="textRight">Date:____________</p>
                    <p>Department Name:_________________________</p>
                </div>
                <div className="toSection">
                    <p className="textLeft">To:</p>
                    <p>Georgia Tech Surplus Warhouse</p>
                    <p>Property Control & Logistics Department</p>
                    <p>711 Marietta Street</p>
                    <p>Atlanta, GA 30318</p>
                    <p>Phone: 404-894-5013 Fax: 404-894-4608</p>
                    <p>Or email to am.ask@business.gatech.edu</p>
                </div>
            </div>
            <div className="tableHeader">
                <h4 className="genProp">GENERAL PROPERTY INFORMATION --- Please fill out completely</h4>
                <h4 className="loc">LOCATION</h4>
                <h4 className="cond">CONDITION</h4>
            </div>
            <table className="formTable">
                <tbody>
                    <tr className="header">
                        <th className="quantity">QUANTITY</th>
                        <th className="desc">DESCRIPTION</th>
                        <th className="model">MODEL NUMBER</th>
                        <th className="serial">SERIAL NUMBER</th>
                        <th className="bldg">BLDG. NAME</th>
                        <th className="room">ROOM NO.</th>
                        <th className="cond">(G)OOD,(F)AIR,(P)OOR</th>
                    </tr>
                    {surplusItems.map((item)=>{
                        return(
                            <tr className="item" key={item._id}>
                                <td key="GTInventory">{item.GTInventory}</td>
                                <td key="Manufacturer">{item.Manufacturer}</td>
                                <td key="Model">{item.Model}</td>
                                <td key="Serial">{item.Serial}</td>
                                <td key="Building">Campus Safety</td>
                                <td key="Room">280</td>
                                <td key="Condition">P</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="formFooter">
                <p className="textLeft"> FORM 4 REV 06/09</p>
                <div className="signContainer">
                    <div className="pickupContainer">
                        <p>Picked up by: _______________________</p>
                        <p>Date: __________</p>
                        <p>Time: __________</p>
                    </div>
                    <div className="witnessContainer">
                        <p>Department Witness: _______________________</p>
                        <p>Date: __________</p>
                        <p>Time: __________</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SurplusForm;