"use strict";

const formSubmit = document.getElementById("formSinhVien");
let currentEditIndex = -1;
let isEdit = false;
const itemsPerPage = 5;
let currentPage = 1;

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();

  const hoTen = document.getElementById("hoTen").value;
  const maSV = document.getElementById("maSV").value;
  const ngaySinh = document.getElementById("ngaySinh").value;
  const lop = document.getElementById("lop").value;

  if (!hoTen || !maSV || !ngaySinh || !lop) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  const student = { hoTen, maSV, ngaySinh, lop };
  let listStudent = JSON.parse(localStorage.getItem("listStudent")) || [];

  if (currentEditIndex === -1) {
    
    listStudent.push(student);
  } else {
   
    listStudent[currentEditIndex] = student;
    currentEditIndex = -1;
  }

  localStorage.setItem("listStudent", JSON.stringify(listStudent));
  showStudent();
  document.getElementById("formSinhVien").reset();
  isEdit = false;
  handleBtn();
});

function showStudent() {
  const listStudent = JSON.parse(localStorage.getItem("listStudent")) || [];
  const tableStudent = document
    .getElementById("bangSinhVien")
    .getElementsByTagName("tbody")[0];
  tableStudent.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, listStudent.length);

  for (let i = startIndex; i < endIndex; i++) {
    const student = listStudent[i];
    const row = tableStudent.insertRow();
    row.insertCell(0).innerText = student.hoTen;
    row.insertCell(1).innerText = student.maSV;
    row.insertCell(2).innerText = student.ngaySinh;
    row.insertCell(3).innerText = student.lop;
    const actionsCell = row.insertCell(4);

    const btnEdit = document.createElement("button");
    btnEdit.innerText = "Sửa";
    btnEdit.onclick = () => handleEdit(i);
    actionsCell.appendChild(btnEdit);

    const btnDelete = document.createElement("button");
    btnDelete.innerText = "Xóa";
    btnDelete.onclick = () => handleDelete(i);
    actionsCell.appendChild(btnDelete);
  }

  renderPagination(listStudent.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = i === currentPage ? "active" : "";
    btn.onclick = () => {
      currentPage = i;
      showStudent();
    };
    pagination.appendChild(btn);
  }
}

function handleEdit(index) {
  const listStudent = JSON.parse(localStorage.getItem("listStudent")) || [];
  const student = listStudent[index];

  document.getElementById("hoTen").value = student.hoTen;
  document.getElementById("maSV").value = student.maSV;
  document.getElementById("ngaySinh").value = student.ngaySinh;
  document.getElementById("lop").value = student.lop;

  currentEditIndex = index;
  isEdit = true;
  handleBtn();
}

function handleDelete(index) {
  if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
    let listStudent = JSON.parse(localStorage.getItem("listStudent")) || [];
    listStudent.splice(index, 1);
    localStorage.setItem("listStudent", JSON.stringify(listStudent));
    showStudent();
  }
}

showStudent();

function handleBtn() {
  const form = document.getElementById("formSinhVien");
  let submitBtn = form.querySelector("button[type='submit']");
  if (!submitBtn) {
    submitBtn = document.createElement("button");
    submitBtn.classList.add("btn");
    submitBtn.type = "submit";
    form.appendChild(submitBtn);
  }
  submitBtn.innerText = isEdit ? "Cập nhật" : "Thêm";
}

function resetForm() {
  document.getElementById("formSinhVien").reset();
  currentEditIndex = -1;
  isEdit = false;
  handleBtn();
}
handleBtn();
