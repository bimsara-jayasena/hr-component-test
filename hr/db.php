<?php
function getconnetion(){
  try{
    $connection=new mysqli("localhost",'root','','hr');
    echo "connected";
    return $connection;

  }catch(mysqli_sql_exception $e){
    throw $e;
  }    
}

?>