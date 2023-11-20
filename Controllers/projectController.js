const projects = require('../Models/projectSchema')

// add project
exports.addprojects = async (req,res) => {
    console.log("Inside addprojects function");
    const userId = req.payload
    const projectImage = req.file.filename
    console.log(projectImage);
    const {title,languages,overview,github,website} = req.body
    // console.log(`${title},${languages},${overview},${github},${website},${projectImage},${userId}`)
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exist!!! upload another")
        }else{
            const newProject = new projects({
                title,languages,overview,github,projectImage,website,userId
            })
            await newProject.save()
            res.status(200).json(newProject)

        }
    }catch(err){
        res.status(401).json(`Request Failed, Error: ${err}`)
    }
    
}   