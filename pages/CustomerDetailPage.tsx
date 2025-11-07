
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Card from '../components/ui/Card';
import { PaymentStatus } from '../types';

const CustomerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useAppContext();
    const customer = state.customers.find(c => c.id === id);
    const customerPlans = state.installmentPlans.filter(p => p.customerId === id);

    if (!customer) {
        return <div className="text-center text-gray-500">Customer not found.</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{customer.name}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Customer Details</h2>
                        <div className="space-y-2 text-sm">
                            <p><strong>Phone:</strong> {customer.phone}</p>
                            <p><strong>CNIC:</strong> {customer.cnic}</p>
                            <p><strong>City:</strong> {customer.city}</p>
                            <p><strong>Address:</strong> {customer.address}</p>
                        </div>
                    </Card>
                    <Card>
                         <h2 className="text-lg font-semibold mb-4 border-b pb-2">Documents</h2>
                         <div className="flex space-x-4">
                            {customer.cnicFront ? <img src={customer.cnicFront.dataUrl} alt="CNIC Front" className="h-32 rounded-lg cursor-pointer" onClick={() => window.open(customer.cnicFront?.dataUrl)}/> : <p className="text-sm text-gray-400">No front image</p>}
                            {customer.cnicBack ? <img src={customer.cnicBack.dataUrl} alt="CNIC Back" className="h-32 rounded-lg cursor-pointer" onClick={() => window.open(customer.cnicBack?.dataUrl)}/> : <p className="text-sm text-gray-400">No back image</p>}
                         </div>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <h2 className="text-lg font-semibold mb-4">Installment History</h2>
                        <div className="space-y-4">
                            {customerPlans.length > 0 ? customerPlans.map(plan => {
                                const product = state.products.find(p => p.id === plan.productId);
                                const totalPaid = plan.payments.filter(p => p.status === PaymentStatus.Paid).reduce((sum, p) => sum + p.amount, 0);
                                const remainingBalance = plan.totalAmount - totalPaid;
                                const isCompleted = remainingBalance <= 0;

                                return (
                                <div key={plan.id} className="p-4 border rounded-lg dark:border-gray-700">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{product?.name} - {product?.model}</h3>
                                            <p className="text-sm text-gray-500">Started: {new Date(plan.startDate).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {isCompleted ? 'Completed' : 'Active'}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-sm">
                                        <p>Total: Rs {plan.totalAmount.toLocaleString()}</p>
                                        <p>Paid: <span className="text-green-600">Rs {totalPaid.toLocaleString()}</span></p>
                                        <p>Remaining: <span className="text-red-600">Rs {remainingBalance.toLocaleString()}</span></p>
                                    </div>
                                </div>
                                );
                            }) : (
                                <p className="text-center text-gray-500">No installment plans found for this customer.</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailPage;
