export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        // Se for File, adiciona como arquivo
        if (item instanceof File) {
          formData.append(key, item);
        } else {
          formData.append(key, String(item));
        }
      });
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString()); 
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value)); // serializa objetos
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}