<?php

$u1= $_GET['url1'];
//$url=urlencode($url);
$url=$u1;

$url = $_SERVER['QUERY_STRING'];
header('Content-Type: application/json');
 //echo $_GET['url1']." ";  echo $_GET['url2']."   ";
 header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if($u1 == "legislators")
{
	$url="http://congress.api.sunlightfoundation.com/legislators?apikey=329ac574893048079e49840a91fe49a8&per_page=all";
    echo (file_get_contents($url)) ;
}
 if($u1 == "bills")
{
	$url ="http://congress.api.sunlightfoundation.com/bills?apikey=329ac574893048079e49840a91fe49a8&per_page=50";
 echo (file_get_contents($url)) ;
}
 if ($u1 == "committees")
{
	$url ="http://congress.api.sunlightfoundation.com/committees?apikey=329ac574893048079e49840a91fe49a8&per_page=all";
   echo (file_get_contents($url)) ;
}
 
 echo  (file_get_contents ( substr($url ,5))  ) ;
?>
