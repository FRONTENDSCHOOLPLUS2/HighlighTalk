export const getFileExtenstion = (file: File) => {
  return file.name.split('.').pop()?.toLowerCase();
};
