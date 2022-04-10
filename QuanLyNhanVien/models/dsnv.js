function DanhSachNhanVien() {
  this.arr = [];

  this.themNV = function (nv) {
    this.arr.push(nv);
  };

  this.timKiemViTriNV = function (taiKhoan) {
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      var nhanVien = this.arr[i];
      if (nhanVien.taiKhoan === taiKhoan) {
        index = i;
        break;
      }
    }
    return index;
  };
  this._xoaNV = function (taiKhoan) {
    var index = this.timKiemViTriNV(taiKhoan);

    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };
  this._suaNV = function (taiKhoan) {
    var index = this.timKiemViTriNV(taiKhoan);

    if (index !== -1) {
      var nhanVien = this.arr[index];
      return nhanVien;
    }
    return null;
  };
  this.capNhatNV = function (nhanVien) {
    var index = this.timKiemViTriNV(nhanVien.taiKhoan);
    if (index !== -1) {
      this.arr[index] = nhanVien;
    }
  };

  this.timKiemNV = function (keyword) {
    var mangTimKiem = [];
    for (i = 0; i < this.arr.length; i++) {
      var nhanVien = this.arr[i];
      if (
        nhanVien.xepLoai.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      ) {
        mangTimKiem.push(nhanVien);
      }
    }
    return mangTimKiem;
  };
}
