let users = [];
const URL = "../data/users.json";
const cargarUsuarios = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    users = data.users;
  } catch (error) {
    document.getElementById("result").innerHTML =
      "Error al cargar los datos de usuarios";
  }
};
// Algoritmo en amplitud (BFS) para encontrar la distancia
const buscarDistancia = (usuarioOrigen, usuarioDestino) => {
  if (usuarioOrigen === usuarioDestino) return 0;

  let cola = [{ user: usuarioOrigen, distance: 0 }];
  let visitados = new Set();
  visitados.add(usuarioOrigen);

  while (cola.length > 0) {
    const { user, distance } = cola.shift();

    const listaSeguidores = obtenerSeguidores(user);
    for (const seguidor of listaSeguidores) {
      if (seguidor === usuarioDestino) {
        return distance + 1;
      }

      if (!visitados.has(seguidor)) {
        visitados.add(seguidor);
        cola.push({ user: seguidor, distance: distance + 1 });
      }
    }
  }
  return -1;
};
// Función para obtener la lista de seguidores
const obtenerSeguidores = (username) => {
  const user = users.find((element) => element.user === username);
  return user ? user.Following : [];
};
// Función para calcular la distancia
const calcularDistancia = () => {
  let resultText = "";
  const userStart = obtenerValorConFormato("userStart");
  const userEnd = obtenerValorConFormato("userEnd");

  if (!userStart || !userEnd) {
    document.getElementById("result").innerHTML = "Por favor, selecciona ambos usuarios";
    return;
  }

  const distance = buscarDistancia(userStart, userEnd);

  if (distance === -1) {
    resultText = `No existe un camino entre ${userStart} y ${userEnd}.`;
  } else {
    resultText = `La distancia entre ${userStart} y ${userEnd} es: ${distance} ${distance === 1 ? "conexión" : "conexiones"}`;
  }
  document.getElementById("result").innerHTML = resultText;
};

const obtenerValorConFormato = (id) => {
  // Obtiene el valor de un campo, lo convierte todo a minúsculas y cambia la última letra a mayúsculas.
  const valor = document.getElementById(id).value;
  return valor.toLowerCase().replace(/(.)$/, (match) => match.toUpperCase());
};

window.onload = cargarUsuarios;

