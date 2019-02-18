var createStatement = "CREATE TABLE IF NOT EXISTS Donors (email varchar(25) PRIMARY KEY,name TEXT ,gender TEXT,dob DATE,phone NUMBER ,bgrp VARCHAR(4))";
 
// var selectAllStatement = "SELECT * FROM Donors";
 
   var insertStatement = "INSERT INTO Donors (email ,name ,gender ,dob ,phone ,bgrp) VALUES (?,?,?,?,?,?)";
 
// var updateStatement = "UPDATE Donors SET name = ?, gender = ?, dob = ?, phone = ?, bgrp = ? WHERE email=?";
 
// var deleteStatement = "DELETE FROM Donors WHERE email=?";
 
// var dropStatement = "DROP TABLE Donors";
 
 var db = openDatabase("BloodBank", "1.0", "Blood Bank", 200000);  // Open SQLite Database
 
// var dataset;
 
// var DataType;

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
 
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
 
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
 
   // $("body").fadeIn(2000); // Fede In Effect when Page Load..
 
    initDatabase();
    
    $("#NDsubmit").click(insertRecord);  // Register Event Listener when button click.
 
    // $("#btnUpdate").click(updateRecord);
 
    // $("#btnReset").click(resetForm);
 
    // $("#btnDrop").click(dropTable);
 
});