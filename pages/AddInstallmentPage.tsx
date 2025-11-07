
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { InstallmentPlan, Product, Payment, PaymentStatus, ProductStatus } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const AddInstallmentPage: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const navigate = useNavigate();
    const [customerId, setCustomerId] = useState('');
    const [productId, setProductId] = useState('');
    const [duration, setDuration] = useState<number>(0);

    const availableProducts = useMemo(() => state.products.filter(p => p.status === ProductStatus.Available), [state.products]);
    const selectedProduct = useMemo(() => state.products.find(p => p.id === productId), [state.products, productId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customerId || !productId || !duration || !selectedProduct) {
            alert('Please select a customer, product, and duration.');
            return;
        }

        const monthlyPayment = selectedProduct.installmentPrice / duration;
        const payments: Payment[] = Array.from({ length: duration }, (_, i) => ({
            id: `${new Date().toISOString()}-${i}`,
            date: '',
            amount: monthlyPayment,
            status: PaymentStatus.Pending,
        }));

        const newPlan: InstallmentPlan = {
            id: new Date().toISOString(),
            customerId,
            productId,
            startDate: new Date().toISOString(),
            totalAmount: selectedProduct.installmentPrice,
            monthlyPayment,
            durationMonths: duration,
            payments,
            latePaymentCount: 0,
            createdAt: new Date().toISOString(),
        };

        dispatch({ type: 'ADD_INSTALLMENT_PLAN', payload: newPlan });
        dispatch({ type: 'UPDATE_PRODUCT_STATUS', payload: { productId, status: ProductStatus.Sold } });
        navigate('/installments');
    };
    
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Create New Installment Plan</h1>
            <form onSubmit={handleSubmit}>
                <Card>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="customer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer</label>
                            <select id="customer" value={customerId} onChange={e => setCustomerId(e.target.value)} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600">
                                <option value="">Select a customer</option>
                                {state.customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="product" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product</label>
                            <select id="product" value={productId} onChange={e => {setProductId(e.target.value); setDuration(0);}} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600">
                                <option value="">Select a product</option>
                                {availableProducts.map(p => <option key={p.id} value={p.id}>{p.name} - Rs {p.installmentPrice.toLocaleString()}</option>)}
                            </select>
                        </div>
                        {selectedProduct && (
                             <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Installment Duration</label>
                                <select id="duration" value={duration} onChange={e => setDuration(Number(e.target.value))} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600">
                                    <option value={0}>Select duration</option>
                                    {selectedProduct.installmentDurations.map(d => <option key={d} value={d}>{d} months</option>)}
                                </select>
                            </div>
                        )}
                        {selectedProduct && duration > 0 && (
                            <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold">Plan Summary</h3>
                                <p>Total Amount: <span className="font-bold">Rs {selectedProduct.installmentPrice.toLocaleString()}</span></p>
                                <p>Monthly Payment: <span className="font-bold">Rs {(selectedProduct.installmentPrice / duration).toLocaleString(undefined, {maximumFractionDigits: 0})}</span></p>
                                <p>Duration: <span className="font-bold">{duration} months</span></p>
                            </div>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={() => navigate('/installments')}>Cancel</Button>
                        <Button type="submit">Create Plan</Button>
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default AddInstallmentPage;
