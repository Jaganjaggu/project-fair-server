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

// get userprojects - token required

exports.allUserProjects = async (req,res) =>{
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// getallProjects - toket required

exports.getallProjects = async (req,res) =>{
    const searchKey = req.query.search
    const query = {
        languages:{$regex:searchKey , $options:"i"}
    }
    try{
        const projectDetails = await projects.find(query)
        res.status(200).json(projectDetails)
    }catch(err){
        res.status(401).json(err)
    }
}

// gethomrprojects
exports.getHomeProjects = async (req,res) =>{
    try{
        const homeProjects = await projects.find().limit(3)
        // console.log(homeProjects);
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// edit Project
exports.editProjectController = async (req,res)=>{
    // get edit proejct idetails
    const {id} =req.params
    const userId = req.payload
    const {title,languages,overview,github,website,projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,languages,overview,github,projectImage:uploadProjectImage,website,userId},{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }catch(err){
        res.status(401).json(err)
    }
}

// deleteProject
exports.deleteProjectController = async (req,res)=>{
    // get project details
    const {id} = req.params
    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
        }catch(err){
            res.status(401).json(err)
        }
}

