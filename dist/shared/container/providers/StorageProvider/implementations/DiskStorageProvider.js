"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorageProvider {
  async saveFile({
    file,
    filePath
  }) {
    await _fs.default.promises.mkdir(_path.default.resolve(_upload.default.uploadsFolder, filePath), {
      recursive: true,
      mode: 777
    });
    await _fs.default.promises.rename(_path.default.resolve(_upload.default.tmpFolder, file), _path.default.resolve(_upload.default.uploadsFolder, filePath, file));
    return `${filePath}/${file}`;
  }

  async deleteFile(file) {
    const pathFile = _path.default.resolve(_upload.default.uploadsFolder, file);

    try {
      await _fs.default.promises.stat(pathFile);
    } catch {
      return;
    }

    await _fs.default.promises.unlink(pathFile);
  }

}

var _default = DiskStorageProvider;
exports.default = _default;