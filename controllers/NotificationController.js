const Task = require('../models/').Task;
const User = require('../models/').User;
const Notification = require('../models/').Notification

const NotificationController = {
    loadNotifications : async(req, res) => {
        const notifications = await Notification.findAll({
            where: {user_id: req.user.id},
            attributes: ['id', 'title'],
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 8
        })
        

        if(notifications){
            res.json({
                message : notifications
            })
        }else{
            res.json({
                failure : "Unable to load notifications"
            })
        }
    },
    index : async(req, res) => {
        const notifications = await Notification.findAll({
            where: {user_id: req.user.id},
            attributes: ['id', 'title'],
            order: [
                ['createdAt', 'DESC']
            ]
        })
    }

}

module.exports = NotificationController;