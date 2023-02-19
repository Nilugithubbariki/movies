import React, { useState } from "react";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { useEffect } from "react";
const MovieApi = () => {
    const [apiData,setApiData] = useState([]);
    const API_URL = `https://hoblist.com/api/movieList`;
    const getMovies = async (url)=>{
        try{
            const payload = {
                "category": "movies",
                "language": "kannada",
                "genre": "all",
                "sort": "voting"
            }
            const res = await fetch(url,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(payload)});
            const data = await res.json();
            // console.log("Data",data)
            setApiData(data?.result);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getMovies(API_URL);
    },[])
    return(
        <>
        {
            apiData.map((value)=>{
                return (
                <><div style={{ display: "flex" }}>
                        <span>
                            <ArrowDropUpIcon style={{fontSize:"73px",marginTop:"-3px"}}/>
                            <div style={{ marginRight: "20px", marginTop: "-34px",marginLeft:"33px" }}>{value.totalVoted}</div>
                            <ArrowDropDownIcon style={{marginLeft:"0px",fontSize:"73px",marginTop:"-32px"}}/>
                            <div style={{marginLeft:"15px",marginTop:"-17px"}}>Votes</div>
                        </span>
                       
                        <span>
                            <img height="100px" width="70px" style={{ borderRadius: "5px", boxShadow: '1px 2px 9px grey', }} src={value.poster} />
                        </span>
                        <span>
                            <div style={{ fontWeight: "bold", marginLeft: "10px", fontFamily: "serif " }}>{value?.title}</div>
                            <div style={{ marginLeft: "12px",wordWrap:"break-word" }}><span style={{ color: "grey" }}>Gener:</span>{value?.genre}</div>
                            <div style={{ marginLeft: "12px",wordWrap:"break-word" }}><span style={{ color: "grey" }}>Director:</span>{value?.director}</div>
                            <div style={{ marginLeft: "12px",wordWrap:"break-word" }}><span style={{ color: "grey" }}>Starring:</span>{value?.stars}</div>
                            <span style={{ color: "rgb(63 182 202)",marginLeft: "12px" }}><span>{value.pageViews}</span> | voted by <span>{value.voting}</span>People</span>
                        </span>
                    </div>
                    <div style={{textAlign:"center",border:"1px solid black",border:"none",background:"#2196F3",borderRadius:"5px",margin:"5px"}}>Watch Trailer</div>
                    <div style={{ border: "1px solid grey", height: "1px", width: "100%" }}></div></>
                )
            })
        }
        </>
    )
}
export default MovieApi;