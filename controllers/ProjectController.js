const Project = require('../models/').Project;
const Task = require('../models/').Task;

const Projectcontroller = {
    // index page

   
    // create project
    createProject(req, res){
        console.log('test');
    const{title, description, client, budget} = req.body;
      const newProject = Project.build({
            department_id : req.params.department_id,
            title: title,
            description: description,
            client: client,
            budget: budget,
            created_by: req.user.id
        })
    newProject.save()
    .then(project => {
        req.flash('success_msg', 'project created successfully')
        res.redirect('back')
    })
    .catch(err => {
        req.flash('error_msg', 'An error has occoured')
        res.redirect('back')
    })

    }

}
module.exports = Projectcontroller;