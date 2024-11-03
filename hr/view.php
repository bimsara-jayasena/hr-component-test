<?php
   require 'vendor/autoload.php';

   use Google\Client;
   use Google\Service\Drive;

   //Initialize the client
   $client=new Client();
   $client->setAuthConfig('owner.json');
   $client->addScope(Drive::DRIVE_READONLY);

   $service=new Drive($client);

   try{
        $file=$_GET['id'];

        $getFileName=$service->files->get($file,array('fields'=>'name'));
        $fileName=$getFileName->name;
        $res=$service->files->get($file,array('alt'=>'media'));
        $content=$res->getBody()->getContents();
        
        header('Content-Type:application/pdf');
        header('Content-Disposition:inline;fileName="'.$fileName.'"');
        echo $content;

   }catch(Exception $e){
    echo "Error: ".$e->getMessage();
   }
?>