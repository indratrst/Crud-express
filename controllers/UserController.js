import User from "../models/UserModel.js";
import path from "path";
import fs from "fs";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveUser = async (req, res) => {
    // const user = new User(req.body);
    const url = `${req.protocol}://${req.get("host")}/image/${req.file.filename}`;
    let user = {
        name: req.body.name,
		email: req.body.email,
		gender: req.body.gender,
		coco: req.body.coco,
        image: req.file.filename,
        url:url,
        
    }
    try {
        const inserteduser = await User.insertMany(user);
        res.status(201).json(inserteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({msg: "No Data Found"});
    try {
        let new_image = "";
    if (req.file) {
        new_image = req.file.filename;
        console.log({Ba:new_image})
        try {
            fs.unlinkSync(`./public/image/${user.image}`)
        } catch (error) {
            console.log(error);
        }
    } 
    const url = `${req.protocol}://${req.get("host")}/image/${new_image}`;
        const updatedUser = await User.updateOne({_id:req.params.id}, 
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    gender: req.body.gender,
                    coco: req.body.coco,
                    image: new_image,
                    url:url,
                }
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
if (!user) 
return res.status(404).json({msg: "No Data Found"});
    try {
        const filepath = `./public/image/${user.image}`;
        fs.unlinkSync(filepath);
        const deletedUser = await User.deleteOne({_id:req.params.id}   
    );
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}