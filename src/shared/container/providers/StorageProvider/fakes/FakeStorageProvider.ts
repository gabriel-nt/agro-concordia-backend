import IDataFileDTO from '../dtos/IDataFileDTO';
import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private files: string[] = [];

  public async saveFile({ file, filePath }: IDataFileDTO): Promise<string> {
    this.files.push(`${filePath}/${file}`);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.files.findIndex(item => item === file);

    this.files.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
