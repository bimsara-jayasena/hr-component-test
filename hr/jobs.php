<?php
require './db.php';
try{
    $conn=getconnetion();
    $stmt=$conn->prepare("SELECT * FROM jobs");
    $stmt->execute();
    $res=$stmt->get_result();
    if($res->num_rows>0){
       while($row=$res->fetch_assoc()){
        $url=base64_encode($row['poster']);
        echo " <ul><li>".$row['title']."</li><li><img src='data:image/jpeg;base64,$url' alt=''></li></ul>";
       }
    }
}catch(Exception $e){
    echo "Error: ".$e->getMessage();
}
?>