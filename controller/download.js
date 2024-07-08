const filesDownloaded=require('../model/filesDownloaded')
const User=require('../model/user')
const Expense=require('../model/expense')
const s3Services=require('../services/s3services')



exports.downloadExpenses=async(req,res)=>{
    try{
        const user=req.user
    
        const expenses=await Expense.find({userId:user._id})
        const stringifiedExpenses=JSON.stringify(expenses)
        const fileName=`Expense${user.id}/${new Date()}.txt`

       const fileURL= await s3Services.uploadToS3(stringifiedExpenses,fileName)

       await filesDownloaded.create({URL:fileURL,date:new Date(),userId:user.id})

       res.status(200).json({fileURL})

    }catch(err){
        res.status(500).json({fileURL:'',err:err})

    }
}
exports.getURLS=async(req,res)=>{
    try{
        const user=req.user
        // console.log(user)
        const downloadedFiles=await  filesDownloaded.find({userId:user.id})
        if(downloadedFiles.length===0){
           return res.status(400).json({error:"No Download History Available"})
        }
        res.status(200).json({downloadedFiles})

    }catch(err){
        res.status(500).json({err:err})
    }

}
