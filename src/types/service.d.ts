export interface DescriptionKey {
  key: string;
  detail: string;
}

export interface Service {
  title: string;
  description: string;
  descriptionListKeys: DescriptionKey[]; 
  buttonName: string;
  imageUrl: string; 
  buttonRedirectionUrl: string; 
}
