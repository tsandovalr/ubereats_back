const validatePhoto = ( files:any, allowedExtensions:any ) => {
    const { name, tempFilePath } = files.photo;
    const extensions = name.split(".").pop();
    const extensionsApproved = allowedExtensions.includes( extensions )
    if(extensionsApproved){
       return tempFilePath
    }
}

export default validatePhoto;