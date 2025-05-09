import { customer_db } from '../db/db.js';
import { Validation } from '../Util/Validation.js';

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
    let id = custId.innerText;
    let fname = txtFName.value;
    let lName = txtLName.value;
    let email = txtEmail.value;
    let contact = txtContact.value;


    // CREATEING CUSTOMER OBJ
    let customer = {
        custId : id,
        custFname : fname,
        cuatLname : lName,
        custEmail : email,
        custContact : contact
    }

    if(Validation.isNameValid(fname)){
        if(Validation.isNameValid(lName)){
            if(Validation.isEmailValid(email)){
                if(Validation.isContactValid(contact)){
                    //All OK
                    save(customer);
                }else{
                    Swal.fire("Please Enter The valid Contact");
                }
            }else{
                Swal.fire("Please enter the valid email");
            }
        }else{
            Swal.fire("Please enter the valid name, The Name Only can have letters");
        }
    }else{
        Swal.fire("Please enter the valid name, The Name Only can have letters");
    }
})


// CUSTOMER SAVE HERE
function save(custObj){
    customer_db.push(custObj);
    console.log(customer_db);

    pageReset();
}


//HERE RESET THE PAGE
function pageReset(){
    txtFName.value = "";
    txtLName.value = "";
    txtEmail.value = "";
    txtContact.value = "";
    
    loadCustIds();
    loadTbl();
}


loadTbl();
// HERE LOAD THE TABLE
function loadTbl() {
    let tbody = document.getElementById("custTBody");
    tbody.innerHTML = ""; // Clear previous rows

    for (let i = 0; i < customer_db.length; i++) {
        let row = document.createElement("tr");

        let cellId = document.createElement("td");
        cellId.textContent = customer_db[i].custId;

        let cellName = document.createElement("td");
        cellName.textContent = customer_db[i].custFname + " " + customer_db[i].cuatLname;

        let cellEmail = document.createElement("td");
        cellEmail.textContent = customer_db[i].custEmail;

        let cellContact = document.createElement("td");
        cellContact.textContent = customer_db[i].custContact;

        row.appendChild(cellId);
        row.appendChild(cellName);
        row.appendChild(cellEmail);
        row.appendChild(cellContact);

        tbody.appendChild(row);
    }
}
