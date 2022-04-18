const d = document;
const $main = d.querySelector("main");
const $link = d.querySelector(".links");
const endPoind = "https://pokeapi.co/api/v2/pokemon/";

async function loadPokemons(url) {
  try {
    $main.innerHTML = ` <img class="loader" src="../assets/loading.gif" alt="cargando"></img>`; //LOADER

    let res = await fetch(url);
    if (!res.ok) throw res;
    let json = await res.json();
    console.log(json); //esto es un JSON-pre-Info, con el accedo al JSON-info

    //EndPoinds de paginacion de consumo, siguiente y previa, al evento click capturar el link, que sera endPoind (= e.target.getAttribute('href')) de las susesivas llamadas a la funcion que muestra la info.
    let $prevlink = json.previous
      ? ` <a href="${json.previous}">Previous Pokes◀</a> `
      : " ";
    let $nextLink = json.next ? `<a href="${json.next}">More Pokes ▶</a>` : " ";
    $link.innerHTML = $prevlink + "<br>" + $nextLink; //Pinto los botones

    let $template = ""; //lo llenare en el for() con JSON-INFO, cuando lo obtenga
    //for que se mete en el 2do json, el JSON-INFO.
    for (let i = 0; i < json.results.length; i++) {
      try {
        let res = await fetch(json.results[i].url); //un JSON por cada url
        if (!res.ok) throw res; //DE UNA VEZ
        let pokemon = await res.json(); //YA TENGO EL JSON-INFO. Llenare el $template con cada uno
        $template += `
    <figure>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <figpaction>${pokemon.name}</figpaction>
    </figure>
      `;
      } catch (error) {
        let msj =
          error.statusText || "Ocurrio un error con la carga del Pokemon";
        $template += `
        <figure>
            <figcaption> Error ${error.status}: ${msj}</figcaption>
        </figure>
        `;
      }

      $main.innerHTML = $template; //Cambiare el LOUDER por el consumo del JSON sea exitosa o no exitosa.
    }
  } catch (error) {
    let msj = error.statusText || "Ocurrio un Error";
    $main.innerHTML = `
    <p>Error ${error.status}: ${msj}</p>
    `;
  }
}

d.addEventListener("DOMContentLoaded", (e) => loadPokemons(endPoind));

d.addEventListener("click", (e) => {
  if (e.target.matches(".links a")) {
    e.preventDefault();
    loadPokemons(e.target.getAttribute("href"));
  }
});
