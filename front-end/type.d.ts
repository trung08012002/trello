export interface WorkPlace {
  name: string;
  img: string;
  id: string;
}
export interface Board {
  name: string;
  img: string;
  _id: string;
  favorite: boolean;
  isTemplate: boolean;
  backgroundColor: string;
}

export interface BackgroundImage {
  _id: string;
  url: string;
}
