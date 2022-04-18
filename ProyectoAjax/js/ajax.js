(() => {
  //Creamos el objeto Ajax
  const xhr = new XMLHttpRequest();

  //Variables para manupulacion en el DOM.
  const $xhr = document.getElementById("xhr");
  const $fragment = document.createDocumentFragment();

  //Asigmanos al obj Ajax, el o los eventos q manipularemos de la peticion. DOS FORMAS:
  //xhr.onreadystatechange = funcion manejadora. o ->
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return; //Validacion para filtar solo el READY_STATE_COMPLETE =4
    if (xhr.status >= 200 && xhr.status <= 300) {
      //PARTE EXITOSA.
      console.log(xhr);
      //Validamos que la peticiones se exitosa
      console.log("Respuesta Exitosa");
      let json = JSON.parse(xhr.responseText); //parseamos a JSON la respuesta en texto. importante para ver como accdedemos a los campos que queremos mostrar.

      //Recoremos cada JSON
      json.map((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `<b>${el.name}</b>--${el.email}--${el.phone}--${el.address.city}`;
        $fragment.appendChild($li);
      });
      $xhr.appendChild($fragment);
      console.log(json);
    } else {
      //PARTE DE ERROR.
      let message = xhr.statusText || "Ocurrio un error";
      $xhr.innerHTML = `Error ${xhr.status}:${message}`;
      console.error("Error");
    }

    console.log(
      "Este mensaje cargara de cualquier forma, sea o no exitosa la peticion."
    );
  });

  //Abrir la peticion.
  // xhr.open("GET", "https://jsonplaceholder.typicode.com/users"); //1er para es el METODO verb http (get(por la URL), head,put o post(por las cabeceras del docu), trace), 2do el EndPoind.

  //Abrir la peticion si esta fuera con una jSAN local
  xhr.open("GET", "../assets/users.json");

  //enviamos la peticion Ajax.
  xhr.send(); //como es solo lectura va sin parametros
})();

() => {
  const xhr2 = new XMLHttpRequest();
  const $xhr2 = document.getElementById("img");
  const $fragment2 = document.createDocumentFragment();

  xhr2.addEventListener("readystatechange", (e) => {
    if (xhr2.readyState !== 4) return;
    if (xhr2.status >= 200 && xhr2.status <= 300) {
      //respuesta satisfactoria.
      let json2 = JSON.parse(xhr2.responseText);
      json2.map((el) => {
        const $figure = document.createElement("figure");
        const $img = document.createElement("img");
        $img.setAttribute("src", el.thumbnailUrl);
        $img.setAttribute("alt", el.title);
        const $fig = document.createElement("figcaption");
        $fig.innerHTML = el.title;
        $figure.append($img);
        $figure.append($fig);
        $fragment2.append($figure);
      });
      $xhr2.append($fragment2);
      console.log(json2);
    } else {
      let message = xhr2.responseText || "Ocurrio un error.";
      console.error(`Error: ${xhr2.status}: ${message}`);
    }
  }); //DEBE SER ASI, QUITE LOS () PARA EVITAR DESCARGAR LAS 5000 FOTOS })();

  xhr2.open("GET", "https://jsonplaceholder.typicode.com/photos");
  xhr2.send();
};

(() => {
  const $fetch = document.getElementById("fetch");
  const $fragment = document.createDocumentFragment();
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(res);
      console.log(res);
      //Si hubo respuesta satizfactoria... La parciamos res.text(), res.bold()...
    })
    .then((json) => {
      json.map((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}-${el.email}-${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      let message = err.statusText || "Ocurrio un error";
      $fetch.innerHTML = `Error ${err.status}: ${message}}`;
    });
})();
