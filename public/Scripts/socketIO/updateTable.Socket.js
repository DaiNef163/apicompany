import { response } from "express";
import User from "../../../src/models/User";

function updateTable(data) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    data.forEach(User => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${User.username}</td>
            <td>${User.email}</td>
        `;
        tbody.appendChild(row);
    });
}

// Kết nối tới socket
const socket = io();

// Gửi yêu cầu dữ liệu ban đầu
socket.emit('getData');

// Lắng nghe phản hồi từ máy chủ
socket.on('userData', (data) => {
    updateTable(data);
});

// Xử lý lỗi
socket.on('error', (error) => {
    console.error("Error fetching data", error);
});

// Cập nhật dữ liệu mỗi 5 giây
setInterval(() => {
    socket.emit('getData');
}, 1000);
