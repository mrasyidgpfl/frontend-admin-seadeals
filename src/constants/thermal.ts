export interface ProductDetailThermal {
  id: number
  name: string
  variant: string
  quantity: number
}

export interface UserDetailThermal {
  name: string
  address: string
  city: string
}

export interface CourierThermal {
  name: string
  code: string
}

export default interface Thermal {
  buyer: UserDetailThermal
  courier: CourierThermal
  seller_name: string
  total_weight: number
  price: number
  delivery_number : string
  origin_city : string
  issued_at : string
  products: Array<ProductDetailThermal>
}
