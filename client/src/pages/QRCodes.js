import { Fragment } from 'react';
import QRCode from 'react-qr-code';
import { useQuery, useMutation } from '@apollo/client';
import { getQRCodes, getQRDevices } from '../utils/queries';
import { setQRCodes, setQRDevice } from '../utils/mutations';
import "../styles/qrcodes.css"

const QRCodes = ()=>{
    const {loading, error, data:QRData} = useQuery(getQRCodes)
    const {loading:deviceLoading, error:deviceError, data:deviceData} = useQuery(getQRDevices)
    const [setQRCodeMutation] = useMutation(setQRCodes)
    const [setQRDeviceMutation] = useMutation(setQRDevice)
    
    if (loading || deviceLoading) return <p>Page Loading</p>
    if (error) return <p>Failed to get Available QR Codes: {error.message}</p>
    if (deviceError) return <p>Failed to get QR Devices: {deviceError.message}</p>
    
    const availQR = QRData.getQRCodes;
    const deviceArr = deviceData.getQRDevices

    let deviceIndex = 0
    const nextDevice = ()=>{
        let labelItem = (deviceArr[deviceIndex]) ? (deviceArr[deviceIndex]) : 0
        if (labelItem !== 0){
            deviceIndex++
            return (
                <Fragment>
                    <QRCode className='QR' value={`https://localhost/device/${labelItem._id}`} size={72} />
                    <p className='hostLabel'>Hostname:<br/>{labelItem.Hostname}</p>
                    <p className='serialLabel'>Serial Number:<br/>{labelItem.Serial}</p>
                </Fragment>
            )
        }else{
            return ""
        }
    }

    const handleLabelClick = async (key, cellAvail)=>{
        let variables = {cellname: key, available: cellAvail}
        const { data: { updateLabel } } = await setQRCodeMutation({
            variables: { data: variables },
            refetchQueries: [{ query: getQRCodes }],
        });
        return updateLabel
    }

    const handleResetLabels = async()=>{
        await setQRCodeMutation({
            refetchQueries: [{ query: getQRCodes }],
        });
        alert("Label positioning has been reset!")
    }

    const handleResetQRDevices = async()=>{
        await setQRDeviceMutation({
            refetchQueries: [{ query: getQRDevices }],
        })
        alert("Device labels have been reset!")
    }

    return(
        <Fragment>
            <div className='qrSheet'>
                {availQR.map((QR)=>{
                    try{
                        if (QR.available){
                            console.log("working")
                            return(
                            <div className='labelDiv' key={QR.cellname} onClick={()=>{handleLabelClick(QR.cellname, QR.available)}} >
                                {QR.available ? (nextDevice()) : (<p>Label Not Available</p>)}
                            </div>
                            )
                        }else{
                            return(
                            <div className='labelDiv' key={QR.cellname} onClick={()=>{handleLabelClick(QR.cellname, QR.available)}}>
                                <p className='labelUsed'>Label Used</p>
                            </div>
                            )
                        }
                    }catch(err){
                        console.log(err.message)
                        return null
                    }
                })}
            </div>
            <div className='buttonContainer'>
                <button className="removeLabels" onClick={handleResetLabels}>
                    Clear Unused Labels
                </button>
                <button className="removeDevices" onClick={handleResetQRDevices}>
                    Remove Devices From Labels
                </button>
            </div>
        </Fragment>
    )
}

export default QRCodes