function renderPosts(posts){

  const container = document.getElementById("posts");

  if(posts.length === 0){
    container.innerHTML = "<p>No hay resultados</p>";
    return;
  }

  container.innerHTML = posts.map(p => `

  <div class="card">

    <h3>${p.title}</h3>

    <p>${p.body}</p>

    <div class="actions">

      <span class="like" onclick="likePost(${p.id})">❤️</span>

      <button onclick="viewDetail(${p.id})">Ver más</button>

      <button onclick="editPost(${p.id})">Editar</button>

      <button onclick="deletePost(${p.id})">Eliminar</button>

    </div>

  </div>

  `).join("");

}


function renderPagination(total){

  const pages = Math.ceil(total / postsPerPage);

  const container = document.getElementById("pagination");

  let html = "";

  for(let i = 1; i <= pages; i++){

    html += `<button onclick="goPage(${i})">${i}</button>`;

  }

  container.innerHTML = html;

}


function showLoading(){

  const state = document.getElementById("state");

  state.innerHTML = "<p>Cargando...</p>";

}


function showError(retryFunction){

  const state = document.getElementById("state");

  state.innerHTML = `
    <p>Error cargando datos</p>
    <button onclick="retry()">Reintentar</button>
  `;

  window.retry = retryFunction;

}


function showSuccess(message){

  const state = document.getElementById("state");

  state.innerHTML = `<p>${message}</p>`;

  setTimeout(() => {
    state.innerHTML = "";
  }, 2000);

}


function clearState(){

  document.getElementById("state").innerHTML = "";

}


function showEmpty(){

  document.getElementById("posts").innerHTML = "<p>No hay resultados</p>";

}


function renderDetail(post){

  const container = document.getElementById("posts");

  container.innerHTML = `

  <div class="card">

    <h2>${post.title}</h2>

    <p>${post.body}</p>

    <button onclick="render()">Volver</button>

  </div>

  `;

}
