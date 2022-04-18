const d = document;
const $main = d.querySelector("main");
const $link = d.querySelector(".links");
const endPoind = "https://pokeapi.co/api/v2/pokemon/";

async function loadPokemon(url) {
  try {
    $main.innerHTML = ` <img class="loader" src="../assets/loading.gif" alt="cargando"></img>`;
    let res = await fetch(url);
    if (!res.ok) throw res; //No tenemos promesas que reject la res al catch(), asi que lo throw HACER ESTO JUSTO AL OBJETER EL RES
    let json = await res.json();
    console.log(json);

    let $prevlink = json.previous ? `<a href="${json.previous}">◀</a>` : "";
    let $nextLink = json.next ? `<a href="${json.next}">▶</a>` : "";
    $link.innerHTML = $prevlink + " " + $nextLink;
    let $template = "";

    for (let i = 0; i < json.results.length; i++) {
      //ARRAY DE OBJETOS-JSON-CADA POKE
      //ITERACION POR CADA JSON-POKEMON
      try {
        let res = await fetch(json.results[i].url);
        if (!res.ok) throw res;
        let pokemon = await res.json();
        //console.log(pokemon);

        $template += `
          <figure>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <figcaption>${pokemon.name}</figcaption>
          </figure>`;

        $main.innerHTML = $template; //actualizo el valor del main q era un louder
      } catch (error) {
        let message =
          error.statusText || "Ocurrio un error al traer el pokemon";
        $template += `
        <figure>
        <figcaption> Error ${error.status}: ${message}</figcaption>
        </figure>
        `;
      }
    }

    //terminado el for de los pokemon los pegamos al $main
    $main.innerHTML = $template;
  } catch (error) {
    //PARTE DE ERROR
    let message = error.statusText || "Ocurrio un error";
    $main.innerHTML = `<p>Error ${error.status}: ${message}</p>`;
  }
}

d.addEventListener("DOMContentLoaded", (e) => loadPokemon(endPoind));
//la funcion de peticion se ejecutara a la carga del DOM
d.addEventListener("click", (e) => {
  if (e.target.matches(".links a")) {
    e.preventDefault();
    console.log(e);
    //console.log(e.target.getAttribute("href"));
    loadPokemon(e.target.getAttribute("href"));
  }
});
