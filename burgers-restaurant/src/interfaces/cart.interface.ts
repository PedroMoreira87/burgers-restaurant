export interface ICartState {
  items: ICart[];
  totalQuantity: number;
}

export interface ICart {
  id: string;
  price: number;
  quantity: number;
  totalPrice: number;
  name: string;
  modifiers: IModifier[];
}

interface IModifier {
  id: number;
  name: string;
  price: number;
  maxChoices?: number;
  position?: number;
  visible?: number;
  availabilityType?: string;
  qty?: number;
  available?: boolean;
}
