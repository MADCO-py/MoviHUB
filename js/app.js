async function init(){

allPosts = await getPosts();
render();
// BOTONES SIDEBAR

document.getElementById("homeBtn").onclick = () => {
  render();
};

document.getElementById("statsBtn").onclick = () => {
  renderStats();
};

function renderStats(){

  const total = allPosts.length;

  // contar posts por usuario
  const users = {};

  allPosts.forEach(p => {
    users[p.userId] = (users[p.userId] || 0) + 1;
  });

  let usersHtml = "";

  for(let user in users){
    usersHtml += `<p>Usuario ${user}: ${users[user]} posts</p>`;
  }

  document.getElementById("posts").innerHTML = `

    <div class="card">
      <h2>Estadísticas</h2>

      <p>Total de publicaciones: ${total}</p>

      <h3>Posts por usuario:</h3>

      ${usersHtml}

      <button onclick="render()">Volver</button>

    </div>

  `;

}

}

function render(){

const start = (currentPage-1)*postsPerPage;
const end = start + postsPerPage;

const pagePosts = allPosts.slice(start,end);

renderPosts(pagePosts);
renderPagination(allPosts.length);

}

function goPage(p){
currentPage = p;
render();
}

document.getElementById("createBtn").onclick = async ()=>{

const title = document.getElementById("titleInput").value;
const body = document.getElementById("bodyInput").value;

if(title.length < 3 || body.length < 5){
alert("Texto muy corto");
return;
}

await createPost(title,body);

alert("Post creado");

};

function deletePost(id){

allPosts = allPosts.filter(p=>p.id !== id);
render();

}

function editPost(id){

const newTitle = prompt("Nuevo título");

allPosts = allPosts.map(p=> p.id===id ? {...p,title:newTitle}:p);

render();

}

function likePost(id){
alert("Like ❤️");
}

function viewDetail(id){

const post = allPosts.find(p=>p.id===id);

document.getElementById("posts").innerHTML = `
<h2>${post.title}</h2>
<p>${post.body}</p>
<button onclick="render()">Volver</button>
`;

}

document.getElementById("searchInput").addEventListener("input",(e)=>{

const text = e.target.value.toLowerCase();

const filtered = allPosts.filter(p=> p.title.toLowerCase().includes(text));

renderPosts(filtered);

});

init();