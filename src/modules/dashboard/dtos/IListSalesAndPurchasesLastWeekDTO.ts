interface ICountProps {
  day: string;
  total: number;
}

interface ITotalProps {
  day: string;
  total: number;
}

export default interface IListSalesAndPurchasesLastWeekDTO {
  sales: {
    count: ICountProps[];
    total: ITotalProps[];
  };
  purchases: {
    count: ICountProps[];
    total: ITotalProps[];
  };
}
