
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ProductStatus } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PlusCircleIcon } from '../components/icons/LucideIcons';

const ProductsPage: React.FC = () => {
    const { state } = useAppContext();
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
                <Button onClick={() => navigate('/products/new')}>
                    <PlusCircleIcon className="w-5 h-5" />
                    Add Product
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {state.products.length > 0 ? state.products.map(product => (
                    <Card key={product.id} className="flex flex-col">
                        <div className="relative">
                            <img 
                                src={product.photo ? product.photo.dataUrl : `https://picsum.photos/seed/${product.id}/400/300`} 
                                alt={product.name} 
                                className="w-full h-48 object-cover rounded-t-lg" 
                            />
                            <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                                product.status === ProductStatus.Available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {product.status}
                            </span>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.model}</p>
                            <div className="mt-auto space-y-1 text-sm">
                                <p><strong>Cash:</strong> Rs {product.cashPrice.toLocaleString()}</p>
                                <p><strong>Installment:</strong> Rs {product.installmentPrice.toLocaleString()}</p>
                            </div>
                        </div>
                    </Card>
                )) : (
                     <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 text-center py-10">
                        <p className="text-gray-500">No products found. Add one to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
