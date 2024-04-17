// $(function () {
//     var socket = io();
//     $('#dataTableUser').submit(function(){
//         // Khởi tạo một mảng để lưu trữ dữ liệu từ bảng
//         var tableData = [];

//         // Lặp qua mỗi hàng trong bảng
//         $('#dataTableUser tbody tr').each(function(index, row){
//             // Lấy dữ liệu từ các ô trong hàng và thêm vào mảng tableData
//             var rowData = {
//                 username: $(row).find('td:eq(0)').text(),
//                 email: $(row).find('td:eq(1)').text()
//             };
//             tableData.push(rowData);
//         });

//         console.log("Gửi thành công");
//         // Gửi dữ liệu đến máy chủ
//         socket.emit('Client-send-data', tableData);

//         return false;
//     });
// });

let socket = io("http://localhost:4000/api/users/displayUsers");

$(function () {
  $("#dataTableUser").click(function () {
    let tableData = [];
  });
  $("#dataTableUser tbody tr").each(function (index, row) {
    // Lấy dữ liệu từ các ô trong hàng và thêm vào mảng tableData
    var rowData = {
      username: $(row).find("td:eq(0)").text(),
      email: $(row).find("td:eq(1)").text(),
    };
    tableData.push(rowData);
    console.log("Gửi thành công");
    // Gửi dữ liệu đến máy chủ
    io.socket.emit("Client-send-data", tableData);

    return false;
  });
});
