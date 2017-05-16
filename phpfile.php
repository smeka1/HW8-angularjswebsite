<?php

//$url = $_GET['url1']."&".$_GET['url2'];
$url="http://congress.api.sunlightfoundation.com/legislators?apikey=329ac574893048079e49840a91fe49a8&per_page=all";
//$url=urlencode($url);
if(@file_get_contents($url) === false)
        echo "NULL";
$getu = file_get_contents($url) ;
 header('Content-Type: application/json');
 //echo $_GET['url1']." ";  echo $_GET['url2']."   ";
 $book = array(
    "title" => "JavaScript: The Definitive Guide",
    "author" => "David Flanagan",
    "edition" => 6 );
    echo  json_encode($getu);

?>
