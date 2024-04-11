// Lấy độ dài của bảng với class là "dashboard-1" từ tệp HTML
let dataTableLength = document.getElementsByClassName("dashboard-1")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;

// Cập nhật giá trị của userCount trong tệp HTML
document.getElementById("countEmployee").textContent = dataTableLength;


// Lấy độ dài của bảng với class là "dashboard-1" từ tệp HTML
let dataTableLength1 = document.getElementsByClassName("employee-1")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;

// Cập nhật giá trị của userCount trong tệp HTML
document.getElementById("countUser").textContent = dataTableLength1;