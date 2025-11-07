
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PaymentStatus, PaymentMethod } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PlusCircleIcon } from '../components/icons/LucideIcons';

const InstallmentsPage: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const navigate = useNavigate();
    const [paymentPlanId, setPaymentPlanId] = useState<string | null>(null);

    const handleAddPayment = (planId: string) => {
        dispatch({
            type: 'ADD_PAYMENT',
            payload: {
                planId,
                paymentDate: new Date().toISOString(),
                paymentMethod: PaymentMethod.Cash, // Default, can be extended with a modal for method selection
            },
        });
        setPaymentPlanId(null);
    };

    const sortedPlans = [...state.installmentPlans].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Installment Plans</h1>
                <Button onClick={() => navigate('/installments/new')}>
                    <PlusCircleIcon className="w-5 h-5" />
                    New Plan
                </Button>
            </div>

            <div className="space-y-4">
                {sortedPlans.length > 0 ? sortedPlans.map(plan => {
                    const customer = state.customers.find(c => c.id === plan.customerId);
                    const product = state.products.find(p => p.id === plan.productId);
                    const paidCount = plan.payments.filter(p => p.status === PaymentStatus.Paid).length;
                    const isCompleted = paidCount === plan.durationMonths;

                    return (
                        <Card key={plan.id}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                <div>
                                    <p className="font-semibold">{customer?.name}</p>
                                    <p className="text-sm text-gray-500">{product?.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm">Progress</p>
                                    <p className="font-semibold">{paidCount} / {plan.durationMonths} months</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
                                        <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${(paidCount / plan.durationMonths) * 100}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm">Monthly Payment</p>
                                    <p className="font-semibold">Rs {plan.monthlyPayment.toLocaleString()}</p>
                                </div>
                                <div className="md:text-right">
                                    <Button onClick={() => handleAddPayment(plan.id)} disabled={isCompleted}>
                                        {isCompleted ? 'Completed' : 'Record Payment'}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    );
                }) : (
                    <Card>
                        <p className="text-center text-gray-500">No installment plans found. Create one to get started.</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default InstallmentsPage;
