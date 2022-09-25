import { FileUpload } from "graphql-upload";

export interface UploadedImage {
  image: string;
  path: string;
}

interface IImageUploadService {
  /**
   * Upload an image to Firebase.
   * @param file the file to upload
   * @returns a link and file path for the uploaded image
   */
  upload(file: Promise<FileUpload>): Promise<UploadedImage>;

  /**
   * Download an image from Firebase.
   * @param file the file path to download
   * @returns a link to the requested image
   */
  download(filePath: string): Promise<string>;
}

export default IImageUploadService;
