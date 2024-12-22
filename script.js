const signup=document.querySelector('.signup')
const errors=document.querySelector('.errors')
const postSignup=async (val)=>{
try {
    let res =await fetch('http://localhost:3000/users',{
        method:'POST',
        headers:{
            'content-Type':'application/json'
        },
        body:JSON.stringify(val)
        
    })
    console.log(res);
    
    window.location.href = "http://127.0.0.1:5500/login.html";
} catch (error) {
    console.log(errors);
}
}
const errorhandling=(val)=>{
    const err=[]
if (val.password.length<6){
    err.push("password should not be less than 6 letters!")
}
if(val.password!==val.confirmPassword){
err.push('The two passwords Must be the same!')
}
if(err.length>0){
    return err;
}
}
const submit=(e)=>{
e.preventDefault()
let values={}
const DataForm=new FormData(signup)
for(let [key,value] of DataForm){
    // console.log(key+"=> "+ value);
    values[key]=value
}
// console.log(values);
const errs=errorhandling(values);
if(errs){
    errs.map(err=>{
        const paragr=document.createElement('p')
        paragr.className='err'
        paragr.textContent=err;
        errors.append(paragr)
        // errors.appendChild(paragr)
        
    })
}else{
delete values.confirmPassword;
values.admin = false;
postSignup(values)

}
}

// login
const login=document.querySelector('.loginForm')


submitLogin=(e)=>{
    e.preventDefault();
    let logObject={}
const logForm=new FormData(login);
for(let [key,value] of logForm){
    // console.log(key+"=> "+ value);
    
    logObject[key]=value
    // console.log(logObject.email.length);
}
const problems=[]
// console.log(logObject.email.substr(logObject.email.length-9,logObject.email.length-1));
let requiredEmail = logObject.email.substr(logObject.email.length-9,logObject.email.length-1)
if (requiredEmail  !=='gmail.com') {
   
    problems.push('Make sure the gmail is in the correct formart!')
    
}
if(problems.length>0){
    const paragr=document.createElement('p')
    paragr.className='err'
    paragr.textContent=problems[0];
    errors.append(paragr)
}else{
    getAllUsers(logObject)
}
}

const getAllUsers=async (logObject)=>{
    try {
        let res =await fetch('http://localhost:3000/users')
        let data=await res.json();
        console.log(data);
        let person = data.find((user)=>{
            return user.email===logObject.email
        })
        
        if(!person){
            const paragr=document.createElement('p')
            paragr.className='err'
            paragr.textContent='user does not exist!';
            errors.append(paragr)
        }
        // console.log(person);
        else if(person.password===logObject.password){
            // console.log(person);
            if(person.isAdmin){
                localStorage.setItem("admin", person.isAdmin)

                window.location.href = "http://127.0.0.1:5500/blog/index.html";
            }else{
                window.location.href = "http://127.0.0.1:5500/blog/index.html";
            }
        }else{
            
            const paragr=document.createElement('p')
            paragr.className='err'
            paragr.textContent='wrong password!';
            errors.append(paragr)
        }
        // window.location.href = "http://127.0.0.1:5500/signup.html";
    } catch (error) {
        console.log(errors);
    }
    }


if(login){
login.addEventListener('submit',submitLogin)
}
if(signup){
signup.addEventListener('submit',submit)
}

// compair users

