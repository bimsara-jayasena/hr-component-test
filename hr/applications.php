<?php
require 'vendor/autoload.php';

use Google\Client;
use Google\Service\Drive;

//Initalize Drive client
$client=new Client();
$client->setAuthConfig('owner.json');
$client->addScope(Drive::DRIVE_READONLY);

$service=new Drive($client);

try{
   $folder=$_GET['id'];
   $result=$service->files->listFiles([
    'q'=>"'$folder' in parents",
    'pageSize'=>10,
    'fields'=>'nextPageToken,files(id,name)'
   ]);
   if(count($result->files)==0){

   }else{
    
     foreach($result->files as $file){
        $id=$file->getId();
        echo " <ul><li>".$file->getName()." <a href='./view.php?id=$id'>view applicants</a></li></ul>";
     }
   }
}catch(Exception $e){
    echo "Error: ".$e->getMessage();
}
?>