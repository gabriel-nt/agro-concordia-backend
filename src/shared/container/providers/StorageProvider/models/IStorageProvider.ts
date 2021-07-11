import IDataFileDTO from '../dtos/IDataFileDTO';

export default interface IStorageProvider {
  saveFile(data: IDataFileDTO): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
