class Fetch{
    constructor(){
    }
    postApi = async(url, method,data)=>{

        try {
            let res=await fetch(url,{
                method:method,
                headers:{'content-Type':'application/json'},
                body:JSON.stringify(data)
            })
            return res;
        } catch (error) {
            console.log(error);
        }
        }

        getApi = async(url)=>{
            
            try {
              let res=  await fetch(url)
              let data =await res.json()
              return data;
            } catch (error) {
                console.log(error);
            }
            }
  
}

let urls={
    postsUrl:"http://localhost:3000/posts",
    commentsUrl:"http://localhost:3000/comments",
    usersUrl:"http://localhost:3000/users"
}