import { order_db } from "../db/db.js";
import { orderDetails_db } from "../db/db.js";
import { item_db } from "../db/db.js";

let tablebody = $("#ResentSalesTable");
let todayIncome = $("#TodayIncome");
let MonthlyIncome = $("#MonthlyIncome");
let yearlyIncome = $("#YearlyIncome");

$("#dash").on('mouseenter', function(){
    loadTableResentSales();
    loadTodayIncome();
    loadMonthlyIncome();
    loadYearlyIncome();
});

function loadTableResentSales() {
    tablebody.empty();
    for (let order of order_db) {
        let orderId = order.orderId;
        let custId = order.custId;

        for (let detail of order.orderdetail) {
            let itemId = detail.itemId;
            let qty = detail.qty;

            let row = `<tr>
                <td>${orderId}</td>
                <td>${custId}</td>
                <td>${itemId}</td>
                <td>${qty}</td>
            </tr>`;
            tablebody.append(row);
        }
    }
}

function loadTodayIncome() {
    let today = new Date().toLocaleDateString('en-CA'); // "YYYY-MM-DD"
    let total = 0;

    for (let order of order_db) {
        let orderDate = new Date(order.date).toLocaleDateString('en-CA');
        if (orderDate === today) {
            for (let detail of order.orderdetail) {
                let price = findItemPrice(detail.itemId);
                total += detail.qty * price;
            }
        }
    }

    todayIncome.text(total.toFixed(2));
}

function loadMonthlyIncome() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth(); // 0-indexed
    let total = 0;

    for (let order of order_db) {
        let orderDate = new Date(order.date);
        if (orderDate.getFullYear() === year && orderDate.getMonth() === month) {
            for (let detail of order.orderdetail) {
                let price = findItemPrice(detail.itemId);
                total += detail.qty * price;
            }
        }
    }

    MonthlyIncome.text(total.toFixed(2));
}

function loadYearlyIncome() {
    let year = new Date().getFullYear();
    let total = 0;

    for (let order of order_db) {
        let orderDate = new Date(order.date);
        if (orderDate.getFullYear() === year) {
            for (let detail of order.orderdetail) {
                let price = findItemPrice(detail.itemId);
                total += detail.qty * price;
            }
        }
    }

    yearlyIncome.text(total.toFixed(2));
}

// Utility to find item price
function findItemPrice(itemId) {
    let item = item_db.find(i => i.item_Id === itemId);
    return item ? item.item_price : 0;
}
