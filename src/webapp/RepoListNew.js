import React, {useState, useEffect} from 'react';
import classes from './RepoListNew.Module.css'
import RepoNew from './RepoNew';

function RepoListNew() {
    const buttonList=[{name:"All", value:"All"},{name:"JS", value:"JavaScript"},{name:"Ruby", value:"Ruby"},
    {name:"CSS", value:"CSS"},{name:"Python", value:"Python"}];
    
    const [totalRecords, setTotalRecords]= useState(0)
    const  [langSelected, setLangSelected] = useState('All');
    const [repoList, setRepoList]= useState([]);
    const [pageNo, setpageNo]= useState(1);
    
    const langSelection=evt=>{
        setLangSelected(evt.target.value);
        setpageNo(1);
    }

    const prevNextClick= (  isPrev)=>{
        if(isPrev){
            setpageNo(pageNo=> pageNo-1);
            
        }else {
            setpageNo(pageNo=> pageNo+1);
            
        }
    }

    const fetchApi = _ =>{
 const apiUrl = `https://api.github.com/search/repositories?q=stars:%3E10000+language:${langSelected}&page=${pageNo}&per_page=5&sort=stars`
       fetch(apiUrl).then(res=> res.json()).then(data=>
       {
        setRepoList(data.items);
        setTotalRecords(data.total_count);
        
       } ).catch(err=>console.log(err));
    }
    

    useEffect(()=>{
        fetchApi();
    },[langSelected, pageNo])
    


    return (
        <div id="REPO" style={{height :"100%"}} className={classes.flexCol}>
            <div className={classes.buttonRow}>
            {buttonList.map((el,index) =>
                <button key={index} value={el.value} onClick={langSelection}
                
                className={ el.value === langSelected? classes.buttonSelected : classes.buttonStyle}>{el.name}</button>
            )}
            </div>
            <div className={classes.repoContainer}>
                {repoList && repoList.map((el, index) =>
                    <RepoNew key={index}
                    item={el}
                    position={(pageNo - 1) * 5 + index + 1}
                    >

                    </RepoNew>

                )}
            </div>

            <div className={classes.prevNext}>
                <button disabled={pageNo-1===0} onClick={()=>prevNextClick(true)}>PREV</button>
                <button disabled={totalRecords/5 <= pageNo} onClick={()=>prevNextClick(false)}>NEXT</button>
            </div>
        </div>
    )
}

export default RepoListNew
