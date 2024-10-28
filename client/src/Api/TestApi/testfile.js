const apiBase = require('../config/config') 
const {usersEnd} = require('../config/apiendpoints')
// console.log(apiBase)
// console.log(typeof apiBase)
async function test(){
    try{
        const data= {
            "email":"sandesh11@gmail.com",
            "password":"12345"
        }
        const res = await apiBase({endpoint:usersEnd.SignIn, data:data})
        // console.log(res)
        console.log(res.data)
    }catch(err){
        console.log(err)
        // console.log(`ERROR: ${err.response.data}`);
    }
}
test()