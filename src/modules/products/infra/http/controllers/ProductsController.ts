import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, brand } = request.query;

    const productService = container.resolve(ListProductsService);

    const products = await productService.execute({
      brand: String(brand),
      page: Number(page),
    });

    return response.json(classToClass(products));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const {
      title,
      nick,
      description,
      brandId,
      price,
      salePrice,
      stock,
      filePath,
    } = request.body;

    const productService = container.resolve(CreateProductService);

    const product = await productService.execute({
      brandId,
      description,
      nick,
      price,
      salePrice,
      stock,
      title,
      userId,
      filePath,
      file: request.file.filename,
    });

    return response.json(classToClass(product));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productService = container.resolve(ShowProductService);

    const product = await productService.execute(id);

    return response.json(classToClass(product));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userId = request.user.id;

    const {
      title,
      nick,
      description,
      brandId,
      price,
      salePrice,
      stock,
      filePath,
    } = request.body;

    const productService = container.resolve(UpdateProductService);

    const product = await productService.execute({
      brandId,
      description,
      nick,
      price,
      salePrice,
      stock,
      title,
      userId,
      id,
      filePath,
      file: request.file.filename,
    });

    return response.json(classToClass(product));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productService = container.resolve(DeleteProductService);

    await productService.execute(id);

    return response.json({ success: true });
  }
}
