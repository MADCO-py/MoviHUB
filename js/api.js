const API = "https://dummyjson.com/posts";

async function getPosts(){
const res = await fetch(API);
const data = await res.json();
return data.posts;
}

async function createPost(title,body){
await fetch(`${API}/add`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ title, body, userId:1 })
});
}