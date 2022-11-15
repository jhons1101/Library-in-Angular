function validarSoloNumeros(obj){

  var cadena = obj.value; console.log(cadena);

  for (var i = 0; i < cadena.length; i++) {
    if(isNaN(cadena[i])) {
      obj.value = '';
    }
  }
}
