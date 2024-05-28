document
  .querySelector("#formSinhVien")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const hoTen = document.getElementById("hoTen").value;
    const maSV = document.getElementById("maSV").value;
    const ngaySinh = document.getElementById("ngaySinh").value;
    const lop = document.getElementById("lop").value;
    if (!hoTen || !maSV || !ngaySinh || !lop) {
      alert("Vui long nhap day du thong tin");
      return;
    }
    const sinhVien = { hoTen, maSV, ngaySinh, lop };
    const danhSachSinhVien =
      JSON.parse(localStorage.getItem("danhSachSinhVien")) || [];
    danhSachSinhVien.push(sinhVien);
    localStorage.setItem("danhSachSinhVien", JSON.stringify(danhSachSinhVien));
    hienThiSinhVien();
  });
function hanldeEdit(index) {
  const danhSachSinhVien =
    JSON.parse(localStorage.getItem("danhSachSinhVien")) || [];
  const sinhVien = danhSachSinhVien[index];

  document.getElementById("hoTen").value = sinhVien.hoTen;
  document.getElementById("maSV").value = sinhVien.maSV;
  document.getElementById("ngaySinh").value = sinhVien.ngaySinh;
  document.getElementById("lop").value = sinhVien.lop;

  danhSachSinhVien.splice(index, 1);
  localStorage.setItem("danhSachSinhVien", JSON.stringify(danhSachSinhVien));
  hienThiSinhVien();
}
function hienThiSinhVien() {
  const tableStudent = document.getElementById("bangSinhVien");
  const danhSachSinhVien =
    JSON.parse(localStorage.getItem("danhSachSinhVien")) || [];
  tableStudent.innerHTML = `<tr>
    <th>Họ tên</th>
    <th>Mã SV</th>
    <th>Ngày sinh</th>
    <th>Lớp</th>
    <th>Hành động</th>
</tr>`;
  danhSachSinhVien.forEach((student, index) => {
    const row = tableStudent.insertRow();
    row.insertCell(0).innerText = student.hoTen;
    row.insertCell(1).innerText = student.maSV;
    row.insertCell(2).innerText = student.ngaySinh;
    row.insertCell(3).innerText = student.lop;
    const actionCell = row.insertCell(4);
    const btnEdit = document.createElement("button");
    btnEdit.innerText = "Sửa";
    btnEdit.onclick = () => {
      console.log("aa");
      hanldeEdit(index);
    };
    actionCell.appendChild(btnEdit);

    const btnDelete = document.createElement("button");
    btnDelete.innerText = "Xóa";
    actionCell.appendChild(btnDelete);
  });
}
hienThiSinhVien();
