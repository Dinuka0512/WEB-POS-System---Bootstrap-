import{order_db}from '../db/db.js';
import{customer_db}from '../db/db.js';
import{item_db}from '../db/db.js';
import{orderDetails_db}from '../db/db.js';
import OrderDetailsModel from '../model/orderDetailsModel.js';
import orderDetailsModel from '../model/orderDetailsModel.js';
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
        $("#txtQty").val(""); // Clear invalid input
        $("#Total").html("Rs 0");
        return;
    }

    if (itemsBuy > qtyOnHand) {
        Swal.fire("Out of Stock", "Not enough quantity to fulfill your request!", "warning");
        $("#txtQty").val(""); // Clear invalid input
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
    let Buyingqty = parseFloat($("#txtQty").val());
    let itemId = comboItem.val();

    console.log(Buyingqty);
    console.log(item_db);

    //HERE CHECK IS BUYING CONTITY IS NULL
    if (!$("#txtQty").val() || isNaN(Buyingqty)) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Data',
            text: 'Null or missing value detected in Qty',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
        });
        return;
    }


    // if(Buyingqty != 0 && parseFloat(item_db[itemIndex].item_qty) <= Buyingqty){
    //     //HERE SAVE TO THE ORDER DETAIL MODEL
    //     let orderdetails = new OrderDetailsModel(lblId, itemId, Buyingqty);
    //     orderDetails_db.push(orderdetails);
    //     console.log(orderDetails_db);
    // }

    // let index;
    // let check = false;
    // for(let i = 0; i < orderDetails_db.length; i++){
    //     if(lblId == orderDetails_db[i].orderId){
    //         if(itemId == orderDetails_db[i].itemId){
    //             index = i;
    //             check = true;
    //         }
    //     }
    // }

    // //THERE  I NEED TO REMOVE THE SAME ORDER ID / AMD ITEM ID 
    // //IS THERE HAVE I NEEED TO ADDITION THE QTY THERE 

    // //AND ALSO THERE NEED TO reduce from the item qty ...
    // //WHET WE HAVE BUYING QTY 

    // if(check){
    //     //IF THERE HAVE ADDED AGAIN NOW WE CAN UPDATE THE ORDERDETAILDB 
    //     orderDetails_db[index].qty = orderDetails_db[index].qty + Buyingqty;
    // }

    loadTable();
})

function loadTable(){
    let table = $("#orderTBody");
    table.empty();

    for(let i =0; i < orderDetails_db.length; i++){
        // Assuming this is inside a loop
        let row = document.createElement('tr');

        // Create table cells
        const orderIdCell = document.createElement('td');
        orderIdCell.textContent = orderDetails_db[i].orderId || ''; // Fallback for undefined
        row.appendChild(orderIdCell);

        const itemIdCell = document.createElement('td');
        itemIdCell.textContent = orderDetails_db[i].itemId || '';
        row.appendChild(itemIdCell);

        const qtyCell = document.createElement('td');
        qtyCell.textContent = orderDetails_db[i].qty || '';
        row.appendChild(qtyCell);

        // Create Remove button
        const buttonCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.className = 'btn-danger p-1';
        removeButton.textContent = 'Remove';
        removeButton.dataset.orderId = orderDetails_db[i].orderId; // Unique identifier for the row
        removeButton.addEventListener('click', () => {
            // Example: Remove row or send request to delete order
            console.log(`Removing order: ${orderDetails_db[i].orderId}`);
            row.remove(); // Remove row from DOM
        });
        buttonCell.appendChild(removeButton);
        row.appendChild(buttonCell);

        // Append row to table (assuming table exists with id="orderTable")
        tbody.append(row);
    }
}

$("#remove-btn").on("click", function () {
    console.log("hi");
});