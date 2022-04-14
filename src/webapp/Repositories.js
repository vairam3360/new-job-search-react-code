import React from 'react'
// import { RESPONSE_OBJ } from './ResponseJSON';
import Repos from './Repos';

function Repositories() {
    const buttonList = [{ name: "All", value: "All" },
    { name: "JavaScript", value: "JavaScript" },
    { name: "Ruby", value: "Ruby" },
    { name: "Java", value: "Java" },
    { name: "CSS", value: "CSS" },
    { name: "Python", value: "Python" }]

    const [langSelected, setlangSelected] = React.useState("All");

    const [repoList, setRepoList] = React.useState([])

    const [totalRecordCount, setTotalRecordCount] = React.useState(0);
    const [pageNo, setPageNo] = React.useState(1);


    const clickHandler = value => {
        setlangSelected(value)
        setPageNo(1);
    }


    const navHandler = type => {
        if (type === "PREV") {
            setPageNo(pageNo - 1)
        }
        else {
            setPageNo(pageNo + 1)
        }
    }



    React.useEffect(() => {
        callApi(langSelected, pageNo)        
    }, [pageNo,langSelected]) // didUpdate

    React.useEffect(() => {
        callApi("All", 1)
    },[])


    function callApi(language, pageNo) {
        const apiUrl = `https://api.github.com/search/repositories?q=stars:%3E10000+language:${language}&page=${pageNo}&per_page=5&sort=stars`
       
        fetch(apiUrl).then(data => {
            data.json().then(el => {
                setRepoList(el.items)
                setTotalRecordCount(el.total_count);
            })
        })
            .catch(er => console.log("error", er))

    }

    return (
        <>
            { repoList && 
                repoList.length > 0 &&
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        {
                            buttonList.map(el =>
                                <button
                                    style={{ margin: "10px", border: "none", fontWeight: "900", color: langSelected === el.value ? "red" : "black" }}
                                    key={el.value} onClick={() => clickHandler(el.value)}> {el.name} </button>)

                        }
                    </div>


                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        {
                            repoList.map((el, index) =>
                                <Repos 
                                key={el.id} 
                                item={el} position={(pageNo - 1) * 5 + index + 1}
                                ></Repos>
                            )
                        }
                    </div>

                    <button disabled= {pageNo === 1} onClick={() => { navHandler("PREV") }} > PREV</button>

                    <button disabled={totalRecordCount <= 5 || pageNo >= totalRecordCount / 5} onClick={() => { navHandler("NEXT") }}> NEXT</button>
                </div>
            }
        </>


    )
}

export default Repositories



