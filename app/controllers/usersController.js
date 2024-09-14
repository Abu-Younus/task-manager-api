import UsersModel from "../model/UsersModel.js";
import {TokenEncode} from "../utility/tokenUtility.js";
import SendEmail from "../utility/emailUtility.js";

export const Registration = async (req, res) => {
    try {
        const { email, firstName, lastName, phoneNumber, password } = req.body;
        if (!email || !firstName || !lastName || !phoneNumber || !password) {
            return res.status(400).json({ status: "Fail", message: "All fields are required." });
        }

        //Check if the email already exists
        const existingUser = await UsersModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ status: "Fail", message: "Email is already registered." });
        }

        await UsersModel.create(req.body);
        return res.json({ status: "Success", message: "Registration successfully" });
    } catch (e) {
        return res.status(500).json({ status: "Fail", message: e.toString() });
    }
};

export const Login = async (req, res) => {
    try {
        const reqBody = req.body
        let data = await UsersModel.findOne(reqBody)
        if (data == null) {
            return res.json({status: "fail", message: "User not found."})
        } else {
            let token = TokenEncode(data['email'],data['_id'])
            return res.json({status: "Success", message: "login successfully.", data:{token:token}});
        }
    } catch (e) {
        return res.status(500).json({ status: "Fail", message: e.toString() });
    }
}

export const ProfileDetails = async (req, res) => {
    try {
        let user_id = req.headers["user_id"]
        let data = await UsersModel.findOne({_id:user_id})
        return res.json({ status: "Success", message: "Profile get successfully.", data: data});
    } catch (e) {
        return res.status(500).json({ status: "Fail", message: e.toString() });
    }
}

export const  ProfileUpdate = async (req, res) => {
    try {
        const reqBody = req.body
        let user_id = req.headers["user_id"]
        let data = await UsersModel.updateOne({"_id":user_id},reqBody)
        return res.json({ status: "Success", message: "Profile updated successfully.", data: data});
    } catch (e) {
        return res.status(500).json({ status: "Fail", message: e.toString() });
    }
}

export const EmailVerification = async (req, res) => {
    try {
        let email = req.params.email
        let data = UsersModel.findOne({email:email})

        if (data == null) {
            return res.json({ status: "Fail", message: "User email doesn't exist!" });
        } else {
            //send otp to email
            let code = Math.floor(100000+Math.random()*900000)
            let emailTo = data['email']
            let emailText = "Your code is " + code
            let emailSubject = "Task Manager Verification Code"

            await SendEmail(emailTo,emailSubject,emailText)

            //update otp in user
            await UsersModel.updateOne({email:email},{otp:code})
            return res.json({ status: "Success", message: "Verification code sent successfully. Please check your email."});
        }
    } catch (e) {
        return res.status(500).json({ status: "Fail", message: e.toString() });
    }
}

export const CodeVerification = async (req, res) => {
    try {
        let reqBody = req.body
        let data = await UsersModel.findOne({email:reqBody['email'],otp:reqBody['otp']})
        if(data == null) {
            return res.json({status: "Fail", message: "Wrong verification code."})
        } else {
            return res.json({status: "Success", message: "Verification successfully."})
        }
    } catch (e) {
        return res.status(500).json({ status: "Fail", message: e.toString() });
    }
}

export const ResetPassword = async (req, res) => {
    try {
        let reqBody = req.body
        let data = await UsersModel.findOne({email:reqBody['email'], otp:reqBody['otp']})
        if(data == null) {
            return res.json({status: "Fail", message: "Wrong verification code."})
        } else {
           await UsersModel.updateOne({email:reqBody['email']}, {
               otp:"0",
               password:reqBody['password']
            })
            return res.json({status: "Success", message: "Password reset successfully."})
        }
    } catch (e) {
        return res.status(500).json({ status: "Fail", message: e.toString() });
    }
}