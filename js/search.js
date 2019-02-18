var db = openDatabase("BloodBank", "1.0", "Blood Bank", 200000);  // Open SQLite Database
var createStatement = "CREATE TABLE IF NOT EXISTS Patients (name TEXT ,phone NUMBER ,bgrp VARCHAR(4))";
var insertStatement = "INSERT INTO Patients (name ,phone ,bgrp) VALUES (?,?,?)";
var searchStatement = "SELECT name,phone,email FROM Donors where bgrp=?";

var dataset;
var DataType; 
 function initDatabase()  // Function Call When Page is ready.
 
{
 
    try {
 
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
 
        {
 
            alert('Databases are not supported in this Device.');
 
        }
 
        else {
 
            createTable();  // If supported then call Function for create table in SQLite
 
        }
 
    }
 
    catch (e) {
 
        if (e == 2) {
 
            // Version number mismatch. 
 
            console.log("Invalid database version.");
 
        } else {
 
            console.log("Unknown error " + e + ".");
 
        }
 
        return;
 
    }
 
}

function createTable()  // Function for Create Table in SQLite.
 
{
 
    db.transaction(function (tx) { tx.executeSql(createStatement); });
 
}

function searchRecord() // Get value from Patient and search blood availability
 
{
       var nametemp = $('input:text[id=name]').val();
       var numtemp = $('#number').val();
       var bgrptemp = $("#blood_group").val();
        
    //    db.transaction(function (tx) { tx.executeSql(insertStatement, [nametemp, numtemp, bgrptemp]); });
        db.transaction(function (tx) { tx.executeSql(searchStatement, [bgrptemp],showRecords,onError); });
 			
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}
 function onError(tx, error) // Function for Handling Error...
 {
 
    alert(error.message);
 
}


function showRecords(tx,response) // Function For Retrive data from Database Display records as list
 
{
 			var output = document.getElementById('results');
            var temp = "<table border=\"1\"><tr><th>Name</th><th>Contact NO.</th><th>email</th></tr>";
            alert(response.rows.length);
            for(var i=0; i<response.rows.length; i++) {
                  temp =temp + '<tr><td>' + response.rows.item(i)['name'] + '</td><td>' + response.rows.item(i)['phone'] + '</td><td>' + response.rows.item(i)['email'] + '</td></tr>';
            }
          output.innerHTML=temp;

}
   


$(document).ready(function () // Call function when page is ready for loading
{
;
 
   // $("body").fadeIn(2000); // Fede In Effect when Page Load..
 
    initDatabase();
    
    $("#btsearch").click(searchRecord);  // Register Event Listener when button click.
 
    // $("#btnUpdate").click(updateRecord);
 
    // $("#btnReset").click(resetForm);
 
    // $("#btnDrop").click(dropTable);
 
});