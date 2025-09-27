import React, { useState } from 'react';
import { Modal, Input, Select, Button, message } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { AiFillCrown } from 'react-icons/ai';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useCreateSubScriptionMutation } from '../../redux/features/subscription/subscription'; // API hooks

const Subscription = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [subscriptionName, setSubscriptionName] = useState('');
    const [unitType, setUnitType] = useState('1-3 Units');
    const [monthlyType, setMonthlyType] = useState('1');
    const [price, setPrice] = useState('');
    const [features, setFeatures] = useState([]); // Store features dynamically

    const [createSubscription, { isLoading }] = useCreateSubScriptionMutation(); // Create subscription mutation

    // Handle open modal for adding a new subscription
    const showModal = () => {
        setIsModalVisible(true);
        setSubscriptionName('');
        setUnitType('1-3 Units');
        setMonthlyType('1');
        setPrice('');
        setFeatures([]); // Reset features when opening the modal
    };

    // Handle modal close
    const handleCancel = () => {
        setIsModalVisible(false);
        setSubscriptionName('');
        setUnitType('1-3 Units');
        setMonthlyType('1');
        setPrice('');
        setFeatures([]); // Clear features when closing the modal
    };

    // Handle form submit for adding subscription
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subscriptionName || !unitType || !monthlyType || !price || features.length === 0) {
            message.error('Please fill all fields and add at least one feature!');
            return;
        }

        const formData = {
            title: subscriptionName, // Subscription name
            features: features, // Array of features
            amount: parseFloat(price), // Subscription price as a float
            type: monthlyType === '1' ? 'weekly' : monthlyType === '2' ? 'monthly' : 'yearly', // Subscription type
        };

        // Call the create subscription API
        try {
            const response = await createSubscription(formData);
            console.log(response);
            if (response?.data?.code === 201) {
                message.success('Subscription added successfully!');
                handleCancel(); // Close the modal after successful submission
                // reset 
                setSubscriptionName('');
                setUnitType('1-3 Units');
                setMonthlyType('1');
                setPrice('');
                setFeatures([]);
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    };

    // Handle adding a new feature
    const handleAddFeature = () => {
        const feature = document.getElementById('feature-input').value;
        if (feature && !features.includes(feature)) {
            setFeatures([...features, feature]);
            document.getElementById('feature-input').value = ''; // Clear input after adding
        } else {
            message.error('Please enter a valid feature!');
        }
    };

    return (
        <section>
            <div className="w-full flex justify-end items-center gap-2 flex-wrap py-6">
                <Link
                    to="/subscription/user-list"
                    className="text-xl px-8 py-3 border border-[#344f47] text-[#344f47] rounded"
                >
                    Subscriptions User
                </Link>
                <button
                    type="button"
                    className="text-xl px-5 py-3 bg-[#344f47] text-white flex justify-center items-center gap-1 rounded md:mb-0"
                    onClick={showModal} // Open modal for adding new subscription
                >
                    <FaPlus className="text-xl font-semibold text-white" /> Add Subscription
                </button>
            </div>

            {/* Subscriptions Grid */}
            {/* Subscriptions will be displayed here (you can populate this part with your data) */}

            {/* Modal for adding subscription */}
            <Modal
                title="Add Subscription"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Remove default cancel and ok buttons
            >
                <form onSubmit={handleSubmit} action="">
                    <div className="mb-4">
                        <span className="block mb-2 font-semibold">Subscription Name</span>
                        <Input
                            className="w-full py-3"
                            placeholder="Enter subscription name"
                            value={subscriptionName}
                            onChange={(e) => setSubscriptionName(e.target.value)}
                        />
                    </div>

                    <div className="my-3">
                        <span className="block mb-2 font-semibold">Features</span>
                        <div>
                            <input
                                type="text"
                                id="feature-input"
                                className="w-full py-3 border border-gray-300 rounded-lg px-3"
                                placeholder="Enter feature"
                            />
                            <button
                                type="button"
                                onClick={handleAddFeature}
                                className="mt-2 w-full py-2 px-5 bg-[#344f47] text-white rounded-lg"
                            >
                                Add Feature
                            </button>
                        </div>
                        <div className="mt-4">
                            <span className="block mb-2 font-semibold">Added Features:</span>
                            <ul className="list-disc pl-6">
                                {features.map((feature, index) => (
                                    <li key={index} className="text-gray-600">{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="my-3">
                        <span className="block mb-2 font-semibold">Monthly Type</span>
                        <Select
                            className="w-full h-12"
                            value={monthlyType}
                            onChange={(value) => setMonthlyType(value)}
                        >
                            <Select.Option value="1">Weekly</Select.Option>
                            <Select.Option value="2">Monthly</Select.Option>
                            <Select.Option value="3">Yearly</Select.Option>
                        </Select>
                    </div>

                    <div className="mb-4">
                        <span className="block mb-2 font-semibold">Subscription Price</span>
                        <Input
                            className="w-full py-3"
                            placeholder="Enter price"
                            value={price}
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        htmlType="submit"
                        className="w-full py-3 px-5 rounded-lg bg-[#344f47] text-white"
                        disabled={isLoading} // Disable the button while loading
                    >
                        {isLoading ? 'Adding...' : 'Add Subscription'}
                    </button>
                </form>
            </Modal>
        </section>
    );
};

export default Subscription;