import type { ImageSourcePropType } from "react-native";
import type { ReactNode } from "react";

/** User roles across the app */
export type Role = "guest" | "host" | "admin";

/** Base fields all DB rows share */
export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

/** Property (boutique hotel / STR) */
export interface Property extends BaseEntity {
  name: string;
  code: string;
  address?: string;
  active: boolean;
}

/** Product / Menu item */
export interface Product extends BaseEntity {
  name: string;
  price: number;
  image_url?: string;
  description?: string;
  type: string;
  active?: boolean;

  // optional linkage
  supplier?: string | null;
  hotelId?: string | null;
  propertyId?: string | null;

  // optional metrics
  calories?: number;
  protein?: number;
  rating?: number;
  cost_price?: number;
  sku?: string;
}

/** Category (optional grouping for products/packs) */
export interface Category extends BaseEntity {
  name: string;
  description?: string;
}

/** Pack (bundle of products) */
export interface Pack extends BaseEntity {
  name: string;
  price: number;
  image_url?: string;
  description?: string;
  type: string;
  active: boolean;
  productIds?: string[];
  target_margin?: number;
  override_margin?: number;
}

/** Order */
export interface Order extends BaseEntity {
  userId: string;
  packId: string;
  status: string;
  scheduledTime: string;
  deliveryType: string;
  totalPrice: number;
  notes?: string;
}

/** App user profile (stored in Supabase `users`) */
export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  role: Role;

  accountId?: string; // Supabase auth.uid
  hotelId?: string | null;
  currentPropertyId?: string | null;

  phone?: string;
  roomNumber?: string;
}

/** ----------------- Cart types ----------------- */
export interface CartCustomization {
  id: string;
  name: string;
  price: number;
  type?: string;
}

export interface CartItemType {
  id: string; // product/pack id
  name: string;
  price: number;
  image_url?: string;
  quantity: number;
  customizations?: CartCustomization[];
}

export interface CartStore {
  items: CartItemType[];
  addItem: (item: Omit<CartItemType, "quantity">) => void;
  removeItem: (id: string, customizations?: CartCustomization[]) => void;
  increaseQty: (id: string, customizations?: CartCustomization[]) => void;
  decreaseQty: (id: string, customizations?: CartCustomization[]) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

/** ----------------- UI prop types ----------------- */
export interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

export interface PaymentInfoStripeProps {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
}

export interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  style?: string;
  leftIcon?: ReactNode;
  textStyle?: string;
  isLoading?: boolean;
}

export interface CustomHeaderProps {
  title?: string;
}

export interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export interface ProfileFieldProps {
  label: string;
  value: string;
  icon: ImageSourcePropType;
}

/** ----------------- Auth & API helpers ----------------- */
export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface GetMenuParams {
  category: string;
  query: string;
}
