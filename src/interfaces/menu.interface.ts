export interface IMenu {
  id: number;
  name: string;
  type: string;
  collapse: number;
  sections: ISection[];
}

export interface ISection {
  id: number;
  name: string;
  description?: string | null;
  position: number;
  visible: number;
  images: IImage[];
  items: IItem[];
}

export interface IImage {
  id: number;
  image: string;
}

export interface IItem {
  id: number;
  name: string;
  description?: string | null;
  alcoholic?: number;
  price: number;
  position?: number;
  visible?: number;
  availabilityType?: string;
  sku?: string;
  images?: IImage[];
  modifiers?: IModifier[];
  available?: boolean;
}

export interface IModifier {
  id: number;
  name: string;
  minChoices: number;
  maxChoices: number;
  items: IModifierItem[];
}

export interface IModifierItem {
  id: number;
  name: string;
  price: number;
  position?: number;
  visible?: number;
  availabilityType?: string;
  qty?: number;
  available?: boolean;
}
