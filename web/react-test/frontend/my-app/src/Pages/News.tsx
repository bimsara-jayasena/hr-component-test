import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
export default function News() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5555/")
      .then((res) => {
       setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  const apply=(jobId:number)=>{
     alert(jobId);
  }
  return (
    <>
      <section >
     <h1> all Opening jobs</h1>
      <div style={{display:'flex', flexDirection:'column'}}>
      {jobs.map((job: any) => {
        return (
         
            <div style={{border:'1px solid dodgerblue',width:'fit-content'}}>
            <h2>Job Title: {job.title}</h2>
            <img src={`data:image/jpeg;base64,${job.poster}`} width={'500px'} height={'500px'}/>
        <Link to={`/Apply/${job.id}`} >Apply Now !</Link>
            </div>
         
        );
      })}
      </div>
      </section>
    </>
  );
}
