import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListBrandService from '@modules/brands/services/ListBrandService';
import ShowBrandService from '@modules/brands/services/ShowBrandService';
import CreateBrandService from '@modules/brands/services/CreateBrandService';
import UpdateBrandService from '@modules/brands/services/UpdateBrandService';
import DeleteBrandService from '@modules/brands/services/DeleteBrandService';

interface FilesProps {
  [fieldname: string]: Express.Multer.File[];
}

class BrandController {
  public async index(request: Request, response: Response): Promise<Response> {
    const brandService = container.resolve(ListBrandService);

    const brands = await brandService.execute();

    return response.json(classToClass(brands));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { brand, filePath } = request.body;
    const files = request.files as FilesProps;

    const brandService = container.resolve(CreateBrandService);

    const newBrand = await brandService.execute({
      brand,
      filePath,
      image: files.image[0].filename,
      backgroundImage: files.backgroundImage[0].filename,
    });

    return response.json(classToClass(newBrand));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const brandService = container.resolve(ShowBrandService);

    const brand = await brandService.execute(id);

    return response.json(brand);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { brand, filePath } = request.body;
    const files = request.files as FilesProps;

    const brandService = container.resolve(UpdateBrandService);

    const updateBrand = await brandService.execute({
      id,
      brand,
      filePath,
      image: files.image[0].filename,
      backgroundImage: files.backgroundImage[0].filename,
    });

    return response.json(classToClass(updateBrand));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const brandService = container.resolve(DeleteBrandService);

    const isDestroy = await brandService.execute(id);

    return response.json({ success: isDestroy });
  }
}

export default BrandController;
