import React from 'react'

function SpaceXLaunch() {
    const url = 'https://api.spacexdata.com/v2/launches';
    const [launchDetails, setLaunchDetails]= React.useState([]);



    const fetchURL = url => {
        fetch(url).then(res => res.json()).then(data=> {
            setLaunchDetails(data)
        console.log(data)
        }
        ).catch(err=> console.log(err));
        
    }

    React.useEffect(()=>{
        fetchURL(url);
    },[])
    return (
        <div>
            <ol>
                
        {launchDetails && launchDetails.length>0 && launchDetails.map((el, idx) => <li key ={idx}>{el.mission_name}</li>)}
        </ol>
        </div>
    )
}

export default SpaceXLaunch
