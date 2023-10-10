const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')
const { generarTokenCliente } = require('../helpers/jwtCliente')


const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne({ email })
        console.log(usuario);

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        };

        usuario = new Usuario( req.body )

        //encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //Generar JWT

        const token = await generarJWT( usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token             
        }) ;       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    };  
};


const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body

    try {

        let usuario = await Usuario.findOne({ email })
        console.log(usuario);

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        };

        //confirmar los password
        const validarPassword = bcrypt.compareSync( password, usuario.password )

        if( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        };

        //Generar nuestro token JWT

        const token = await generarJWT( usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }   ;
};


const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    //Generar un nuevo JWT y retornarlo en esta peticion

    const token = await generarJWT( uid, name);


    res.json({
        ok: true,
        token
    });
};

const tokenCliente = (req, res) => {

    const token = generarTokenCliente();
    console.log(token);
    console.log('hola');
    res.json({ 
        ok: true, 
        token 
    });

};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    tokenCliente
};