const fetchApis = new Fetch()

const commentsUrl = urls.commentsUrl;
const postUrl = urls.postsUrl;


const post=document.querySelector('.post')
const commented=document.querySelector('.comments')
const form =document.querySelector('.form')
let submit = document.querySelector('.submit')
let errHandler = document.querySelector('.err')

const getIdParam=(param)=>{
    let params = new URLSearchParams(document.location.search);
    let id = params.get(param)
    return id;
}

let postId = getIdParam('id');
getPost = async ()=>{
    try {
        let res=await fetchApis.getApi(`${postUrl}?id=${postId}`);
        if(res.length>0){
            const h1 =document.createElement('h1')
            const p =document.createElement('p')
             h1.textContent=res[0].topic;
            p.textContent=res[0].post;
            post.append(h1,p)
            }
    } catch (error) {
        console.log(error);
    }
}
getPost();
getComments=async()=>{
    try {
       let res = await fetchApis.getApi(commentsUrl);
       const fil= res.filter((item)=>{
        return item.postId==postId
    })
    fil.forEach(comment => {
        const div=document.createElement('div')
        div.className='comment'
        const p=document.createElement('p')
        const h5=document.createElement('h5')
        h5.textContent=comment.name
        p.textContent=comment.msg
        div.append(h5,p)
        commented.append(div)

    });
    } catch (error) {
        console.log(error);
    }
}
getComments();
let Err =[]
const submitHandler = (e)=>{
    e.preventDefault();
    const postData=new FormData(form);
    let commentData = {};
    
    for (const [key, value] of postData) 
        commentData[key] = value;
      
    if(commentData.name==''){
        let err = 'Please fill the name section'
        Err.push(err)
    }else if(commentData.msg == ""){
        let err = 'please fill the comment section'
        Err.push(err)
    }
    if(Err.length>0){
        Err.map((er)=>{
            let p = document.createElement('p')
            p.textContent = er
            errHandler.append(p)
        })
        Err.length=0
    }
    else{
        commentData.postId=postId;
        postComment(commentData)
    }  
}
postComment=async (data)=>{
try {
    await fetchApis.postApi(commentsUrl,"post",data);
} catch (error) {
    console.log(error);
}

}

submit.addEventListener('click',submitHandler)




