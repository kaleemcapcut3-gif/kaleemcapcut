
export enum PaymentMethod {
  Cash = 'Cash',
  Bank = 'Bank Transfer',
  Easypaisa = 'Easypaisa',
}

export enum PaymentStatus {
  Paid = 'Paid',
  Pending = 'Pending',
}

export enum ProductStatus {
  Available = 'Available',
  Sold = 'Sold',
}

export interface ImageFile {
  name: string;
  type: string;
  dataUrl: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  cnic: string;
  cnicFront?: ImageFile;
  cnicBack?: ImageFile;
  notes: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  model: string;
  photo?: ImageFile;
  cashPrice: number;
  installmentPrice: number;
  installmentDurations: number[]; // e.g., [6, 12, 18]
  status: ProductStatus;
  createdAt: string;
}

export interface Payment {
  id: string;
  date: string; // ISO string
  amount: number;
  status: PaymentStatus;
}

export interface InstallmentPlan {
  id: string;
  customerId: string;
  productId: string;
  startDate: string; // ISO string
  totalAmount: number;
  monthlyPayment: number;
  durationMonths: number;
  payments: Payment[];
  latePaymentCount: number;
  createdAt: string;
}

export interface AppState {
  customers: Customer[];
  products: Product[];
  installmentPlans: InstallmentPlan[];
}

export type AppAction =
  | { type: 'ADD_CUSTOMER'; payload: Customer }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'ADD_INSTALLMENT_PLAN'; payload: InstallmentPlan }
  | { type: 'UPDATE_PRODUCT_STATUS'; payload: { productId: string; status: ProductStatus } }
  | { type: 'ADD_PAYMENT'; payload: { planId: string; paymentDate: string; paymentMethod: PaymentMethod } }
  | { type: 'LOAD_STATE'; payload: AppState };
