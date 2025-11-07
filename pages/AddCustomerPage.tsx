
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Customer, ImageFile } from '../types';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const AddCustomerPage: React.FC = () => {
    const { dispatch } = useAppContext();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [cnic, setCnic] = useState('');
    const [cnicFront, setCnicFront] = useState<ImageFile | undefined>();
    const [cnicBack, setCnicBack] = useState<ImageFile | undefined>();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<ImageFile | undefined>>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setter({
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
        if (!name || !phone || !cnic || !city) {
            alert('Please fill all required fields');
            return;
        }

        const newCustomer: Customer = {
            id: new Date().toISOString(),
            name, phone, address, city, cnic, cnicFront, cnicBack,
            notes: '',
            createdAt: new Date().toISOString(),
        };

        dispatch({ type: 'ADD_CUSTOMER', payload: newCustomer });
        navigate('/customers');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Add New Customer</h1>
            <form onSubmit={handleSubmit}>
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input id="name" label="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                        <Input id="phone" label="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
                        <Input id="cnic" label="CNIC Number" value={cnic} onChange={e => setCnic(e.target.value)} required />
                        <Input id="city" label="City" value={city} onChange={e => setCity(e.target.value)} required />
                        <div className="md:col-span-2">
                          <Input id="address" label="Full Address" value={address} onChange={e => setAddress(e.target.value)} />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CNIC Front Image</label>
                            <input type="file" accept="image/*" onChange={e => handleFileChange(e, setCnicFront)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                            {cnicFront && <img src={cnicFront.dataUrl} alt="CNIC Front" className="mt-2 h-24 rounded" />}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CNIC Back Image</label>
                            <input type="file" accept="image/*" onChange={e => handleFileChange(e, setCnicBack)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                            {cnicBack && <img src={cnicBack.dataUrl} alt="CNIC Back" className="mt-2 h-24 rounded" />}
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={() => navigate('/customers')}>Cancel</Button>
                        <Button type="submit">Save Customer</Button>
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default AddCustomerPage;
