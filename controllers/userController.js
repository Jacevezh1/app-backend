const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { off } = require('./../models/User');
const User = require('./../models/User')




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


exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Found user
        const foundUser = await User.findOne({ email })

        // Validacion de usuario
        if(!foundUser) {
            return res.status(400).json({
                msg: "Usuario o la contraseña son incorrectos"
            })
        }

        // If macthes a user, now evaluates password
        const verifiedPass = await bcryptjs.compare(password, foundUser.password)

        if(!verifiedPass) {
            return await res.status(400).json({
                msg: "Usuario o la contraseña son incorrectos"
            })
        }

        const payload = {
            user: {
                id: foundUser.id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {
                if(error) throw error;

                res.json({
                    msg: "Inicio de sesion exitoso",
                    data: token
                })
            }
        )

        return
        
    } catch (error) {
        
        console.log(error)
		res.status(500).json({
			msg: "Hubo un problema con la autenticación.",
			data: error
		})

    }





}

// CUANDO ESTAMOS ACCEDIENDO A DIFERENTES RUTAS  PREGUNTAR SI EL USUARIO TIENE PERMISOS O NO. ENTONCES, PARA CONFIRMARLO, SE LE PIDE SU TOKEN.
exports.verifyToken = async(req, res) => {

    
    try {

        // Find the ID of User (Token open) in DB
        const foundUser = await User.findById(req.user.id).select("-password");

        return res.json({
            msg: "Datos de usuario encontrado",
            data: foundUser
        })
        
    } catch (error) {

        res.status(500).json({
            msg: "Hubo un error con el usuario"
        })
        
    }

}


exports.editUser = async (req, res) => {

    const { id } = req.params;

    const { 
		name,
		nickname,
	} = req.body

    try {

        const updateUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                nickname,
            },
            {new: true}
            
        )

        res.json({
            msg: "User actualizado con exito",
            data: updateUser
        })

    } catch (error) {

        res.status(500).json({
			msg: "Hubo un error con la actualización de la User.",
			error: error
		})
    }







}


exports.delete = async (req, res) => {

    const { id } = req.params

    try {

        const deletedUser = await User.findByIdAndRemove({_id: id})

        res.json({
            msg: "User deleted succesfully",
            data: deletedUser
        })

        
    } catch (error) {
        
        res.status(500).json({
			msg: "Hubo un error borrando el User.",
			error: error
		})

    }




}