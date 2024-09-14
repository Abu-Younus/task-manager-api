import {TokenDecode} from "../utility/tokenUtility.js";

export default (req,res,next) => {
    let token = req.headers['token']
    let decode = TokenDecode(token)

    if(decode == null) {
        return res.status(401).json({status: "fail", message: "Unauthorized"})
    } else {
        let email = decode.email
        let user_id = decode.user_id
        req.headers.email = email
        req.headers.user_id = user_id
        next()
    }
}