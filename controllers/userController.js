const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/User')


// 1. Crear Usuario

exports.create = async (req, res) => {

    const { 
		name,
		nickname,
		email,
		password,
		admin
	} = req.body

    try {

        // Generar password encriptado
        const salt	= await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)

        // Crear usaurio
        const newUser = await User.create({
            name,
            nickname,
            email,
            password: hashedPassword,
            admin
        })


        // Auth Tokens 
        const payload = {
            user: {
                id: newUser._id // <- ID de MONGO
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET, // Palabra Secreta (FIRMA)
            {
                expiresIn: 360000
            },
            (error, token) => {
                if(error) throw error;
                
                res.json({
                    msg: "Token correctamente generado",
                    data: token
                })
            }
        )
        
    } catch (error) {
        
        res.status(500).json({
			msg: "Hubo un error con la creación de usuario.",
			error: error
		})
    }
}