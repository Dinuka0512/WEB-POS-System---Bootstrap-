import{order_db}from '../db/db.js';
import { Validation } from '../Util/Validation.js';

// TABLE 
let tbody = $("#orderTBody");

// BUTTONS
let btnSave = $("#orderSave");
let btnUpdate = $("#orderUpdate");
let btnDelete = $("#orderDelete");
let btnReset = $("#orderReset");


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