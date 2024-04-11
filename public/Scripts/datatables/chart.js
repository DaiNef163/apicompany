document.addEventListener('DOMContentLoaded', function() {
    // Lấy số lượng từ mỗi bảng dữ liệu và cập nhật các thẻ span tương ứng
    let dataTableEmployee = document.getElementsByClassName("employee-1")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    document.getElementById("countEmployee").textContent = dataTableEmployee;

    let dataTableUser = document.getElementsByClassName("user-1")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    document.getElementById("countUser").textContent = dataTableUser;

    let dataTableProduct = document.getElementsByClassName("product-1")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    document.getElementById("countProduct").textContent = dataTableProduct;

    // Tạo dữ liệu cho biểu đồ
    let labels = ['Users', 'Employees', 'Products'];
    let data = [dataTableUser, dataTableEmployee, dataTableProduct];

    // Hàm khởi tạo biểu đồ
    function initializeChart() {
        // Tạo biểu đồ cột bằng Chart.js
        let ctx = document.getElementById('profitChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Count',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Gọi hàm khởi tạo biểu đồ
    initializeChart();
});
