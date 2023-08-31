import {
  ADD_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  ADD_CONSTRUCTOR_BUN,
  DELETE_ALL_CONSTRUCTOR_INGREDIENTS,
  REPLACE_CONSTRUCTOR_INGREDIENT
} from '../action-types/constructor-ingredients-types'
import { TIngredient } from '../types/data';

export interface IAddConstructorIngredient {
 readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
 otherIngredients: TIngredient;
}

export interface IDeleteConstructorIngredient {
 readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
 otherIngredients: TIngredient;
 id: string;
}

export interface IAddConstructorBun {
 readonly type: typeof ADD_CONSTRUCTOR_BUN;
 bun: TIngredient;
}

export interface IDeleteAllConstructorIngredient {
 readonly type: typeof DELETE_ALL_CONSTRUCTOR_INGREDIENTS;
}

export interface IReplaceConstructorIngredient {
 readonly type: typeof REPLACE_CONSTRUCTOR_INGREDIENT;
 item: {
  dragIndex: number;
  hoverIndex: number;
 }
}

export type TConstructorIngredientsActions =
	| IAddConstructorIngredient
	| IDeleteConstructorIngredient
	| IAddConstructorBun
	| IDeleteAllConstructorIngredient
	| IReplaceConstructorIngredient;