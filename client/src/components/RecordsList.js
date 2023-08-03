import { useQuery } from "@apollo/client";
import { getDevices } from "../utils/queries";

const RecordsList = () => {
    const { loading, error, data } = useQuery(getDevices);
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    return(
        <div className="mainContainer">
            {data.getDevices.map((element, index)=>(
                <div className="collectionRow" key={index}>
                    {Object.entries(element)
                        .filter(([key]) => key !== "__typename" && key !== "_id")
                        .map(([key, value]) => (<p key={key}>{value || '\u00A0'}</p>))
                    }
                </div>
            ))}
        </div>
    )
}

export default RecordsList