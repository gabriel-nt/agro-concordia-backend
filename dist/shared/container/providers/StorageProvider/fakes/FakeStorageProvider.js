"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeStorageProvider {
  constructor() {
    this.files = [];
  }

  async saveFile({
    file,
    filePath
  }) {
    this.files.push(`${filePath}/${file}`);
    return file;
  }

  async deleteFile(file) {
    const findIndex = this.files.findIndex(item => item === file);
    this.files.splice(findIndex, 1);
  }

}

var _default = FakeStorageProvider;
exports.default = _default;