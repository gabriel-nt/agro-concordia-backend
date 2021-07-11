function format(value: string, datatype: string): string {
  switch (datatype) {
    case 'currency':
      return `R$${value.replace('.', ',')}`;
    default:
      return value;
  }
}

function sanitize(value: string, datatype: string): string {
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

export { format, sanitize };
