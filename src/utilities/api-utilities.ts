import { IArticle, IClient, IService, ITestimonial } from "./app-types";

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
}

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
}

enum TestimonialColumn {
  name = 0,
  title = 1,
  client = 2,
  clientKey = 3,
  quote = 4,
  linkedIn = 5,
  order = 6,
  isHidden = 7,
}

enum ServiceColumn {
  key = 0,
  title = 1,
  description = 2,
  image = 3,
  isHidden = 4
}

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

export function mapRowToTestimonial(row: any) : ITestimonial {
  return {
    name: row[TestimonialColumn.name] ?? null,
    title: row[TestimonialColumn.title] ?? null,
    client: row[TestimonialColumn.client] ?? null,
    clientKey: row[TestimonialColumn.clientKey] ?? null,
    quote: row[TestimonialColumn.quote] ?? null,
    linkedIn: row[TestimonialColumn.linkedIn] ?? null,
    isHidden: asBool(row[TestimonialColumn.isHidden], false),
    order: withDefault(row[TestimonialColumn.order], 999),    
  };
}

export function mapRowToService(row: any) : IService {
  return {
    key: row[ServiceColumn.key] ?? null,
    title: row[ServiceColumn.title] ?? null,
    description: row[ServiceColumn.description] ?? null,
    image: row[ServiceColumn.image] ?? null,
    isHidden: asBool(row[ServiceColumn.isHidden], false),
  };
}