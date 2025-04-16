import { generateRandomFilename } from "./generateRamdomFile";

export function dataUrlToFile(dataUrl: string) {
  try {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1]; 
    const ext = mime.split("/")[1]; 
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
  
    const filename = generateRandomFilename(ext);
    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.log(error)
  }
}