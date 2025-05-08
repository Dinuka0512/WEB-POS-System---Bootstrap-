import { customer_db } from '../db/db.js';

//TEXT FEILDS
let custId = document.getElementById("custId");
let txtFName = document.getElementById("custFName");
let txtLName = document.getElementById("custLname");
let txtEmail = document.getElementById("custEmail");
let txtContact = document.getElementById("custContact");


loadCustIds();


// GENERATE  THE CUST ID
function loadCustIds(){
    custId.innerText = "C" + String(customer_db.length + 1).padStart(3,"0");
}



document.getElementById("CustSave").addEventListener('click', function(){
    
})