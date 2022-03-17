const Concept = require('./../models/Concept')




exports.create = async (req, res) => {

    const { 
        name,
        author,
        image,
        description,
        body,
        comments,
        date
    } = req.body;

    try {

        const newConcept = await Concept.create({
            name,
            author,
            image,
            description,
            body,
            comments,
            date
        })

        res.json({
            msg: "Concepto creado con exito",
            data: newConcept
        })


    } catch (error) {
        
        res.status(500).json({
            msg: "Hubo un error creando el post",
            error: error
        })

    }




}


exports.readAll = async (req, res) => {

    try {
        const concept = await Concept.find({})

        res.json({
            msg: 'Posts leidos con exito',
            data: concept
        })
        
    } catch (error) {
        
        res.status(500).json({
            msg: "Hubo un error al leer",
            error: error
        })
    }
}


exports.readOne = async (req, res) => {

    const { id } = req.params;

    try {

        const concept = await Concept.findById(id);

        res.json({
            msg: "Concepto individual leido con exito",
            data: concept
        })


    } catch (error) {

        res.status(500).json({
			msg: "hubo un error obteniendo los datos.",
			error: error
		})
    }
}


exports.edit = async (req, res) => {

    const { id } = req.params;

    const { 
        name,
        author,
        image,
        description,
        body,
        comments,
        date
    } = req.body;


    try {
        
        const updateConcept = await Concept.findByIdAndUpdate(
            id,
            {
                name,
                author,
                image,
                description,
                body,
                comments,
                date
            },
            {new: true}
        )

        res.json({
            msg: "Concept actualzido con exito",
            data: updateConcept
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

        const deletedConcept = await Concept.findByIdAndDelete({_id:id})

        res.json({
            msg: "Concept borrado con exito",
            data: deletedConcept
        })
        
    } catch (error) {
        
        res.status(500).json({
			msg: "Hubo un error borrando la Sauce.",
			error: error
		})
    }
}