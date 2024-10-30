const projects = require('../models/projectModel')


//add project
exports.addProjectController = async (req, res) => {
    console.log("inside addprojectcontroller");
    console.log(req.userId);
    const { title, languages, overview, github, website } = req.body
    console.log(title, languages, overview, github, website);
    console.log(req.file.filename);

    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("project already available in our database ....Please add another!!")
        } else {
            const newProject = new projects({
                title, languages, overview, github, website, projectimg: req.file.filename, userId: req.userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {
        res.status(401).json(err)
    }

    //res.status(200).json("add project request recived!!")


}

//home projects

exports.getHomeProjectsController = async (req, res) => {
    console.log("inside HomeProjectsController");
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

//all project -authentication required

exports.getAllProjectsController = async (req, res) => {
    console.log("inside HomeProjectsController");
    const searchKey = req.query.search
    const query = {
        languages: {
            $regex: searchKey, $options: "i"
        }
    }

    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.getUserProjectsController = async (req, res) => {
    console.log("inside getUserProjectsController");
    const userId = req.userId
    console.log(userId);

    try {
        const allUserProjects = await projects.find({ userId })
        res.status(200).json(allUserProjects)
    } catch (err) {
        res.status(401).json(err)
    }

}

//remove project controller
exports.removeProjectController = async (req, res) => {
    console.log("inside removeProjectController");
    const { pid } = req.params
    try {
        const removeProject = await projects.findByIdAndDelete({ _id: pid })
        res.status(200).json(removeProject)
    } catch (err) {
        res.status(401).json(err)
    }

}

//edit project - authentication required
exports.editProjectController = async (req, res) => {
    console.log("inside projectcontroler");
    const { pid } = req.params
    const { title, languages, overview, github, website, projectimg } = req.body
    const profilepicupld = req.file ? req.file.filename : projectimg
    const userId = req.userId
    console.log(title, languages, overview, github, website, projectimg, userId, profilepicupld);

    try {
        const updateProject = await projects.findByIdAndUpdate({ _id: pid }, { title, languages, overview, github, website, projectimg: profilepicupld, userId }, { new: true })
        console.log(update);

        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (err) {
        res.status(401).json(err)
    }
}
