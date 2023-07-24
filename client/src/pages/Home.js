import { useState } from "react"
import { useQuery } from "@apollo/client";
import { getDevices } from "../utils/queries";

const Home = () =>{
    const { loading, error, data } = useQuery(getDevices);
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    return(
        <div>
            {data.getDevices.map((element, index)=>(
                <div key={index}>
                    {Object.entries(element)
                    .filter(([key]) => key !== "__typename")
                    .map(([key, value]) => (
                        <p key={key}>
                            {value}
                        </p>
                    ))}
              </div>
            ))}
        </div>
    )
}

export default Home