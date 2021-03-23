class Service {
    constructor() {
        this.baseUrl = "https://react-network-requests-default-rtdb.firebaseio.com";
    }

    _request  = (method,url,data = null)=>{
        return fetch(`${this.baseUrl}${url}.json`,{ 
            method,
            headers: data ? {'Content-Type':'application/json'}: {},
            body: data ? JSON.stringify(data): null
        })
        .then(res=>{
            console.log("res before json: ",res)
            if(res.status < 400){
                return res.json()
            }else{
                const err = new Error ('Network Error:Status code 400 and higher');
                throw (err);
            }
           
        })    
    }

    // Delay manually
    getPosts = (start,limit=9) =>{
        return new Promise ((resolve,reject)=>{
            setTimeout(()=>{
                return resolve (this._request('GET',`/posts?_start=${start}&_limit=${limit}`))
            },3000)
        }) 
    }

    // Delay
    // getPosts = (start,limit=9) =>{
    //     return this._request('GET',`/posts?_start=${start}&_limit=${limit}&_delay=5000`)
    // }

    getAllPosts = () =>{
        return this._request('GET','/posts')
    }

    getPost = (id) =>{
        return this._request('GET',`/posts/${id}`)
    }

    createPost = (data) =>{
        return this._request('POST','/posts',data)
    }

    updatePost = (id,data) =>{
        return this._request('PATCH',`/posts/${id}`,data)
    }

    deletePost = (id) => {
        return this._request('DELETE',`/posts/${id}`)
    }
}

const service = new Service;
export default service;


