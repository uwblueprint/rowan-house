import { ReadStream } from "fs-capacitor";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { FileUpload } from "graphql-upload";
import IFileStorageService from "../interfaces/fileStorageService";
import IImageUploadService, {
  UploadedImage,
} from "../interfaces/IImageUploadService";
import logger from "../../utilities/logger";
import {
  getFileTypeValidationError,
  validateImageFileType,
} from "../../middlewares/validators/util";
import { getErrorMessage } from "../../utilities/errorUtils";

const Logger = logger(__filename);

const writeFile = (readStream: ReadStream, filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const out = fs.createWriteStream(filePath);
    readStream.pipe(out);
    out.on("finish", () => {
      resolve();
    });
    out.on("error", (err: Error) => reject(err));
  });
};

class ImageUploadService implements IImageUploadService {
  uploadDir: string;

  storageService: IFileStorageService;

  constructor(uploadDir: string, storageService: IFileStorageService) {
    this.uploadDir = uploadDir;
    this.storageService = storageService;
  }

  /* eslint-disable class-methods-use-this */
  async upload(file: Promise<FileUpload>): Promise<UploadedImage> {
    let filePath = "";
    let fileContentType = "";
    try {
      const { createReadStream, mimetype } = await file;
      // We're using uuid() rather than file.filename to avoid conflicts of stored files in Firebase.
      filePath = `${this.uploadDir}/${uuid()}`;
      fileContentType = mimetype;
      if (!validateImageFileType(fileContentType)) {
        throw new Error(getFileTypeValidationError(fileContentType));
      }
      await writeFile(createReadStream(), filePath);
      return await this.storeImage(filePath, fileContentType);
    } finally {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }

  async download(filePath: string): Promise<string> {
    return this.storageService.getFile(filePath);
  }

  async storeImage(
    localFilePath: string,
    fileContentType: string,
  ): Promise<UploadedImage> {
    const fileName = localFilePath;
    try {
      await this.storageService.createFile(
        fileName,
        localFilePath,
        fileContentType,
      );
      const signedUrl = await this.download(fileName);
      return { image: signedUrl, path: fileName };
    } catch (error: unknown) {
      Logger.error(
        `Failed to upload module image. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ImageUploadService;
