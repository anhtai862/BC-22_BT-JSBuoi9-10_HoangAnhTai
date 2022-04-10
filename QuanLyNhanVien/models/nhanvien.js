function NhanVien(
  _taiKhoan,
  _tenNV,
  _email,
  _matKhau,
  _ngayLam,
  _LuongCB,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.tenNV = _tenNV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.LuongCB = _LuongCB;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;
  this.xepLoai = "Trung bình";

  this.tongLuong = function () {
    if (this.chucVu === "Sếp") {
      this.tongLuong = parseFloat(this.LuongCB) * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = parseFloat(this.LuongCB) * 2;
    } else {
      this.tongLuong = this.LuongCB;
    }
  };

  this.loai = function () {
    console.log();
    if (this.gioLam >= 192) {
      this.xepLoai = "Xuất sắc";
    }
    if (this.gioLam >= 176 && this.gioLam < 192) {
      this.xepLoai = "Giỏi";
    }
    if (this.gioLam >= 160 && this.gioLam < 176) {
      this.xepLoai = "Khá";
    }
  };
}
