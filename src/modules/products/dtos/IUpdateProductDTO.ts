export default interface IUpdateProductDTO {
  id: string;
  brandId: string;
  title: string;
  nick: string;
  description: string;
  price: number;
  stock: number;
  salePrice: number;
  userId: string;
  image: string;
}
