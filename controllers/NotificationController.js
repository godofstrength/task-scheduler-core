const Task = require('../models/').Task;
const User = require('../models/').User;
const Notification = require('../models/').Notification

const NotificationController = {
    loadNotifications : async(req, res) => {
        const notifications = Notification.findAll({
            where: {user_id: req.user.id},
            attributes: ['id', 'title'],
            order: ['createdAt', 'DESC']
        })
        if(notifications != null){
            res.json({
                message : notifications
            })
        }else{
            res.json({
                error: "No notifications yet"
            })
        }
    },
    index : async(req, res) => {
        const notifications = Notification.findAll({
            where: {user_id: req.user.id},
            attributes: ['id', 'title'],
            order: ['createdAt', 'DESC']
        })
    }

}

module.exports = NotificationController;