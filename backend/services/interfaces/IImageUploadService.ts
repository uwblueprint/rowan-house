import { FileUpload } from "graphql-upload";

export interface UploadedImage {
  image: string;
  path: string;
}

interface IImageUploadService {
  /**
   * Upload an image to Firebase.
   * @param file the file to upload
   * @returns a link and filename for the uploaded image
   */
  upload(file: Promise<FileUpload>): Promise<UploadedImage>;
}

export default IImageUploadService;
