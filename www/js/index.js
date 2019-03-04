var createStatement = "CREATE TABLE IF NOT EXISTS Donors (email varchar(25) PRIMARY KEY,name TEXT ,gender TEXT,dob DATE,phone NUMBER ,bgrp VARCHAR(4))";
 

 
   var insertStatement = "INSERT INTO Donors (email ,name ,gender ,dob ,phone ,bgrp) VALUES (?,?,?,?,?,?)";
 

 
 var db = openDatabase("BloodBank", "1.0", "Blood Bank", 200000);  // Open SQLite Database
 


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

function insertRecord() // Get value from Input and insert record . Function Call when Register Button is Clicked
 
{
       var emailtemp = $('#mailid').val();
       var nametemp = $('input:text[id=name]').val();

       var gentemp = $('input[name="gender"]:checked').val();
 
       var dobtemp = $('#dob').val();
       var numtemp = $('#number').val();
       var bgrptemp = $("#blood_group").val();
        
        db.transaction(function (tx) { tx.executeSql(insertStatement, [emailtemp, nametemp, gentemp, dobtemp, numtemp, bgrptemp], loadAndReset, onError); });
 
        
}


function loadAndReset() //Function for Load and Reset...
 
{
    alert("Donor Registered !!!");
    resetForm();
 
}
function resetForm() // Function for reset form input values.
 
{
 
    $("#name").val("");
  
    $("#number").val("");
 
}
 
function onError(tx, error) // Function for Hendeling Error...
 
{
 
    alert(error.message);
 
}

$(document).ready(function () // Call function when page is ready for loading
{
;

 
    initDatabase();
    
    $("#NDsubmit").click(insertRecord);  // Register Event Listener when button click.
 

 
});