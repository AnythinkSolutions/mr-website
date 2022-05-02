
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

export interface ITestimonial {
  name: string;     //person's name
  title: string;    //title of the person
  linkedIn?: string;
  isHidden?: boolean;
  order?: number;
  quote: string;
  client?: string;
  clientKey?: string;
  clientObject?: IClient;
  mapKey?: number;
}

export interface IService {
  key: string;
  title: string;
  description: string;
  image: string;
  isHidden?: boolean;
}