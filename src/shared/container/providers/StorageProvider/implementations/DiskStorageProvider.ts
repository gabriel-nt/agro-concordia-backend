import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';
import IDataFileDTO from '../dtos/IDataFileDTO';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile({ file, filePath }: IDataFileDTO): Promise<string> {
    await fs.promises.mkdir(
      path.resolve(uploadConfig.uploadsFolder, filePath),
      { recursive: true, mode: 777 },
    );

    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, filePath, file),
    );

    return `${filePath}/${file}`;
  }

  public async deleteFile(file: string): Promise<void> {
    const pathFile = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(pathFile);
    } catch {
      return;
    }

    await fs.promises.unlink(pathFile);
  }
}

export default DiskStorageProvider;
