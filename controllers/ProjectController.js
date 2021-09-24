const Project = require('../models/Project');
const Task = require('../models/Task')

const Projectcontroller = {
    // index page
    index(req, res){
        res.render('pages/project')
    }

}
module.exports = Projectcontroller;