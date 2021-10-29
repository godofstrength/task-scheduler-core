const Project = require('../models/').Project;
const Task = require('../models/').Task;

const Projectcontroller = {
    // index page

   
    // create project
    createProject(req, res){
    const{title, description, client, budget} = req.body;
    const department_id = isNaN(req.params.department_id) || req.params.department_id == null?
    false: req.params.department_id;
    if(department_id){
        const newProject = Project.build({
            department_id : department_id,
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
    }else{
        res.render('pages/404')
    }
  

    }

}
module.exports = Projectcontroller;