var db = openDatabase("BloodBank", "1.0", "Blood Bank", 200000);  // Open SQLite Database

var searchStatement = "SELECT name,phone,email FROM Donors where bgrp=?";

var dataset;
var DataType; 

function searchRecord() // Get value from Patient and search blood availability
 
{
       var nametemp = $('input:text[id=name]').val();
       var numtemp = $('#number').val();
       var bgrptemp = $("#blood_group").val();
        
        db.transaction(function (tx) { tx.executeSql(searchStatement, [bgrptemp],showRecords,onError); });
 			
        
}
 function onError(tx, error) // Function for Handling Error...
 {
 
    alert(error.message);
 
}


function showRecords(tx,response) // Function For Retrive data from Database Display records as list
 
{
            $("#results").html('')
 			//var output = document.getElementById('results');
            var temp = "<table border=\"1\"><tr><th>Name</th><th>Contact NO.</th><th>email</th></tr>";
            alert(response.rows.length);
            for(var i=0; i<response.rows.length; i++) {
                  temp =temp + '<tr><td>' + response.rows.item(i)['name'] + '</td><td>' + response.rows.item(i)['phone'] + '</td><td>' + response.rows.item(i)['email'] + '</td></tr>';
            }

             $("#results").append(temp);
        //  output.innerHTML=temp;

}
   


$(document).ready(function () // Call function when page is ready for loading
{
;
 
    
  //  initDatabase();
    
    $("#btsearch").click(searchRecord);  // Register Event Listener when button click.
 
});