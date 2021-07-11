import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProductsByBrandService from '@modules/products/services/ListProductsByBrandService';

export default class ItensController {
  public async getProductsByBrand(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { brand } = request.query;

    if (brand) {
      const productService = container.resolve(ListProductsByBrandService);

      const product = await productService.execute(String(brand));

      return response.json(product);
    }

    return response.json([]);
  }
}
