export default interface IListProductPerBrandDTO {
  id: string;
  stock: number;
  title: string;
  backgroundImage: string;
  data: Array<{
    id: string;
    title: string;
    nick: string;
    stock: number;
  }>;
}
