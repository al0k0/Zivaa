
const User =  require("../models/User")
const path =  require("path")

const updateAvatar = async (req, res)=>{
    try{
        if(!req.file) 
    
            return res.status(400).json({error: "No file uploaded"})

            const imagePath = `/uploads/${req.file.filename}`

            const user = await User.findByIdAndUpdate(
                req.user._id, 
                {avatar: imagePath}, 
                {new: true}
            )

            res.json({ avatar: user.avatar})
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to update avatar"})
        
    }

}

module.exports = {updateAvatar}