export const blobToFile = (theBlob: Blob, fileName: string): File => {
  return new File([theBlob as unknown as BlobPart], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
};
