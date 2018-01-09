//

getJson=function(rul){
    return new Promise((resolve,reject)=>{
        let client=XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');

        client.open('get',url);
        client.responseType='json';
        client.setRequestHeader('Accept','application/json');
        client.onreadystatechange=handler;
        client.send();

        function handler(){
            if(this.readyState!==4){
                return false;
            }

            if(this.status===200){
                resolve(this.response)
            }else{
                reject(new Error(this.statusText));
            }
        }
    })
};




