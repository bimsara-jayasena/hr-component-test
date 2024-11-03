<?php
require 'vendor/autoload.php';

use Google\Client;
use Google\Service\Drive;

// Initialize Google Drive client
$client = new Client();
$client->setAuthConfig('owner.json');
$client->addScope(Drive::DRIVE_READONLY);

$service=new Drive($client);

$folder='1ASCqg0pC98FCjTlbWipR_59gqxA1qmUJ';
try{
    
$result=$service->files->listFiles([
    'q'=>"'$folder' in parents",
    'pageSize'=>10,
    'fields'=>'nextPageToken,files(id,name)',
]);
if(count($result->files)==0){
    echo "no applications";
}else{
    foreach($result->files as $file){
        $id=$file->getId();
        echo " <ul><li>".$file->getName()." <a href='./applications.php?id=$id'>view applicants</a></li></ul>";
    }
}
}catch(Exception $e){
    echo $e->getMessage();
}
?>
