import{order_db}from '../db/db.js';
import{customer_db}from '../db/db.js';
import{item_db}from '../db/db.js';
import { Validation } from '../Util/Validation.js';

// TABLE 
let tbody = $("#orderTBody");

// BUTTONS
let btnSave = $("#orderSave");
let btnUpdate = $("#orderUpdate");
let btnDelete = $("#orderDelete");
let btnReset = $("#orderReset");

//DROPDOWN MENU
let comboItem = $("#ItemIdSelector");
let comboCustomer = $("#CustomerSelector");


btnReset.on('click', function(){
    pageReset();
})

pageReset();
function pageReset(){
    //SET DISPLAY NONE (CUSTOMERS & ITEM DETALS)
    $('#custDetails').css('display','none');
    $('#itemDetails').css('display','none');

    //SET BUTTONS (UPDATE / DELETE / RESET) DISABLE
    btnSave.prop("disabled", false);
    btnDelete.prop("disabled", true);
    btnReset.prop("disabled", true);
    btnUpdate.prop("disabled", true);
}


function loadCustomerIdsToDropDown(){
    for(let i = 0; i < customer_db.length; i++){
        comboCustomer.append("<option>"+ customer_db[i].custId +"</option>");
    }
}

function loadItemIdsToDropDown(){
    for(let i = 0; i < item_db.length; i++){
        comboItem.append("<option>"+ item_db[i].item_Id +"</option>");
    }
}



$("#Orders").on("mouseenter", function(){
    //LOAD IDS (CUSTOMERS / ITEMS)
    loadCustomerIdsToDropDown();
    loadItemIdsToDropDown();
})