
import fs from  "fs";
import uploadImage from "./uploadImage.js";

const updateImage = async(file, folderPath, req, oldImageUrl)=>{
    const parts = oldImageUrl.split('/');
    const fileName = parts[parts.length -1];
    const filePath = `./public/images/${folderPath}/${fileName}`;

    if(file){
        const url = await uploadImage(file, folderPath, req);
        if(url===oldImageUrl){
            return url;
        }else{
            await fs.unlinkSync(filePath);
            return url;
        }
    }else{
        return oldImageUrl;
    }

};

export default updateImage;