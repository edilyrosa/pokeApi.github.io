(() => {
  const d = document;
  const $fragment = d.createDocumentFragment();
  const $fetch = d.getElementById("fetch");

  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => (res.ok ? res.json() : Promise.reject(res)))
  //     .then((json) => {
  //       console.log(json);
  //     })
  //     .catch((err) => {
  //       let message = err.statusText || "Ocurrio un Error";
  //       $fetch.innerHTML = `Error ${err.status}: ${message}`;
  //     });
  // })();

  async function getData() {
    try {
      //PARTE EXITOSA
      let res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw res; //No tenemos promesas que reject la res al catch(), asi que lo throw
      let json = await res.json(); //res.text, res.bold
      console.log(res, json);

      json.map((el) => {
        const $li = d.createElement("li");
        $li.innerHTML = `<b>Tilulo:${el.title}</b> <br> Id:${el.id} <br> post:${el.body} <br><br>`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
    } catch (error) {
      //PARTE DE ERROR
      let message = error.statusText || "Ocurrio un error";
      $fetch.innerHTML = `Error ${error.status}: ${message}`;
    } finally {
      console.log("Finally: Siempre se ejecutara");
    }
  }

  getData();
})();
