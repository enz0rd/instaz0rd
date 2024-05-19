const db = require('../models');
const AuthController = require('./AuthController');
const Sequelize = require('sequelize');
const fs = require('fs').promises;

class ProfileController {
    // static async getMe(req, res) {
    //     const { valid, email } = await AuthController.verifyToken(req);
    //     if (valid) {
    //         const user = await db.User.findOne({attributes: { exclude: ['password'] }},{ where: { email: email } });
    //         if (!user) {
    //             return res.status(404).json({ title: "User not found", message: 'The user you are trying to get does not exist' });
    //         }
    //         return res.status(200).json(user);
    //     } else {
    //         return res.status(401).json({ title: "Unauthorized", message: 'You are not logged in' });
    //     }
    // }

    static async getDetails(req, res) {
        const { valid, email } = await AuthController.verifyToken(req);
        if (valid) {
            console.log(req.query.username);
            const user = await db.User.findOne({
                attributes: { exclude: ['password'] },
                where: { username: req.query.username }
            });
            if (user == null) {
                return res.status(404).json({ title: "User not found", message: 'The user you are trying to get does not exist' });
            }
            user.userIcon = user.userIcon.split('Instaz0rd/')[1];
            
            console.log(user);
            return res.status(200).json(user);
        } else {
            return res.status(401).json({ title: "Unauthorized", message: 'You are not logged in' });
        }
    }

    static async searchUsers(req, res) { 
        const query = req.query.q;
        try {
            const users = await db.User.findAll({
                attributes: ['username', 'userIcon'],
                where: {
                    username: {
                        [Sequelize.Op.like]: `%${query}%`
                    }
                }
            });

            const usersWithImages = await Promise.all(users.map(async (user) => {
                const userIconPath = user.dataValues.userIcon.split('Instaz0rd/')[1];
                try {
                    const imageBuffer = await fs.readFile(userIconPath);
                    user.dataValues.userIcon = imageBuffer;
                } catch (error) {
                    console.error(`Error reading image for user ${user.dataValues.username}:`, error);
                    user.dataValues.userIcon = null; // Handle the case where image reading fails
                }
                return user;
            }));

            return res.status(200).json(usersWithImages);
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = ProfileController;