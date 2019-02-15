'use strict';

const config = {
    fields : 'Teste',
    props : {
            'Campo':{type:'text',req:true},
            1:{1:1}
        }
}

exports.get = async(req, res, next) =>{
    res.json({ message: 'API Lotto!' });
}