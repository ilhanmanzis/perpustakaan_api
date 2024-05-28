import path from "path";
import crypto from "crypto-js";

const uploadImage = async(file, folderPath, req)=>{

     // size image
     const fileSize = file.data.length;
 
     // extension image
     const extension =  path.extname(file.name);
 
     // mengambil data tahun - menit 
     const now = new Date();
     const year = now.getFullYear();
     const month = String(now.getMonth() + 1).padStart(2, '0');
     const day = String(now.getDate()).padStart(2, '0');
     const hours = String(now.getHours()).padStart(2, '0');
     const minutes = String(now.getMinutes()).padStart(2, '0');
 
     const dateTime = `${year}${month}${day}_${hours}${minutes}_`;
     
     // membuat nama file image
     const uniqueNumber = Math.floor(Math.random() * 100000000).toString();
     const md5Hash = crypto.MD5(uniqueNumber).toString();
     const fileName = dateTime + md5Hash + extension;
 
     // membuat url
     const url = `${req.protocol}://${req.get("host")}/images/${folderPath}/${fileName}`;
 
     // type extension yang diijinkan
     const allowedType = ['.png','.jpg','.jpeg'];
 
     // validasi extension
     if(!allowedType.includes(extension.toLowerCase())) return res.status(402).json({
         message: "invalid image extension"
     });
 
     // validasi size image
     if(fileSize > 5000000) return res.status(402).json({
         message: "image must be less than 5MB"
     });

     // Upload file ke server
    await new Promise((resolve, reject) => {
        file.mv(`./public/images/${folderPath}/${fileName}`, (error) => {
            if(error) return res.status(500).json({
                message: error.message
            });
            resolve();
        });
    });

    return url;


};

export default uploadImage;