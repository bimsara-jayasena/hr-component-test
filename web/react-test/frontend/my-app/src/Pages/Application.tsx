import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
const props = {};
export default function Application() {
  const  {id } = useParams();

  const [job, setJob] = useState<any>({});
  
  const [file, setFile] = useState(null);
  const [fname,setFname]=useState("");
  const [lname,setlname]=useState("");
  const [loading,setLoading]=useState(false);
 
  useEffect(() => {
    axios
      .get(`http://localhost:5555/${id}`)
      .then((res) => {
       
       setJob(res.data);
       
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  useEffect(()=>{
    console.log(job.id);
  },[job])

  
  const handleSubmit=()=>{
    console.log(file);
    setLoading(true);
    if(file){
      const formData=new FormData();
      formData.append("cv",file);
      formData.append("job",job.title);
      formData.append("name",(fname+" "+lname));
      axios.post(`http://localhost:5555/upload`,formData)
      .then((res)=>{setLoading(false);alert('success')})
      .catch((err)=>console.log("error"+err.message))
    }
  }
  return( 
    <>
    apply for the job
    <div>
        
    
     
        Job Id: {job.id}
        Job Title: {job.title}
        <img src={`data:image/jpeg;base64,${job.poster}`} alt=""/>
       
    
    </div>
    <form style={{display:'flex',flexDirection:"column"}}>
    <label htmlFor="fname">first name</label>
    <input type="text" name="fname" id="" onChange={(e)=>setFname(e.target.value)}/>
    <label htmlFor="lname">last name</label>
    <input type="text" name="lname" id="" onChange={(e)=>setlname(e.target.value)}/>
        <label htmlFor="mail">E-mail</label>
        <input type="mail" name="mail" id="" />

        <label htmlFor="cv">CV</label>
        <input type="file" name="cv" id="" onChange={(e:any)=>setFile(e.target.files[0])}/>

        
    </form>
       <button onClick={handleSubmit}>{loading ? <>Submitting...</>: <>Submit</>}</button>
    
    </>)
}
