export function numberToReal(numero: any) {
  var numero = numero.toFixed(2).split(".");
  numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join(".");
  return numero.join(",");
}
