
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Product, ProductStatus, ImageFile } from '../types';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const AddProductPage: React.FC = () => {
    const { dispatch } = useAppContext();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [cashPrice, setCashPrice] = useState('');
    const [installmentPrice, setInstallmentPrice] = useState('');
    const [durations, setDurations] = useState('');
    const [photo, setPhoto] = useState<ImageFile | undefined>();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto({
                    name: file.name,
                    type: file.type,
                    dataUrl: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const installmentDurations = durations.split(',').map(d => parseInt(d.trim(), 10)).filter(Boolean);
        if (!name || !cashPrice || !installmentPrice || installmentDurations.length === 0) {
            alert('Please fill all required fields');
            return;
        }

        const newProduct: Product = {
            id: new Date().toISOString(),
            name, model, photo,
            cashPrice: parseFloat(cashPrice),
            installmentPrice: parseFloat(installmentPrice),
            installmentDurations,
            status: ProductStatus.Available,
            createdAt: new Date().toISOString(),
        };

        dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
        navigate('/products');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Add New Product</h1>
            <form onSubmit={handleSubmit}>
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input id="name" label="Product Name" value={name} onChange={e => setName(e.target.value)} required />
                        <Input id="model" label="Model / Brand" value={model} onChange={e => setModel(e.target.value)} />
                        <Input id="cashPrice" label="Cash Price" type="number" value={cashPrice} onChange={e => setCashPrice(e.target.value)} required />
                        <Input id="installmentPrice" label="Installment Price" type="number" value={installmentPrice} onChange={e => setInstallmentPrice(e.target.value)} required />
                        <div className="md:col-span-2">
                           <Input id="durations" label="Installment Durations (e.g., 6, 12, 18)" placeholder="Comma-separated months" value={durations} onChange={e => setDurations(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Photo</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                            {photo && <img src={photo.dataUrl} alt="Product" className="mt-2 h-24 rounded" />}
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={() => navigate('/products')}>Cancel</Button>
                        <Button type="submit">Save Product</Button>
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default AddProductPage;
