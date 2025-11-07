
import React, { createContext, useReducer, useEffect, useContext, ReactNode } from 'react';
import { AppState, AppAction, Customer, Product, InstallmentPlan, PaymentStatus } from '../types';

const initialState: AppState = {
  customers: [],
  products: [],
  installmentPlans: [],
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, action.payload] };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'ADD_INSTALLMENT_PLAN':
      return { ...state, installmentPlans: [...state.installmentPlans, action.payload] };
    case 'UPDATE_PRODUCT_STATUS':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.productId ? { ...p, status: action.payload.status } : p
        ),
      };
    case 'ADD_PAYMENT': {
      const { planId, paymentDate } = action.payload;
      return {
        ...state,
        installmentPlans: state.installmentPlans.map(plan => {
          if (plan.id === planId) {
            const nextPendingPaymentIndex = plan.payments.findIndex(p => p.status === PaymentStatus.Pending);
            if (nextPendingPaymentIndex !== -1) {
              const newPayments = [...plan.payments];
              newPayments[nextPendingPaymentIndex] = {
                ...newPayments[nextPendingPaymentIndex],
                status: PaymentStatus.Paid,
                date: paymentDate,
              };
              return { ...plan, payments: newPayments };
            }
          }
          return plan;
        }),
      };
    }
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
};

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<AppAction> }>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem('installmentProData');
      if (storedState) {
        dispatch({ type: 'LOAD_STATE', payload: JSON.parse(storedState) });
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('installmentProData', JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
