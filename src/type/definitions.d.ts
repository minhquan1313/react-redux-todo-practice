declare module "currency-symbol-map/map" {
  const currencyToSymbolMap: {
    [CurrencyKey: string]: string;
  };

  export default currencyToSymbolMap;
}

export interface AnimeInstance {
  remove: () => void;
}
