import{order_db}from '../db/db.js';
import{customer_db}from '../db/db.js';
import{item_db}from '../db/db.js';
import{orderDetails_db}from '../db/db.js';
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

//ID
let lblOrderId = $("#lblOrderId");


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

    $("#txtQty").prop('disabled',true);

    //GENARATE NEW ORDER ID
    genarateNewOrderId();
}


function loadCustomerIdsToDropDown(){
    comboCustomer.html("<option selected>Choose</option>");
    for(let i = 0; i < customer_db.length; i++){
        comboCustomer.append("<option>"+ customer_db[i].custId +"</option>");
    }
}

function loadItemIdsToDropDown(){
    comboItem.html("<option selected>Choose</option>");
    for(let i = 0; i < item_db.length; i++){
        comboItem.append("<option>"+ item_db[i].item_Id +"</option>");
    }
}


//THERE ADDED THE FUNTION TO LOAD COMBO BOX DATA ON WHEN MOUSE ENTERD TO THE ORDERS
$("#Orders").on("mouseenter", async function(){
    //LOAD IDS (CUSTOMERS / ITEMS)
    loadCustomerIdsToDropDown();
    loadItemIdsToDropDown();
})

comboCustomer.on("click", function(){
    if(customer_db.length == 0){
        Swal.fire("There Havent Any Customers..\n Before Place Orders Save new Customer!");
    }else{
        let selectedCustomer = comboCustomer.val();

        //NOW GET INDEX MATCHING 
        let index;
        let check = false;
        for(let i = 0; i < customer_db.length; i++){
            if(selectedCustomer == customer_db[i].custId){
                index = i;
                check = true;
            }
        }

        //CHECK IS SELECTED THE CUSTOMER OR CHOOSE OPTION
        if(check){
            //ADDING REAL VALUES
            $("#cName").html(customer_db[index].custFname + " " + customer_db[index].cuatLname);
            $("#cAddress").html(customer_db[index].custAddress);

            //SHOW DETAILS
            $('#custDetails').css('display','block');
        }else{
            //IF SELECTED THE CHOOSE OPTION DETAILS ARE DESSAPIER 
            $('#custDetails').css('display','none');
        }
    }
})

let itemIndex;
comboItem.on('click', function(e){
    if(item_db.length == 0){
        Swal.fire("There Havent Any Items..\n Before Place Orders Save new Item!");
    }else{
        let selectedItem = comboItem.val();

        //NOW NEED TO GET THE INDEX
        let index ;
        let check = false;
        for(let i = 0; i < item_db.length; i++){
            if(selectedItem == item_db[i].item_Id){
                index = i;
                check = true;
            }
        }

        if(check){
            //NEED TO ADD REAL VALUES
            $("#iName").html(item_db[index].item_Name);
            $("#iQty").html(item_db[index].item_qty);
            $("#iprice").html(item_db[index].item_price);

            itemIndex = index;

            //NEED TO SHOW IT NOW
            $('#itemDetails').css('display','block');
            $("#txtQty").prop('disabled',false);
        }else{
            //IF SELECTED THE CHOOSE OPTION DETAILS ARE DESSAPIER 
            $('#itemDetails').css('display','none');
            $("#txtQty").prop('disabled',true);
        }
    }
})

//ADD EVENT LISTNER TO QTY TEXT FEILD
$("#txtQty").on("keyup", function () {
    // Get input value and convert to number
    const itemsBuy = parseFloat($("#txtQty").val()) || 0;

    // Check if item data is available
    if (!item_db || !item_db[itemIndex]) {
        Swal.fire("Error", "Item data not found!", "error");
        $("#Total").html("INVALID");
        return;
    }

    const itemPrice = item_db[itemIndex].item_price;
    const qtyOnHand = item_db[itemIndex].item_qty;

    // Validate input
    if (isNaN(itemsBuy) || itemsBuy < 0) {
        Swal.fire("Invalid Input", "Please enter a valid quantity!", "warning");
        $("#txtQty").val(""); // Clear invalid input
        $("#Total").html("Rs 0");
        return;
    }

    if (itemsBuy === 0) {
        Swal.fire("Invalid Quantity", "Cannot buy zero items!", "warning");
        $("#Total").html("Rs 0");
        return;
    }

    if (itemsBuy > qtyOnHand) {
        Swal.fire("Out of Stock", "Not enough quantity to fulfill your request!", "warning");
        $("#Total").html("Rs 0");
        return;
    }

    // Calculate and display total
    const total = (itemPrice * itemsBuy).toFixed(2); // Round to 2 decimal places
    $("#Total").html(`Rs ${total}`);
});

genarateNewOrderId();
function genarateNewOrderId(){
    let maxId = 0;

    for (let i = 0; i < order_db.length; i++) {
        let idNum = parseInt(order_db[i].orderId.replace("O", ""));
        if (idNum > maxId) {
            maxId = idNum;
        }
    }

    let nextId = "O" + String(maxId + 1).padStart(3, "0");
    $("#lblOrderId").text(nextId);
}

$("#addToCart").on("click", function(){
    let lblId = lblOrderId.text();
    let Buyingqty = $("#txtQty").val();
    let itemId = comboItem.val();

    let index;
    let check = false;
    for(let i = 0; i < item_db.length; i++){
        if(itemId == item_db[i].itemId){
            index = i;
            check = true;
        }
    }

    if(check){
        //NOW SAVE TO ORDER DETAILS TABLE
        
    }
})