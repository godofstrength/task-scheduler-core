const Project = require('../models/Project');
const Task = require('../models/Task')

const Projectcontroller = {
    // index page
    index(req, res){
        res.render('pages/project')
    },

    // create project
    createProject(req, res){
        const{title, description, client, budget} = req.body;
        req.params.id;
      const newProject = Project.build({
            department_id : req.params.id,
            title: title,
            description: description,
            client: client,
            budget: budget,
            created_by: req.user.id
        })
    newProject.save()
    .then(project => {
        res.render('')
    })
    .catch(err => {
        res.render('pages/project', {error_msg: 'unable to create project'})
    })

    }

}
module.exports = Projectcontroller;