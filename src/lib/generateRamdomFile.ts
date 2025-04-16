export function generateRandomFilename(extension = "png") {
    const random = Math.random().toString(36).substring(2, 10); // letras/números aleatórios
    const timestamp = Date.now(); // tempo atual para garantir unicidade
    return `img_${timestamp}_${random}.${extension}`;
  }