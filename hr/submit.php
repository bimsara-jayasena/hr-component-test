<?php
require './db.php';
if($_SERVER['REQUEST_METHOD']==='POST'){
 
  $name=htmlspecialchars($_POST['title']);
  $file=$_FILES['post'];
  $poster=file_get_contents($_FILES['post']['tmp_name']);
  try{
    $conn=getconnetion();
    $stmt=$conn->prepare("INSERT INTO jobs(title,poster) VALUES (?,?)");
    $stmt->bind_param('sb',$name,$poster);
    $stmt->send_long_data(1,$poster);
    
    if( $stmt->execute()){
      echo "success";
    }
  }catch(mysqli_sql_exception $e){
    echo $e;
  }

}
?>