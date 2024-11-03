import express from 'express';
import sql from 'mysql2';
import cors from 'cors';
import { google } from 'googleapis';
import fs from 'fs';
import multer from 'multer';
const app=express();
const upload=multer({dest:'uploads/'})
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST']
}))
const db=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"hr"
});

app.get('/',async(req,res)=>{
    try{
        const qry="SELECT * FROM jobs";
        const [response]=await db.promise().query(qry);
       if(response.length>0){
        const obj=response.map((element)=>{
            const job={
                id:element.job_id,
                title:element.title,
                poster:element.poster.toString('base64')
            };
            return job;
        });
        return res.status(200).send(obj);
       }
        

    }catch(error){
        console.log(error);
    }
})
app.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const qry="SELECT * FROM jobs WHERE job_id=?";
        const [response]=await db.promise().query(qry,[id]);
       if(response.length>0){
        const obj=response.map((element)=>{
            const job={
                id:element.job_id,
                title:element.title,
                poster:element.poster.toString('base64')
            };
            return job;
        });
        return res.status(200).send(obj[0]);
       }
        

    }catch(error){
        console.log(error);
    }
})
app.post('/upload',upload.single('cv'),async(req,res)=>{
    const candidate=req.body.name;
    const job=req.body.job;
    const parentFolderId='1ASCqg0pC98FCjTlbWipR_59gqxA1qmUJ';
    try {
        const auth=new google.auth.GoogleAuth({
            keyFile:"key.json",
            scopes:["https://www.googleapis.com/auth/drive.file"]
        })
        const drive=google.drive({version:"v3",auth});
        //check if folder is already exist
        const folderResponse = await drive.files.list({
            q: `name='${job}' and mimeType='application/vnd.google-apps.folder' and '${parentFolderId}' in parents`,
            fields: 'files(id, name)',
        });
        let folderId;
        if (folderResponse.data.files.length > 0) {
            // Folder exists, use the existing folder ID
            folderId = folderResponse.data.files[0].id;
        } else {
            // Create a new folder since it doesn't exist
            const newFolderResponse = await drive.files.create({
                requestBody: {
                    name: job,
                    mimeType: 'application/vnd.google-apps.folder',
                    parents: [parentFolderId] // Parent folder ID
                }
            });
            folderId = newFolderResponse.data.id; // Get the newly created folder ID
            console.log(`Created new folder with ID: ${folderId}`);
        }
        
       

        //upload the files to the subfolder
        const response=await drive.files.create({
            requestBody:{
                name:candidate,
                mimeType:req.file.mimetype,
                parents:[folderId]

            },
            media:{
                body:fs.createReadStream(req.file.path)
            }
        });
        return res.status(200).send('success');
    } catch (error) {
        console.log(error);
    }
})

app.listen(5555,()=>{
    console.log('app is listening to port: '+5555);
})