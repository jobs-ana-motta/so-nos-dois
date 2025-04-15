export function formDataToObject(formData: FormData): Record<string, string> {
    const obj: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        obj[key] = value;
      }
    });
    return obj;
  }