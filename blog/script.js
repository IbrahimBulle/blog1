
let fetchApis = new Fetch();

const postsUrl = urls.postsUrl;
const links=document.querySelector('.tabs')
const btn=document.querySelector('.btn')
const btnlogout =document.querySelector('.btnlogout')
const btnCancel =document.querySelector('.cancel')
const blog=document.querySelector('.postBlog')
const form=document.querySelector('.form')

const getPosts=async()=>{
    try{
let getApi =await fetchApis.getApi(postsUrl)
getApi.map((item)=>{
            const li = document.createElement('li')
           const link=document.createElement('a')
           link.href=`post.html?id=${item.id}`
           link.textContent=item.topic;
           li.appendChild(link)
           links.appendChild(li)
        })
    
     }catch(error){
        console.log(error);
    }
}

getPosts();

let admin=localStorage.getItem("admin")
if(admin){
   
    btn.classList.add('show')
    btnlogout.classList.remove('hide')
    btnCancel.addEventListener('click',()=>{
        btnCancel.classList.add('hide')
       blog.classList.remove('show')
    })

    
}

let showblog=document.querySelector('.show')
showblog.addEventListener('click',()=>{
      blog.classList.add('show')
    btnCancel.classList.add('show')
    blog.classList.add('show')
    
})

btnlogout.addEventListener('click',()=>{
    localStorage.removeItem("admin")
    window.location.href = "http://127.0.0.1:5500/login.html";
})


const submitBlog=(e)=>{
    e.preventDefault()
    const formInput =new FormData(form)
    const posts={}
    for(const [key,value] of formInput){
        posts[key]=value;
    }
    const postData={
        topic:posts.name,
        post:posts.msg
    }
    postDataBlog(postData);
}

const postDataBlog = async(postData)=>{

try {
    await fetchApis.postApi(postsUrl,'POST',postData)
} catch (error) {
    console.log(error);
}
}
form.addEventListener('submit',submitBlog)
