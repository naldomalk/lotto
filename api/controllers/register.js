'use strict';

const config = {
        fields : 'User, Birth, Phone, Email, Password',
        props : {
                'Password':{type:'password',req:true},
                1:{1:1}
            }
}

exports.module = {

    post : async(req, res, next) => {
        let fields = config.fields;
        let values = fn.check_post(config, req);

        let SQL = `INSERT INTO users (${fields}) VALUES (?)`;

        conn.query(SQL, [values], function(error, results, fields){
            (error)?res.status(400).json(error)
            :res.json(results);
        });
    }

}