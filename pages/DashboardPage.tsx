
import React from 'react';
import { useAppContext } from '../context/AppContext';
import Card from '../components/ui/Card';
import { UsersIcon, DollarSignIcon, PackageIcon, AlertTriangleIcon } from '../components/icons/LucideIcons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PaymentStatus } from '../types';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Card>
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300">
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    </Card>
);

const DashboardPage: React.FC = () => {
    const { state } = useAppContext();
    const { customers, products, installmentPlans } = state;

    const totalSales = installmentPlans.reduce((acc, plan) => acc + plan.totalAmount, 0);
    const totalPaid = installmentPlans.flatMap(p => p.payments)
        .filter(pmt => pmt.status === PaymentStatus.Paid)
        .reduce((acc, pmt) => acc + pmt.amount, 0);

    const totalPendingAmount = totalSales - totalPaid;
    
    const overduePayments = installmentPlans.flatMap(plan => {
      const today = new Date();
      return plan.payments.filter(p => {
        const dueDate = new Date(plan.startDate);
        const paymentMonthIndex = plan.payments.indexOf(p);
        dueDate.setMonth(dueDate.getMonth() + paymentMonthIndex);
        return p.status === PaymentStatus.Pending && today > dueDate;
      });
    }).length;

    const monthlyData = installmentPlans.reduce((acc, plan) => {
        const month = new Date(plan.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (!acc[month]) {
            acc[month] = { name: month, sales: 0 };
        }
        acc[month].sales += plan.totalAmount;
        return acc;
    }, {} as Record<string, {name: string, sales: number}>);
    
    const chartData = Object.values(monthlyData).sort((a, b) => new Date(a.name) > new Date(b.name) ? 1 : -1);


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Customers" value={customers.length} icon={<UsersIcon className="w-6 h-6"/>} />
                <StatCard title="Total Sales" value={`Rs ${totalSales.toLocaleString()}`} icon={<DollarSignIcon className="w-6 h-6"/>} />
                <StatCard title="Total Products" value={products.length} icon={<PackageIcon className="w-6 h-6"/>} />
                <StatCard title="Overdue Payments" value={overduePayments} icon={<AlertTriangleIcon className="w-6 h-6"/>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Monthly Sales Summary</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card>
                    <h2 className="text-lg font-semibold mb-4">Financial Overview</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Paid Amount</p>
                            <p className="text-xl font-semibold text-green-600">Rs {totalPaid.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Pending Amount</p>
                            <p className="text-xl font-semibold text-yellow-600">Rs {totalPendingAmount.toLocaleString()}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
