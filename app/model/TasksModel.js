import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        description:{type:String, required:true},
        status:{type:String, required:true},
        user_id:{type:mongoose.Schema.Types.ObjectId, required:true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const tasks = mongoose.model('tasks', taskSchema);

export default tasks;