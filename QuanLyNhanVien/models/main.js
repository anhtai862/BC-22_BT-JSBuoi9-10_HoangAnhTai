// tao doi tuong dsnv từ lơp đối tượng DanhSachNhanVien
var dsnv = new DanhSachNhanVien();

var validation = new Validation();

getLocalStorage();
function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNhanVien() {
  // DOm toi cac the input de lay gia tri
  var taiKhoan = getEle("tknv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  // cờ flag
  var isValid = true;
  //Validation taiKhoan

  isValid &=
    validation.kiemTraRong(taiKhoan, "tbTKNV", "(*)không để trống") &&
    validation.kiemTraDoDaiKyTu(
      taiKhoan,
      "tbTKNV",
      "Tài khoản tối đa 4 - 6 ký số",
      4,
      6
    ) &&
    validation.kiemTraNumber(taiKhoan, "tbTKNV", "Vui lòng Nhập Số");

  //Validation ten

  isValid &=
    validation.kiemTraRong(tenNV, "tbTen", "(*)không để trống") &&
    validation.kiemTraChuoiKyTu(tenNV, "tbTen", "Kiểm Tra Lại Chuỗi Kỹ Tự");

  //Validation email

  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*)không để trống") &&
    validation.kiemTraEmail(email, "tbEmail", "Email không đúng định dạng");
  //Validation matkhau

  isValid &=
    validation.kiemTraRong(matKhau, "tbMatKhau", "(*)không để trống") &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "tbMatKhau",
      "Mật khẩu tối đa 6 - 10 ký tự",
      6,
      10
    ) &&
    validation.kiemTraMatKhau(
      matKhau,
      "tbMatKhau",
      "Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );
  //Validation ngaylam

  isValid &=
    validation.kiemTraRong(ngayLam, "tbNgay", "(*)không để trống") &&
    validation.kiemTraDate(ngayLam, "tbNgay", "Nhập Đúng định dạng mm/dd/yyyy");
  //Validation luong

  isValid &=
    validation.kiemTraRong(luongCB, "tbLuongCB", "(*)không để trống") &&
    validation.kiemTraNumber(luongCB, "tbLuongCB", "Vui lòng Nhập Số") &&
    validation.kiemTraDoDaiKyTu(
      luongCB,
      "tbLuongCB",
      "Lương cơ bản 1 000 000 - 20 000 000",
      7,
      8
    );

  //Validation chucvu

  isValid &= validation.selectOption(
    chucVu,
    "tbChucVu",
    "(*)Chức Vụ không để trống"
  );
  //Validation giolam

  isValid &=
    validation.kiemTraRong(gioLam, "tbGiolam", "(*)không để trống") &&
    validation.kiemTraNumber(gioLam, "tbGiolam", "Vui lòng Nhập Số") &&
    validation.kiemTraGioLam(
      gioLam,
      "tbGiolam",
      "Vui lòng chỉ nhập số từ 80 -200"
    );

  if (!isValid) return null;

  // tạo đối tượng nhanVien từ đối tượng NhanVien()
  nhanVien = new NhanVien(
    taiKhoan,
    tenNV,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  );
  nhanVien.tongLuong();
  nhanVien.loai();
  return nhanVien;
}

/**
 * Thêm nhân viên
 */

getEle("btnThemNV").addEventListener("click", function () {
  var nhanVien = layThongTinNhanVien();

  if (nhanVien) {
    dsnv.themNV(nhanVien);

    taoBang(dsnv.arr);
    setLocalStorage();
    cleardata();
  }
});

getEle("btnThem").addEventListener("click", function () {
  cleardata();
});

function cleardata() {
  getEle("tknv").value = "";
  getEle("tknv").disabled = false;
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("luongCB").value = "";
  getEle("chucvu").value = "";
  getEle("gioLam").value = "";
}

function taoBang(arr) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    var nhanVien = arr[i];
    content += `
      <tr>
      <td>${nhanVien.taiKhoan}</td>
      <td>${nhanVien.tenNV}</td>
      <td>${nhanVien.email}</td>
      <td>${nhanVien.ngayLam}</td>
      <td>${nhanVien.chucVu}</td>
      <td>${nhanVien.tongLuong}</td>
      <td>${nhanVien.xepLoai}</td>

      <td>
      <button  class="btn btn-danger" onclick="xoaNV('${nhanVien.taiKhoan}')">Xoá
      </button>
      <button  class="btn btn-success" onclick="suaNV('${nhanVien.taiKhoan}')"data-toggle="modal" data-target="#myModal">Sửa
      </button>
      </td>

      </tr>
      `;
  }
  getEle("tableDanhSach").innerHTML = content;
}

function xoaNV(taiKhoan) {
  dsnv._xoaNV(taiKhoan);
  taoBang(dsnv.arr);
  setLocalStorage();
}

function suaNV(taiKhoan) {
  var nhanVien = dsnv._suaNV(taiKhoan);
  if (nhanVien) {
    getEle("tknv").disabled = true;

    getEle("tknv").value = nhanVien.taiKhoan;
    getEle("name").value = nhanVien.tenNV;
    getEle("email").value = nhanVien.email;
    getEle("password").value = nhanVien.matKhau;
    getEle("datepicker").value = nhanVien.ngayLam;
    getEle("luongCB").value = nhanVien.luongCB;
    getEle("chucvu").value = nhanVien.chucVu;
    getEle("gioLam").value = nhanVien.gioLam;
  }
}

getEle("btnCapNhat").addEventListener("click", function () {
  var nhanVien = layThongTinNhanVien();

  dsnv.capNhatNV(nhanVien);
  taoBang(dsnv.arr);
  setLocalStorage();
});

getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemNV(keyword);
  taoBang(mangTimKiem);
});
function setLocalStorage() {
  var dataString = JSON.stringify(dsnv.arr);
  localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
  var data = localStorage.getItem("DSNV");
  if (data) {
    var dataJson = JSON.parse(data);

    dsnv.arr = dataJson;

    taoBang(dsnv.arr);
  }
}
