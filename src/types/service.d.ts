export interface DescriptionKey {
  key: string;
  detail: string;
}

export interface Service {
  id?: number;
  title: string;
  description: string;
  featuresList?: { featureName: string; featureDetail: string }[];
  buttonLabel?: string;
  buttonUrl?: string;
  imagePath: string;
}