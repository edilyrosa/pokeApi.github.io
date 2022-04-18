const d = document;
const $main = d.querySelector("main");
const $links = d.querySelector(".links");
const $loader = `<img src="../assets/loading.gif" alt="Cargando">`;
const endPoind = "https://pokeapi.co/api/v2/pokemon/";
$main.innerHTML = $loader;

function getPoke(url) {
  fetch(url).then((res) =>
    (res.ok ? res.json() : Promise.reject(res))
      .then((json) => {
        console.log(res, json);
        let $prevlink = json.previous ? `<a href="${json.previous}">◀</a>` : "";
        let $nextlink = json.next ? `<a href="${json.next}">▶</a>` : "";
        $links.innerHTML = `${$prevlink} ${$nextlink}`;
        $template = "";
        json.results.map((el) => {
          fetch(el.url)
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((pokemon) => {
              console.log(pokemon);
              $template += `
              <figure>
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              <figcaption>${pokemon.name}</figcaption>
              </figure> `;
              $main.innerHTML = $template;
            })
            .catch((err) => {
              let msj = err.statusText || "Ocurrio un error con el pokemon";
              $template = `<figure>
              <figcaption>Error ${err.status}: ${msj}</figcaption>
          </figure>`;
            });
        });
        $main.innerHTML = $template;
      })

      .catch((err) => {
        let msj = err.statusText || "Ocurrio un error General.";
        $main.innerHTML = `<p>Error ${err.status}: ${msj}</p>`;
      })
  );
}
d.addEventListener("DOMContentLoaded", getPoke(endPoind));
d.addEventListener("click", (e) => {
  if (e.target.matches(".links a")) {
    e.preventDefault();
    getPoke(e.target.getAttribute("href"));
  }
});
