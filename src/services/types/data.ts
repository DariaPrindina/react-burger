import { ReactElement, ReactNode } from "react"

export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  id?: string;
}

export type TIngredientsDataRes = {
  success: boolean,
  data: TIngredient[];
}

export type TWsActionsTypes = {
  wsInit: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string;
}

export type TOwner = {
  name: string, 
  email: string, 
  createdAt: string | number | Date,
  updatedAt: string;
}

export type TOrder = {
  createdAt: string | number | Date,
  ingredients: TIngredient[],
  name: string,
  number: number,
  owner: TOwner,
  price: number,
  status: string,
  updatedAt: string,
  _id: string;
}

export type TOrders = {
  orders: TOrder[],
  totalToday: number,
  total: number
}

export type TOrderPostRes = {
  name: string,
  order: TOrder,
  success: boolean;
  number: number
}

export type TModalOverlay = {
  handleCloseByOverlay: () => void;
}

export type TDndIngredient = {
  index: number, 
  ingredient: TIngredient;
}

export type TUseDrop = {
  index: number,
  type: string,
  accept: string,
  item: {
    dragIndex: number,
    hoverIndex: number;
  };
}

export type TIngredientDetails = {
  title?: string;
}

export type TUseFormHookInputValues = {
  name?: string | undefined,
  email?: string | undefined,
  password?: string | undefined;
}

export type TModal = {
  handleClose: () => void,
  title?: string,
  children?: ReactNode;
}

export type TProtectedRoute = {
  element: ReactElement,
  onlyUnAuth?: boolean;
}

export type TFeedItem = {
  orderData: TOrder,
  children?: ReactNode;
}

export type TIngredientFc = {
  ingredient: TIngredient
}

export type TUserRes = {
  message: string,
  user: {
    name: string;
    email: string;
    createdAt: string | number | Date;
    updatedAt: string;
  },
  success: boolean,
  refreshToken: string,
  accessToken: string;
}

export type TUserLogoutRes = {
  message: string,
  refreshToken: string,
  success: boolean
}