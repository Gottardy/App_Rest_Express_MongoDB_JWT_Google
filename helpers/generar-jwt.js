const JWT = require('jsonwebtoken');

const generarJWT = (uid) =>{
    return new Promise((resolve, reject)=>{
        const payload = {uid};
        JWT.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
               expiresIn:'1h' 
            },
            (err, token)=>{

                if(err){
                    console.log(err);
                    reject('Nose pudo generar e JWT');
                }else{
                    resolve(token);
                }
            }
        )
    });
}

module.exports ={
    generarJWT,
}