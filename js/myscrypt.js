
    var app = angular.module('myApp', ['angularUtils.directives.dirPagination','ngSanitize']);
    
    var param ={url1:"legislators"};
    //alert("jjk");
    var resp;
     
    function viewdet(bio,len)
     { 
        console.log(len," ",bio);    
     }   
    function func(name,param)
    {
       var resp = name;
       var  demoinner = document.getElementById("demo");
       //var str= resp[0].committee_id + "  ";
        //str  += resp[1].committee_id;
        //demoinner.innerHTML = str;
        console.log(resp[0]," ",param,"",resp.length);
        
        if (param == "legislators")
            {
                //resp[0] holds 1st legis   resp.len holds size of call
                var lenl = resp.length;
                var infol= new Array;
                
                for( i=0 ; i<lenl; i++)
                    {
                        var par= resp[i].party;
                        infol[i] = [{"index":i}];
                        par = par.toLowerCase();  par.trim();
                        var paru = par+".png";
                        infol[i].party = paru;
                        infol[i].name=resp[i].last_name+","+resp[i].first_name;
                        infol[i].chamber= resp[i].chamber;
                        var chl= infol[i].chamber.length;
                        var up= infol[i].chamber[0].toUpperCase();
                        up += infol[i].chamber.substring(1,chl);
                        //var ch = infol[i].chamber[0].toUpperCase + infol[i].chamber.substring(1,chl-1) ; 
                        infol[i].ci = "s.png";
                        if (infol[i].chamber == "house")
                            infol[i].ci = "h.png";
                        infol[i].chamber1 = up;
                        //console.log(up); 
                        if((resp[i].district) == null || resp[i].district == "NULL")
                           infol[i].district = "N.A";
                           else 
                              infol[i].district = "District " +resp[i].district;
                           
                        infol[i].state = resp[i].state_name;
                        infol[i].bioguide_id= resp[i].bioguide_id;
                        //console.log("Party", par);
                        document.getElementById("demo").innerHTML = infol[i].bioguide_id;                }
            }
        return infol;
    }
        
    app.controller('myCtrl', function($scope, $http) {
    //alert("url"); 
        //$scope.posts = "hkjmhkb";
   $http({
        method: 'GET',
        responseType: 'json',
        url:'http://php1.ikcpvqh2ya.us-west-2.elasticbeanstalk.com/', params:param // url: http://localhost/phpfile.php   http://cs-server.usc.edu:11415/phpfile.php'     
   }).then(function successCall(response,status)
                { //alert("ggg");
                $scope.contents = [];
                $scope.posts = response.data;
                $scope.resplength= $scope.posts.results.length;
             $scope.infol=  func($scope.posts.results,param["url1"]);
                for(var i=0;i<$scope.infol.length;i++)
                 $scope.contents.push(i);
              // $scope.infol.trustAsHtml = $sce.trustAsHtml;
                $scope.infoh = [];
                $scope.infos = [];
       ///////Check for HOUSE oir SEnate   
              for(var i=0;i<$scope.infol.length;i++)
                  {
                      //console.log($scope.infol[i].chamber);
                if ($scope.infol[i].chamber == "house")
                    {  
                        $scope.infoh[i]=[{"index":i}];
                        $scope.infoh[i].party= $scope.infol[i].party;
                        $scope.infoh[i].name= $scope.infol[i].name;
                        $scope.infoh[i].chamber= $scope.infol[i].chamber;
                        $scope.infoh[i].chamber1= $scope.infol[i].chamber1;
                        $scope.infoh[i].district= $scope.infol[i].district;
                        $scope.infoh[i].state= $scope.infol[i].state;
                        $scope.infoh[i].ci= $scope.infol[i].ci;
                        $scope.infoh[i].bioguide_id=$scope.infol[i].bioguide_id;
                        
                    }
                      
                    else  if ($scope.infol[i].chamber == "senate")
                    {  
                        $scope.infos[i]=[{"index":i}];
                        $scope.infos[i].party= $scope.infol[i].party;
                        $scope.infos[i].name= $scope.infol[i].name;
                        $scope.infos[i].chamber= $scope.infol[i].chamber;
                        $scope.infos[i].chamber1= $scope.infol[i].chamber1;
                        $scope.infos[i].district= $scope.infol[i].district;
                        $scope.infos[i].state= $scope.infol[i].state;
                        $scope.infos[i].ci= $scope.infol[i].ci;
                        $scope.infos[i].bioguide_id=$scope.infol[i].bioguide_id;
                        
                    }
                  }
       
       console.log($scope.infol.length);
              // alert(resp[0].bioguide_id);
                 console.log("Success");
                }/*, function errorCall(response,status) {
               console.error("Err ",status);
                } */);
        
        $scope.scopeviewdet = function(bio)
        { 
            $vurl = "https://congress.api.sunlightfoundation.com/legislators?bioguide_id=" + bio;
            $vurl1="legislators";    var innj= new Array; var inn;
            var parm ={url1:$vurl};
            //viewdet(bio,$scope.infos.length);
            console.log(bio, $vurl);
            $scope.det= {'saa':'1'}; $scope.detb= {'saa':'1'};$scope.detc= {'saa':'1'};
            $http({
        method: 'GET',
        responseType: 'json',
        url:'http://php1.ikcpvqh2ya.us-west-2.elasticbeanstalk.com/', params:parm })
            .then (function success(vresp)   
            {
                $scope.det = vresp.data.results[0];
                $scope.det.photo = "https://theunitedstates.io/images/congress/original/" + bio+ ".jpg";
                //<img class="nggsrc1" src={{det.photo}}>
                $scope.det.name= $scope.det.title + ". " +$scope.det.first_name+ ", " + $scope.det.last_name;
                $scope.det.email = "mailto:" + $scope.det.oc_email ;
                $scope.det.chamber1 = "Chamber:"+ $scope.det.chamber;
                $scope.det.contact = "Contact:"+ $scope.det.phone;
                if($scope.det.party='R')
                { $scope.det.party1= "Republican"; $scope.det.ci="r.png"; }
                if($scope.det.party='I')
                { $scope.det.party1= "Independant"; $scope.det.ci="i.png"; }
                if($scope.det.party='D')
                {$scope.det.party1= "Democrat"; $scope.det.ci="d.png";}
                var month = new Array(); 
                month[0] = "Jan"; month[1] = "Feb"; month[2] = "Mar";  month[3] = "Apr";  month[4] = "May";  month[5] = "Jun";
                    month[6] = "Jul"; month[7] = "Aug"; month[8] = "Sep"; month[9] = "Oct"; month[10] = "Nov";  month[11] = "Dec";
                
                var sm = parseInt($scope.det.term_start.substring(5,7));
                var sd = parseInt($scope.det.term_start.substring(8,10));
                var sy = parseInt($scope.det.term_start.substring(0,4));
                var snow = new Date(sy,sm,sd);
                var em = parseInt($scope.det.term_end.substring(5,7));
                var ed = parseInt($scope.det.term_end.substring(8,10));
                var ey = parseInt($scope.det.term_end.substring(0,4));
                var enow = new Date(ey,em,ed);
                var d = new Date();
                var cd = d.getDate();
                var cm = d.getMonth();
                var cy = d.getFullYear();
                var now = new Date(cy,cm,cd);
                var perc = Math.round (100* (now-snow)/(enow-snow) );
                $scope.det.perc=perc;
               $scope.det.ST= month[parseInt($scope.det.term_start.substring(5,7))-1] +" "+$scope.det.term_start.substring(8,10)+" " + $scope.det.term_start.substring(0,4) ;
               $scope.det.ET= month[parseInt($scope.det.term_end.substring(5,7))-1] +" "+$scope.det.term_end.substring(8,10)+" " + $scope.det.term_end.substring(0,4);
                $scope.det.bday= month[parseInt($scope.det.birthday.substring(5,7))-1] +" "+$scope.det.birthday.substring(8,10)+" " + $scope.det.birthday.substring(0,4) ;
                if($scope.det.facebook_id != null)
                    $scope.det.fb= "https://www.facebook.com/"+ $scope.det.facebook_id;
                if($scope.det.twitter_id != null)
                    $scope.det.tw= "https://www.twitter.com/"+ $scope.det.twitter_id;
                if($scope.det.website != null)
                    $scope.det.ws= $scope.det.website;
                //$scope.det.office=
                // <img src="t.png"><a href={{det.tw}} >
                // <img src="f.png"><a href={{det.fb}} >
                // <img src="w.png"><a href={{det.ws}} >
                innj = $scope.det;
                //console.log(innj.photo);
             inn="<div class='responsive-table'><table class='table'>" ;
            inn+= "<tr><td rowspan='6'><img style='width:200px;height:200px;' src='"+ innj.photo+ "'/></td></tr> ";
            inn+=" <tr><td>"+ innj.name +" </td></tr><tr><td><a href='"+innj.email +"'>Email</a></td></tr><tr><td>"+innj.chamber1+"</td></tr> ";
         inn+=" <tr><td> "+innj.contact+"</td></tr><tr><td><img src='"+innj.ci+"' style='width:20px;'>"+ innj.party1+"</td></tr></table></div> ";
        inn+="<div class='responsive-table'><table class='table'><tr><td>Start Term</td><td>"+innj.ST +"</td></tr><tr><td>End Term</td>";        
              inn+="<td>"+innj.ET+"</td></tr><tr><td>Term</td><td><div class='progress'><div class='progress-bar' role='progressbar' style='width:"+ innj.perc +"%'>"+innj.perc+"</div></div></td></tr><tr><td>Office</td>";
                
        inn+="<td>"+innj.office+"</td></tr><tr><td>State</td><td>"+ innj.state +"</td>></tr><tr><td>Fax</td> ";
        inn+="<td>"+innj.fax+"</td></tr><tr><td>Birthday</td><td>"+innj.bday+"</td></tr><tr><td>Social links</td><td><a href='"+innj.tw+"'><img src='t.png' style='width:22px;'><a href='"+innj.fb+"'><img src='f.png' style='width:22px;'><a href='"+innj.ws+"'><img src='w.png' style='width:22px;'></td> </tr></table></div></div> </div>";
        inn+=" ";
        inn+=" ";
                
                document.getElementById("ViewDetLegis").innerHTML = inn;
                //console.log( $scope.det.photo);    //vresp.data.results[0]);
            });
            var in2=new Array; var in3= new Array;
            var i1,i2;
            
            parmu = "https://congress.api.sunlightfoundation.com/committees?member_ids="+bio+ "&per_page=5";
            parm = {'url1':parmu};
            $http({
        method: 'GET',
        responseType: 'json',
        url:'http://php1.ikcpvqh2ya.us-west-2.elasticbeanstalk.com/', params:parm })
            .then (function success(vresp)  {
                $scope.detb = vresp.data.results;
                in2=$scope.detb;
              for(var i=0;i<5;i++)  {
                in2[i].comid = $scope.detb[i].committee_id;
                in2[i].n = $scope.detb[i].name;
            }
                   i1="<div class='col-md-6'><h5>Committees</h5> <div class='responsive-table'><table class='table'>";
             i1+= " <tr><th>Chamber</th><th>Committee ID</th><th>Name</th></tr><tr>";  
                i1+="<td>House</td> <td>"+ in2[0].comid+"</td><td>"+in2[0].n+"</td></tr><tr><td>House</td> <td>"+ in2[1].comid+"</td><td>"+in2[1].n+"</td></tr><tr><td>House</td> <td>"+ in2[2].comid+"</td><td>"+in2[2].n+"</td></tr>";
                i1+="<tr><td>House</td> <td>"+ in2[3].comid+"</td><td>"+in2[3].n+"</td></tr><tr><td>House</td> <td>"+ in2[4].comid+"</td><td>"+in2[4].n+"</td></tr>";
                
               document.getElementById("View2").innerHTML=i1;
                
                //console.log($scope.detb[0].committee_id) ;  //,  detb.chamber  detb.name);
            });
            
            parmuc = "https://congress.api.sunlightfoundation.com/bills?sponsor_id="+bio+ "&per_page=5";
            parm = {'url1':parmuc};
            $http({
        method: 'GET',
        responseType: 'json',
        url:'http://php1.ikcpvqh2ya.us-west-2.elasticbeanstalk.com/', params:parm })
            .then (function success(vresp)  {
                $scope.detc = vresp.data.results;
                
                console.log($scope.detc[0].bill_id) ;  //,  detc.official_title  detc.chamber detc.bill_type  detc.congress detc.pdf );
            });
            
            //document.getElementById("ViewDetLegis").innerHTML = "<p> <h2>THIABIASBHFNISAJNASINVJISAvvvvvvvvvvvvvvvvNVISANVSAIN 
            
           // $scope.content1 = "<p>"+ $scope.det[0] +" </p>";
            
            ////   Make table here
            inn+="  ";
            inn+="  ";
            inn+="  "; 
            //"<p> {{det}} </p>";
          /*   $scope.content1 = "<div class='row'><div class='col-md-6'><div class='responsive-table'><table class='table'>"
               +" <tr><td rowspan='6'><img style='width:200px;height:200px;' src='{{det.photo}}'/></td></tr>" +
                "<tr><td>{{det.name}}</td></tr><tr><td>email</td></tr><tr><td>chamber</td></tr>"+
                "<tr><td>contact</td></tr><tr><td>partyimg</td></tr></table>";*/
            
        } // End of ScopeDET
          
       // $scope.actb=[{'a':a}];
        //$scope.newb=[{'a':a}];
        // For 50 BILLLLLLLLLLLLSSSSSSSSSSSSSSSSSSSSSSSSSSS
        // For 50 BILLLLLLLLLLLLSSSSSSSSSSSSSSSSSSSSSSSSSSS
        var newb1="https://congress.api.sunlightfoundation.com/bills?apikey=329ac574893048079e49840a91fe49a8&last_version.urls.pdf__exists=true&order=introduced_on&per_page=50";
        
        var actb1 ="https://congress.api.sunlightfoundation.com/bills?apikey=329ac574893048079e49840a91fe49a8&last_version.urls.pdf__exists=true&history.active=true&per_page=50";
        
        paramn = {'url1':newb1};
        parama = {'url1':actb1};
        
        $http({
        method: 'GET',
        responseType: 'json',
        //url:'http://php1.ikcpvqh2ya.us-west-2.elasticbeanstalk.com/', params:parama // url: http://localhost/phpfile.php   http://cs-server.usc.edu:11415/phpfile.php'     
		url:'https://congress.api.sunlightfoundation.com/bills?apikey=329ac574893048079e49840a91fe49a8&last_version.urls.pdf__exists=true&history.active=true&per_page=20'
   }).then(function successCall(response,status)
                {  
        $scope.actb = response.data.results;
              var l = $scope.actb.length;
            for(var i=0; i<l;i++)
                {
                  $scope.actb[i].id = $scope.actb[i].bill_id.toUpperCase();
                  $scope.actb[i].btype = $scope.actb[i].bill_type.toUpperCase();
                  if($scope.actb[i].chamber == "house")
                    {  $scope.actb[i].chamber1="House";  $scope.actb[i].ci="h.png";   }
                    if($scope.actb[i].chamber == "senate")
                    {  $scope.actb[i].chamber1="Senate";  $scope.actb[i].ci="s.png";   }
                    $scope.actb[i].name= $scope.actb[i].sponsor.title+". "+$scope.actb[i].sponsor.last_name+", "+ $scope.actb[i].sponsor.first_name; 
                    console.log($scope.actb[i].name);
                }
        
        });  //Bills Active
        
        
        $http({
        method: 'GET',
        responseType: 'json',
        //url:'http://php1.ikcpvqh2ya.us-west-2.elasticbeanstalk.com/', params:paramn // url: http://localhost/phpfile.php http://cs-server.usc.edu:11415/phpfile.php'     
		url:'https://congress.api.sunlightfoundation.com/bills?apikey=329ac574893048079e49840a91fe49a8&last_version.urls.pdf__exists=true&history.active=true&per_page=20'
   }).then(function successCall(response,status)
                {  
        $scope.newb = response.data.results;
           var l = $scope.newb.length;
            for(var i=0; i<l;i++)
                {
                  $scope.newb[i].id = $scope.newb[i].bill_id.toUpperCase();
                  $scope.newb[i].btype = $scope.newb[i].bill_type.toUpperCase();
                  if($scope.newb[i].chamber == "house")
                    {  $scope.newb[i].chamber1="House";  $scope.newb[i].ci="h.png";   }
                    if($scope.newb[i].chamber == "senate")
                    {  $scope.newb[i].chamber1="Senate";  $scope.newb[i].ci="s.png";   }
                    $scope.newb[i].name= $scope.newb[i].sponsor.title+". "+$scope.newb[i].sponsor.last_name+", "+ $scope.newb[i].sponsor.first_name; 
                    console.log($scope.newb[i].name);
                }
        
        });  //Bills New
        
        $scope.billviewdet = function(billid)
        {
            var ju= "https://congress.api.sunlightfoundation.com/bills?apikey=329ac574893048079e49840a91fe49a8&bill_id="+billid;
            paramdb = {'url1':ju};
           
            $http({
        method: 'GET',
        responseType: 'json',
        url:'http://php1.ikcpvqh2ya.us-west-2.elasticbeanstalk.com/', params:paramdb // url: http://localhost/phpfile.php  http://cs-server.usc.edu:11415/phpfile.php'     
   }).then(function successCall(response,status)
               {  $scope.vdb={'a':'d'}; 
        $scope.vdb = response.data.results[0];
                if ( $scope.vdb.history.active == false)
                    $scope.vdb.stat = "New";
                else
                    $scope.vdb.stat = "Active";
                //  $scope.vdb.chamber1    official_title    last_version.version_name  urls.congress  
                
         var month = new Array(); 
                month[0] = "Jan"; month[1] = "Feb"; month[2] = "Mar";  month[3] = "Apr";  month[4] = "May";  month[5] = "Jun";
                    month[6] = "Jul"; month[7] = "Aug"; month[8] = "Sep"; month[9] = "Oct"; month[10] = "Nov";  month[11] = "Dec";
					
				$scope.vdb.intro= month[parseInt($scope.vdb.introduced_on.substring(5,7))-1] +" "+$scope.vdb.introduced_on.substring(8,10)+" " + $scope.vdb.introduced_on.substring(0,4) ; 
                $scope.vdb.pdf = $scope.vdb.last_version.urls.pdf;
                
            console.log($scope.vdb.pdf,$scope.vdb.intro);
        });
           
        
        
        }   //BILL VIEW FUNC
        
        //Comiiteeesss
        urlcc="https://congress.api.sunlightfoundation.com/committees?per_page=all&fields=phone,office,name,committee_id,chamber,parent_committee_id";
        paramcc = {'url1':urlcc};
        $http({
        method: 'GET',
        responseType: 'json',
       // url:'http://php1.ikcpvqh2ya.us-west-2.elasticbeanstalk.com/', params:paramcc // url: http://localhost/phpfile.php   http://cs-server.usc.edu:11415/phpfile.php'     
	   url:'https://congress.api.sunlightfoundation.com/committees?per_page=all&fields=phone,office,name,committee_id,chamber,parent_committee_id'
   }).then(function successCall(response,status)
                {  
        $scope.com1 = response.data.results;
            $scope.com2= [];
            $scope.com3= [];
            $scope.com4= [];
            var k=0, ll=0,hh=0;
           var l = $scope.com1.length;
            for(var i=0; i<l;i++)
                {
                    if($scope.com1[i].chamber=="house")
                      {   $scope.com4[hh] = {'a':'b'};
                          $scope.com4[hh].chamber1 = "House"; 
                           $scope.com4[hh].ci= "h.png"; 
                           $scope.com4[hh].chamber = $scope.com1[i].chamber;
                           $scope.com4[hh].committee_id = $scope.com1[i].committee_id;
                            $scope.com4[hh].name = $scope.com1[i].name;
                            $scope.com4[hh].chamber = $scope.com1[i].chamber;
                            if($scope.com1[i].phone == null)
                                $scope.com4[hh].phone="N.A";
                            else  $scope.com4[hh].phone= $scope.com1[i].phone;
                             if($scope.com1[i].office == null)
                                $scope.com4[hh].office="N.A";
                            else  $scope.com4[hh].office= $scope.com1[i].office;
                            $scope.com4[hh].parent_committee_id = $scope.com1[i].parent_committee_id;     
                      hh++;
                      }
                    
                    
                    else if ($scope.com1[i].chamber == "senate")
                    {
                        $scope.com2[k] = {'a':'b'};
                          $scope.com2[k].chamber1 = "Senate"; 
                           $scope.com2[k].ci= "s.png"; 
                           $scope.com2[k].chamber = $scope.com1[i].chamber;
                           $scope.com2[k].committee_id = $scope.com1[i].committee_id;
                            $scope.com2[k].name = $scope.com1[i].name;
                            $scope.com2[k].chamber = $scope.com1[i].chamber;
                            if($scope.com1[i].phone == null)
                                $scope.com2[k].phone="N.A";
                            else  $scope.com2[k].phone= $scope.com1[i].phone;
                             if($scope.com1[i].office == null)
                                $scope.com2[k].office="N.A";
                            else  $scope.com2[k].office= $scope.com1[i].office;
                            $scope.com2[k].parent_committee_id = $scope.com1[i].parent_committee_id;     
                      k++;
                    }
                    
                    else  { 
                        
                         
                          $scope.com3[ll] = {'a':'b'};
                          $scope.com3[ll].chamber1 = "Joint"; 
                           $scope.com3[ll].ci= "s.png"; 
                           $scope.com3[ll].chamber = $scope.com1[i].chamber;
                           $scope.com3[ll].committee_id = $scope.com1[i].committee_id;
                            $scope.com3[ll].name = $scope.com1[i].name;
                            $scope.com3[ll].chamber = $scope.com1[i].chamber;
                            if($scope.com1[i].phone == null)
                                $scope.com3[ll].phone="N.A";
                            else  $scope.com3[ll].phone= $scope.com1[i].phone;
                             if($scope.com1[i].office == null)
                                $scope.com3[ll].office="N.A";
                            else  $scope.com3[ll].office= $scope.com1[i].office;
                            $scope.com3[ll].parent_committee_id = $scope.com1[i].parent_committee_id;     
                         ll++;                          
                          }
                    
                }   // console.log("ll is",ll);
       
        });
        
        
            $scope.pageChangeHandler = function(num) {
            console.log('meals page changed to ' + num);  };
    //document.getElementById("demo").innerHTML = resp;
}); 
                
          /*  app.controller('detcont', function($scope)
              {
                  console.log("Inside detcont");
                function detf() {console.log("DETfun");}
              });*/

     /*   app.controller('OtherController', function OtherController($scope) 
                       {
  $scope.pageChangeHandler = function(num) {
      console.log('going to page ' + num);
  };
} );
// myApp.controller('MyController', MyController);
        */
