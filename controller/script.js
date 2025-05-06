function pressCustomer(){
    //HERE SHOWING THE CUSTOMER SECTION 
    document.getElementById("Customer").style.display="block";

    //NOW NEED TO HIDE ANOTHER ALL
    document.getElementById("hero").style.display="none";
    document.getElementById("dashboard").style.display="none";
    document.getElementById("Item").style.display="none";
    document.getElementById("Orders").style.display="none";
}

function pressItem(){
    //HERE SHOWING THE CUSTOMER SECTION 
    document.getElementById("Item").style.display="block";

    //NOW NEED TO HIDE ANOTHER ALL
    document.getElementById("hero").style.display="none";
    document.getElementById("dashboard").style.display="none";
    document.getElementById("Customer").style.display="none";
    document.getElementById("Orders").style.display="none";
}

function pressOrders(){
    //HERE SHOWING THE CUSTOMER SECTION 
    document.getElementById("Orders").style.display="block";

    //NOW NEED TO HIDE ANOTHER ALL
    document.getElementById("hero").style.display="none";
    document.getElementById("dashboard").style.display="none";
    document.getElementById("Customer").style.display="none";
    document.getElementById("Item").style.display="none";
}

function pressHome(){
    //HERE SHOWING THE CUSTOMER SECTION 
    document.getElementById("dashboard").style.display="block";
    document.getElementById("hero").style.display="block";

    //NOW NEED TO HIDE ANOTHER ALL
    document.getElementById("Customer").style.display="none";
    document.getElementById("Item").style.display="none";
    document.getElementById("Orders").style.display="none";
}