export interface IArticle {
  isHidden?: boolean;
  isHighlighted?: boolean;
  order?: number;
  src: string;    //the source of the image for the article
  alt: string;
  title: string;
  // body?: string;
  url?: string;
  client?: string;
  clientKey?: string;
  category?: string[];
  clientObject?: IClient;
}

export interface IClient {
  key: string;
  name: string;
  isHidden?: boolean;
  order?: number;
  category?: string;
  logo?: any;       //url to the logo image
  height?: number;  //if non-default, provide height
  width?: number;   //if non-default, provide width
  url?: string;     //url to the author page for this client
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
enum PortfolioColumn {
  isHidden = 0,
  isHighlighted = 1,
  order = 2,
  client = 3,
  clientKey = 4,
  category = 5,
  title = 6,
  alt = 8,
  url = 9,
  src = 10
};
enum ClientColumn {
  key = 0,
  name = 1,
  order = 2,
  isHidden = 3,
  category = 4,
  logo = 5,
  height = 6,
  width = 7,
  url = 8
};

function withDefault<T>(value: any, defaultValue : T) : T {
  return value && value.length ? value as T : defaultValue;
}

const BOOL_OPTIONS = ["y", "yes", "t", "true", "x"];
function asBool(value: string, defaultValue: boolean) : boolean{
  if(!value || !value.length) return defaultValue;
  return BOOL_OPTIONS.includes(value.trim().toLowerCase());
}

export function mapRowToArticle(row: any) : IArticle {
  return {
    isHidden: asBool(row[PortfolioColumn.isHidden], false),
    isHighlighted: asBool(row[PortfolioColumn.isHighlighted], false),
    order: withDefault(row[PortfolioColumn.order], 999),
    src: row[PortfolioColumn.src] ?? null,
    alt: row[PortfolioColumn.alt] ?? null,
    title: row[PortfolioColumn.title] ?? null,
    url: row[PortfolioColumn.url] ?? null,
    client: row[PortfolioColumn.client] ?? null,
    clientKey: row[PortfolioColumn.clientKey] ?? null,
    category: withDefault(row[PortfolioColumn.category], "").split(","),
  };
}

export function mapRowToClient(row: any) : IClient {
  return {
    key: row[ClientColumn.key] ?? null,
    name: row[ClientColumn.name] ?? null,
    isHidden: asBool(row[ClientColumn.isHidden], false),
    order: withDefault(row[ClientColumn.order], 999),
    category: withDefault(row[ClientColumn.category], "magazine"),
    logo: row[ClientColumn.logo] ?? null,
    height: withDefault(row[ClientColumn.height], 32), 
    width: withDefault(row[ClientColumn.width], 108),
    url: row[ClientColumn.url] ?? null,
  };
}