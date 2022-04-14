import React from 'react';

import classes from './RepoListNew.Module.css'

function RepoNew(props) {
    const {item, position}= {props};

    console.log(props.item)
    return (
        <div className={classes.singleRepoContainer}>

            <p className={classes.repoFont}>#{props.position}</p>
            <img src={props.item.owner.avatar_url} className={classes.imageStyle} alt="logo"/>
            <p className={classes.repoFont}>{props.item.name}</p>
            <p className={classes.repoFont}>@{props.item.name}</p>
            <p className={classes.repoFont}>{props.item.stargazers_count} stars</p>
        </div>
    )
}

export default RepoNew
