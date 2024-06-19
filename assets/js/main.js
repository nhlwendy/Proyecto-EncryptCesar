// Función principal que configura los event listeners para la interacción con el usuario
function inicio() {
  // Convierte el texto del mensaje a mayúsculas automáticamente
  document.querySelector("#input-message").addEventListener("keyup", function () {
    this.value = this.value.toUpperCase();
  });

  // Event listener para el botón de cifrar
  document.querySelector("#cifrar").addEventListener("click", function (event) {
    event.preventDefault(); // Previene el envío del formulario
    const texto = document.querySelector("#input-message").value; // Obtiene el texto del mensaje
    const desplazamiento = parseInt(document.querySelector("#desplazamiento").value, 10); // Obtiene y convierte el desplazamiento a número entero
    document.querySelector("#result-message").value = cifrar(texto, desplazamiento); // Muestra el mensaje cifrado en el campo de resultado
  });

  // Event listener para el botón de descifrar
  document.querySelector("#descifrar").addEventListener("click", function (event) {
    event.preventDefault(); // Previene el envío del formulario
    const texto = document.querySelector("#input-message").value; // Obtiene el texto del mensaje
    const desplazamiento = parseInt(document.querySelector("#desplazamiento").value, 10); // Obtiene y convierte el desplazamiento a número entero
    document.querySelector("#result-message").value = cifrar(texto, -desplazamiento); // Muestra el mensaje descifrado en el campo de resultado
  });
}

// Función para cifrar (o descifrar) el mensaje
function cifrar(texto, desplazamiento) {
  const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"; // Alfabeto utilizado en el cifrado
  const map = createCharMap(desplazamiento, letras); // Crea un mapa de caracteres con el desplazamiento especificado
  return transformText(texto, map, letras); // Transforma el texto usando el mapa de caracteres y lo retorna
}

// Función para crear un mapa de caracteres con el desplazamiento especificado
function createCharMap(desplazamiento, letras) {
  const map = new Map(); // Crea un nuevo mapa vacío
  // Ajusta el desplazamiento para que esté dentro del rango del alfabeto
  desplazamiento = ((desplazamiento % 27) + 27) % 27;
  // Llena el mapa con los caracteres desplazados
  for (let i = 0; i < letras.length; i++) {
    const char = letras[i]; // Carácter actual
    const newIndex = (i + desplazamiento) % 27; // Calcula el nuevo índice con el desplazamiento
    map.set(char, letras[newIndex]); // Asocia el carácter original con el nuevo carácter desplazado
  }
  return map; // Retorna el mapa de caracteres
}

// Función para transformar el texto usando el mapa de caracteres
function transformText(texto, map, letras) {
  // Convierte cada carácter del texto usando el mapa de caracteres
  return texto.split('').map(char => {
    if (letras.includes(char)) { // Si el carácter está en el alfabeto
      return map.get(char); // Retorna el carácter desplazado
    }
    return char; // Si no está en el alfabeto, retorna el carácter original
  }).join(''); // Une los caracteres en una cadena y la retorna
}

// Inicia la configuración de los event listeners cuando se carga la página
inicio();