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

// TABLE
let itemTBody = document.getElementById("itemTbody");



loadItemIds();

function loadItemIds(){}

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
        console.log(item_db);
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

function resetPage(){}