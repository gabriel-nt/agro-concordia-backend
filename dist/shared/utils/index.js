"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
exports.sanitize = sanitize;

function format(value, datatype) {
  switch (datatype) {
    case 'currency':
      return `R$${value.replace('.', ',')}`;

    default:
      return value;
  }
}

function sanitize(value, datatype) {
  switch (datatype) {
    case 'currency':
      if (Number(value)) {
        return value;
      }

      return Number(value.replace(',', '.').replace('R$', '')).toFixed(2);

    default:
      return value;
  }
}