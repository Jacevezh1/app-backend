const Post = require('./../models/Post');


// 1. Create Post
exports.create = async (req, res) => {

    const { 
        name,
        author,
        image,
        description,
        body,
        comments
    } = req.body;


    // Crear Post en mi DB
    try {
        
        const newPost = await Post.create({
            name,
            author,
            image,
            description,
            body,
            comments
        });

        // Respuesta en JSON
        res.json({
            msg: "Post creado con exito",
            data: newPost
        })

    } catch (error) {
        
        res.status(500).json({
            msg: "Hubo un error creando el post",
            error: error
        })

    }

}

// 2. Read ALL Pots
exports.readAll = async (req, res) => {

    try {
        
        const posts = await Post.find({})

        res.json({
            msg: 'Posts leidas con exito',
            data: posts
        })

    } catch (error) {
        
        res.status(500).json({
            msg: "Hubo un error al leer",
            error: error
        })


    }

}

// 3. Read ONE Pots
exports.readOne = async (req, res) => {

    const { id } = req.params;

    try {
        
        const post = await Post.findById(id)

        res.json({
            msg: "Post especifico obtenido con exito",
            data: post
        })


    } catch (error) {

        res.status(500).json({
			msg: "hubo un error obteniendo los datos.",
			error: error
		})
    }

}


// 4. Edit Post
exports.edit = async (req, res) => {

    const {id} = req.params;

    const { 
        name,
        author,
        image,
        description,
        body,
        comments
    } = req.body;


    try {

        const updatePost = await Post.findByIdAndUpdate(
            id,
            {
                name,
                author,
                image,
                description,
                body,
                comments
            },
            {new: true}
        )

        res.json({
            msg: "Post actualzido con exito",
            data: updatePost
        })   

        
    } catch (error) {
        
        res.status(500).json({
			msg: "Hubo un error con la actualización de la Sauce.",
			error: error
		})

    }

}



exports.delete = async (req, res) => {

    const { id } = req.params;

    try {

        const deletedPost = await Post.findByIdAndDelete({_id: id})

        res.json({
            msg: "Post borrado con exito",
            data: deletedPost
        })
        
    } catch (error) {

        res.status(500).json({
			msg: "Hubo un error borrando la Sauce.",
			error: error
		})
    }
}