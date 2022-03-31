export interface IPortfolioItem {
  isHidden?: boolean;
  isHighlighted?: boolean;
  order?: number;
  src: string;    //the source of the image for the article
  alt: string;
  title: string;
  // body?: string;
  url?: string;
  client?: string;
  category?: string[];
}

//0. hide	
//1. highlight	
//2. order
//3. client	
//4. category(ies)	
//5. title	
//6. image filename	
//7. image alt	
//8. url	
//9. image url
export enum PortfolioColumn {
  isHidden = 0,
  isHighlighted = 1,
  order = 2,
  client = 3,
  category = 4,
  title = 5,
  alt = 7,
  url = 8,
  src = 9
};

function withDefault<T>(value: any, defaultValue : T) : T {
  return value && value.length ? value as T : defaultValue;
}

const BOOL_OPTIONS = ["y", "yes", "t", "true", "x"];
function asBool(value: string, defaultValue: boolean) : boolean{
  if(!value || !value.length) return defaultValue;
  return BOOL_OPTIONS.includes(value.trim().toLowerCase());
}

export function mapRowToItem(row: any) : IPortfolioItem {
  return {
    isHidden: asBool(row[PortfolioColumn.isHidden], false),
    isHighlighted: asBool(row[PortfolioColumn.isHighlighted], false),
    order: withDefault(row[PortfolioColumn.order], 999),
    src: row[PortfolioColumn.src] ?? null,
    alt: row[PortfolioColumn.alt] ?? null,
    title: row[PortfolioColumn.title] ?? null,
    url: row[PortfolioColumn.url] ?? null,
    client: row[PortfolioColumn.client] ?? null,
    category: withDefault(row[PortfolioColumn.category], "").split(","),
  };
}