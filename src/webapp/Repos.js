import React from 'react'

function Repos(props) {
    const { item, position,  } = props;

    return (
        <div style={{ display: "block" }}>
            <p style={{ color: "black" }}> #{position} </p>
            <img src={item.owner.avatar_url} style={{ width: "100px", height: "100px", margin: "30px", borderRadius: "200px" }} 
            alt="logo"
             />
            <p style={{ color: "red" }}> {item.name}</p>
            <p style={{ color: "black" }}> @{item.owner.login}</p>
            <p style={{ color: "black" }}> {item.stargazers_count} stars</p>
        </div>
    )
}

export default Repos
