import { customer_db } from '../db/db.js';
import { Validation } from '../Util/Validation.js';

// TEXT FIELDS
let custId = document.getElementById("custId");
let txtFName = document.getElementById("custFName");
let txtLName = document.getElementById("custLname");
let txtEmail = document.getElementById("custEmail");
let txtContact = document.getElementById("custContact");

//BUTTONS
let btnDelete = document.getElementById("custDelete");
let btnSave = document.getElementById("CustSave");
let btnReset = document.getElementById("custReset");
let btnUpdate = document.getElementById("custUpdate");

loadCustIds();
pageReset();

// Generate unique CUST ID
function loadCustIds() {
    let maxId = 0;

    for (let i = 0; i < customer_db.length; i++) {
        let idNum = parseInt(customer_db[i].custId.replace("C", ""));
        if (idNum > maxId) {
            maxId = idNum;
        }
    }

    let nextId = "C" + String(maxId + 1).padStart(3, "0");
    custId.innerText = nextId;
}

document.getElementById("CustSave").addEventListener('click', function () {
    let id = custId.innerText;
    let fname = txtFName.value;
    let lName = txtLName.value;
    let email = txtEmail.value;
    let contact = txtContact.value;

    let customer = {
        custId: id,
        custFname: fname,
        cuatLname: lName,
        custEmail: email,
        custContact: contact
    };

    if (Validation.isNameValid(fname)) {
        if (Validation.isNameValid(lName)) {
            if (Validation.isEmailValid(email)) {
                if (Validation.isContactValid(contact)) {
                    save(customer);
                } else {
                    Swal.fire("Please Enter a valid Contact");
                }
            } else {
                Swal.fire("Please enter a valid Email");
            }
        } else {
            Swal.fire("Last Name must contain only letters");
        }
    } else {
        Swal.fire("First Name must contain only letters");
    }
});

// Save customer
function save(custObj) {
    customer_db.push(custObj);
    pageReset();
}

// Page Reset
function pageReset() {
    loadCustIds();
    txtFName.value = "";
    txtLName.value = "";
    txtEmail.value = "";
    txtContact.value = "";
    loadTbl();


    btnDelete.disabled = true;
    btnReset.disabled = true;
    btnUpdate.disabled = true;
    btnSave.disabled = false;
}

// Load table
function loadTbl() {
    let tbody = document.getElementById("custTBody");
    tbody.innerHTML = "";

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

loadTbl();

// Table row selection
document.getElementById("custTBody").addEventListener('click', function (e) {
    let row = e.target.closest('tr');
    let cell = row.children;

    for (let i = 0; i < customer_db.length; i++) {
        if (cell[0].innerText == customer_db[i].custId) {
            custId.innerText = customer_db[i].custId;
            txtFName.value = customer_db[i].custFname;
            txtLName.value = customer_db[i].cuatLname;
            txtEmail.value = customer_db[i].custEmail;
            txtContact.value = customer_db[i].custContact;



            btnDelete.disabled = false;
            btnReset.disabled = false;
            btnUpdate.disabled = false;
            btnSave.disabled = true;
        }
    }
});

// Update
document.getElementById("custUpdate").addEventListener('click', function () {
    isValidToUpdate();
});

function isValidToUpdate() {
    let fname = txtFName.value;
    let lName = txtLName.value;
    let email = txtEmail.value;
    let contact = txtContact.value;

    if (Validation.isNameValid(fname)) {
        if (Validation.isNameValid(lName)) {
            if (Validation.isEmailValid(email)) {
                if (Validation.isContactValid(contact)) {
                    update();
                } else {
                    Swal.fire("Please Enter a valid Contact");
                }
            } else {
                Swal.fire("Please enter a valid Email");
            }
        } else {
            Swal.fire("Last Name must contain only letters");
        }
    } else {
        Swal.fire("First Name must contain only letters");
    }
}

function update() {
    let id = custId.innerText;
    let index = customer_db.findIndex(c => c.custId === id);

    if (index !== -1) {
        customer_db[index].custFname = txtFName.value;
        customer_db[index].cuatLname = txtLName.value;
        customer_db[index].custEmail = txtEmail.value;
        customer_db[index].custContact = txtContact.value;

        pageReset();
    }
}

// Delete
document.getElementById("custDelete").addEventListener('click', function () {
    let fname = txtFName.value;
    let lName = txtLName.value;
    let email = txtEmail.value;
    let contact = txtContact.value;

    if (Validation.isNameValid(fname) && Validation.isNameValid(lName) && Validation.isEmailValid(email) && Validation.isContactValid(contact)) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCustomer();
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Customer has been deleted.",
                    icon: "success"
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Customer is safe :)",
                    icon: "error"
                });
            }
        });
    } else {
        Swal.fire("Please select a valid customer to delete.");
    }
});

function deleteCustomer() {
    let id = custId.innerText;
    let index = customer_db.findIndex(c => c.custId === id);

    if (index !== -1) {
        customer_db.splice(index, 1);
        pageReset();
    }
}

// Reset
document.getElementById("custReset").addEventListener("click", function () {
    pageReset();
});
