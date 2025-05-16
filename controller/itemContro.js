import { item_db } from '../db/db.js';
import { Validation } from '../Util/Validation.js';

//SELECT ITEMS FROM DOM
let lblItemId = document.getElementById("itemId");
let txtItemName = document.getElementById("itemName");
let txtItemQty = document.getElementById("itemQty");
let txtItemPrice = document.getElementById("itemPrice");

//BUTTONS
let btnSave = document.getElementById("itemSaveBtn");
let btnDelete = document.getElementById("itemDeleteBtn");
let btnUpdate = document.getElementById("itemUpdateBtn");
let btnReset = document.getElementById("itemResetBtn");

btnReset.addEventListener("click", function(){
    resetPage();
})

genarateNextId();
function genarateNextId(){
    
}

btnSave.addEventListener('click', function(){
    saveItems();
})

function saveItems(){
    if(isValidToSave()){
        // OBJECT
        let itemObj = {
            item_Id : lblItemId.innerText,
            item_Name : txtItemName.value,
            item_qty : txtItemQty.value,
            item_price : txtItemPrice.value
        }

        item_db.push(itemObj);

        resetPage();
    }
}

function isValidToSave(){
    if(Validation.isItemNameValid(txtItemName.value)){
        if(Validation.isIntegerValid(parseInt(txtItemQty.value))){
            if(Validation.isDoubleValid(txtItemPrice.value)){
                return true;
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Invalid Price",
                    text: "Please enter a valid price (e.g., 100 or 99.99).",
                });
            }
        }else{
           Swal.fire({
                icon: "error",
                title: "Invalid Quantity",
                text: "Please enter a valid whole number for item quantity.",
            });
        }
    }else{
        Swal.fire("Item Name is not Valid! Or Item name can't be null");
    }
    return false;
}

function updateItems(){}

function deleteItems(){}

function resetPage(){
    loadTable();
    cleartext();
}


function loadTable(){
    // TABLE
    let tbody = document.getElementById("itemTbody");
    tbody.innerHTML = "";
    
    for(let i = 0; i < item_db.length; i++){
        let row = document.createElement("tr");

        let cellId = document.createElement("td");
        cellId.textContent = item_db[i].item_Id;

        let cellName = document.createElement("td");
        cellName.textContent = item_db[i].item_Name;

        let cellQty = document.createElement("td");
        cellQty.textContent = item_db[i].item_qty;

        let cellPrice = document.createElement("td");
        cellPrice.textContent = item_db[i].item_price;

        row.appendChild(cellId);
        row.appendChild(cellName);
        row.appendChild(cellQty);
        row.appendChild(cellPrice);

        tbody.appendChild(row);
    }
}

function cleartext(){
    genarateNextId();

    txtItemName.value = "";
    txtItemPrice.value = "";
    txtItemQty.value = "";
}


let tbody = document.getElementById("itemTbody");
tbody.addEventListener('click', function(e){
    let row = e.target.closest('tr');
    let cell = row.children;

    for(let i = 0; i < item_db.length; i++){
        if(cell[0].innerText == item_db[i].item_Id){
            lblItemId.innerText = item_db[i].item_Id;
            txtItemName.value = item_db[i].item_Name;
            txtItemQty.value = item_db[i].item_qty;
            txtItemPrice.value = item_db[i].item_price;
        }
    }
})