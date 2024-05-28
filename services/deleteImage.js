import fs from "fs";

const deleteImage = async(imageUrl, folderPath)=>{
    const parts = imageUrl.split("/");
    const filePath = `./public/images/${folderPath}/${parts[parts.length -1]}`;

    // menghapus file image di server
    try {
        fs.unlinkSync(filePath);
    } catch (error) {
        console.log(error.message);
    }
};

export default deleteImage;