import TasksModel from "../model/TasksModel.js";
import mongoose from "mongoose";

export const CreateTask = async (req, res) => {
   try {
       let user_id = req.headers['user_id']
       const { title, description, status } = req.body;
       if (!title || !description || !status) {
           return res.status(400).json({ status: "Fail", message: "All fields are required." });
       }
       let taskData = { title, description, status, user_id };

       let data = await TasksModel.create(taskData)

       return res.status(200).json({ status: "Success", message: "Task created successfully.", data: data });
   } catch (e) {
       return res.status(500).json({ status: "Fail", message: e.toString() });
   }
}

export const UpdateTaskStatus = async (req, res) => {
    try {
        let id = req.params.id
        let status = req.params.status
        let user_id = req.headers['user_id']

        await TasksModel.updateOne({_id:id, user_id:user_id}, {
            status: status
        })

        return res.status(200).json({ status: "Success", message: "Task updated successfully." });
    } catch (e) {
        return res.status(500).json({ status: "Fail", message: e.toString() });
    }
}

export const TaskListByStatus = async (req, res) => {
    try {
        let status = req.params.status
        let user_id = req.headers['user_id']

        let data = await TasksModel.find({user_id:user_id, status:status})

        return res.status(200).json({ status: "Success", message: "Task list get by status successfully.", data: data });
    } catch (e) {
        return res.status(500).json({ status: "Fail", message: e.toString() });
    }
}

export const DeleteTask = async (req, res) => {
    try {
        let id = req.params.id
        let user_id = req.headers['user_id']

        await TasksModel.deleteOne({_id: id, user_id:user_id})

        return res.status(200).json({ status: "Success", message: "Task deleted successfully."});
    } catch (e) {
        return res.status(500).json({ status: "Fail", message: e.toString() });
    }
}

export const CountTask = async (req, res) => {
    try {
        let ObjectId = mongoose.Types.ObjectId
        let user_id = new ObjectId(req.headers['user_id'])
        let data = await TasksModel.aggregate([
            {$match:{user_id:user_id}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ])
        return res.status(200).json({ status: "Success", message: "Task count successfully.", data: data });
    } catch (e) {
        return res.status(500).json({ status: "Fail", message: e.toString() });
    }
}
