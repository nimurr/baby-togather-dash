import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button, message, Checkbox, List } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { AiFillCrown } from 'react-icons/ai';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useCreateSubScriptionMutation, useDeleteSubScriptionMutation, useGetSubScriptionQuery, useUpdateScriptionMutation } from '../../redux/features/subscription/subscription'; // API hooks

const Subscription = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [subscriptionName, setSubscriptionName] = useState('');
    const [unitType, setUnitType] = useState('monthly'); // Adjust default to "monthly"
    const [price, setPrice] = useState('');
    const [currentSubscriptionId, setCurrentSubscriptionId] = useState(null); // For keeping track of the subscription being edited
    const [selectedFeatures, setSelectedFeatures] = useState([]); // For storing selected features in the modal
    const [newFeature, setNewFeature] = useState(''); // For adding a new feature dynamically

    // Available features for subscriptions (This can be dynamic if required)
    const availableFeatures = [
        "limited profile views per day",
        "limited voice notes and message",
        "standard verification process"
    ];

    // Fetch all subscriptions
    const { data, refetch } = useGetSubScriptionQuery();
    const subscriptionData = data?.data?.attributes?.results || [];

    const [createSubscription, { isLoading }] = useCreateSubScriptionMutation(); // Create subscription mutation
    const [updateSubscription, { isLoading: updateLoading }] = useUpdateScriptionMutation(); // Update subscription mutation

    // Handle open modal for adding a new subscription
    const showModal = (edit = false, subscription = {}) => {
        setIsEditing(edit);
        setIsModalVisible(true);

        if (edit) {
            setSubscriptionName(subscription.title);
            setUnitType(subscription.limitation);
            setPrice(subscription.amount);
            setCurrentSubscriptionId(subscription.id); // Set the subscription ID for editing
            setSelectedFeatures(subscription.features || []); // Set selected features for editing
        } else {
            // Reset all fields for creating a new subscription
            setSubscriptionName('');
            setUnitType('monthly');
            setPrice('');
            setCurrentSubscriptionId(null);
            setSelectedFeatures([]); // Reset features for new subscription
        }
    };

    // Handle modal close
    const handleCancel = () => {
        setIsModalVisible(false);
        setSubscriptionName('');
        setUnitType('monthly');
        setPrice('');
        setCurrentSubscriptionId(null); // Clear the ID when closing the modal
        setSelectedFeatures([]); // Clear selected features
        setNewFeature(''); // Clear new feature input
    };

    // Add a new feature to the selected features list
    const handleAddFeature = () => {
        if (newFeature && !selectedFeatures.includes(newFeature)) {
            setSelectedFeatures([...selectedFeatures, newFeature]);
            setNewFeature(''); // Clear the input after adding
        } else {
            message.error('Feature is either empty or already added');
        }
    };

    // Remove a feature from the selected features list
    const handleRemoveFeature = (feature) => {
        setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    };

    // Handle form submit for adding subscription
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subscriptionName || !unitType || !price || selectedFeatures.length === 0) {
            message.error('Please fill all fields and select features!');
            return;
        }

        const formData = {
            title: subscriptionName,
            amount: parseFloat(price),
            limitation: unitType, // Use the type directly from the dropdown
            features: selectedFeatures, // Add features
        };

        console.log(formData)

        // Call the create subscription API
        try {
            const response = await createSubscription(formData);
            console.log(response)
            if (response?.data?.code === 201) {
                message.success('Subscription added successfully!');
                handleCancel(); // Close the modal after successful submission
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    };

    // Handle form submit for updating subscription
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = {
            title: subscriptionName,
            amount: parseFloat(price),
            limitation: unitType, // Use the type directly from the dropdown
            features: selectedFeatures, // Add features
        };

        console.log(formData)

        // Call the update subscription API
        try {
            const response = await updateSubscription({ id: currentSubscriptionId, formData });
            console.log(response)
            if (response?.data?.code === 200) {
                message.success('Subscription updated successfully!');
                handleCancel(); // Close the modal after successful update
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
        }
    };

    const [deleteSubscription, { isLoading: deleteLoading }] = useDeleteSubScriptionMutation();
    const handleDelete = async (index) => {
        try {
            const response = await deleteSubscription(index);
            console.log(response)
            if (response?.data?.code === 200) {
                message.success('Subscription deleted successfully!');
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong');
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
                    onClick={() => showModal(false)} // Open modal for adding new subscription
                >
                    <FaPlus className="text-xl font-semibold text-white" /> Add Subscription
                </button>
            </div>

            {/* Subscriptions Grid */}
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-5">
                {subscriptionData?.map((subscription) => (
                    <div key={subscription.id} className="border-2 border-[#344f47] rounded-lg  overflow-hidden">
                        <div className="p-5">
                            <h2 className="text-3xl font-semibold text-[#344f47] flex items-center gap-2">
                                <div className="h-10 w-10 rounded-full bg-[#344f47] text-white flex justify-center items-center">
                                    <AiFillCrown className="size-6" />
                                </div>
                                {subscription?.title}
                            </h2>
                            <h3 className="text-2xl font-semibold mt-5">Features</h3>
                            <ul className="list-disc pl-4">
                                {subscription?.features?.map((feature, index) => (
                                    <p className="mt-2 font-semibold text-xl gap-2 flex items-center"><FaRegCircleCheck className="text-[#344f47]" /> {feature}</p>
                                ))}
                            </ul>
                        </div>
                        <div className="border-t-2 border-b-2 border-[#344f47] py-2 text-center my-3">
                            <p className="text-5xl font-semibold text-[#344f47] gap-2">{subscription?.amount} <span className="text-base font-semibold text-black capitalize">/{subscription?.limitation}</span></p>
                        </div>
                        <div className="gap-3 p-5">
                            {/* delete button  */}
                            <button
                                onClick={() => showModal(true, subscription)} // Open modal for editing the selected subscription
                                className="w-full py-3 px-6 border bg-[#344f47] text-white rounded-lg"
                            >
                                Edit Package
                            </button>
                            <button
                                onClick={() => handleDelete(subscription?.id)}
                                className="w-full py-3 px-6 border bg-[#b1251b] text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for adding or editing subscription */}
            <Modal
                title={isEditing ? 'Edit Subscription' : 'Add Subscription'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Remove default cancel and ok buttons
            >
                <form onSubmit={isEditing ? handleUpdate : handleSubmit} action="">
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
                        <span className="block mb-2 font-semibold">Subscription Type</span>
                        <Select
                            className="w-full h-12"
                            value={unitType}
                            onChange={(value) => setUnitType(value)}
                        >
                            <Select.Option value="weekly">Weekly</Select.Option>
                            <Select.Option value="monthly">Monthly</Select.Option>
                            <Select.Option value="annual">Annual</Select.Option>
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

                    {/* Add Feature */}
                    <div className="my-3">
                        <span className="block mb-2 font-semibold">Add New Feature</span>
                        <Input
                            className="w-full py-3"
                            placeholder="Enter feature"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                        />
                        <Button onClick={handleAddFeature} className="mt-2 w-full">Add Feature</Button>
                    </div>

                    {/* Display Selected Features */}
                    <div className="my-3">
                        <span className="block mb-2 font-semibold">Selected Features</span>
                        <List
                            bordered
                            dataSource={selectedFeatures}
                            renderItem={(feature) => (
                                <List.Item>
                                    <span>{feature}</span>
                                    <Button
                                        type="link"
                                        danger
                                        onClick={() => handleRemoveFeature(feature)}
                                    >
                                        Remove
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </div>

                    <button
                        type="submit"
                        htmlType="submit"
                        className="w-full py-3 px-5 rounded-lg bg-[#344f47] text-white"
                        disabled={isLoading || updateLoading} // Disable the button while loading
                    >
                        {isLoading || updateLoading ? 'Saving...' : isEditing ? 'Update Subscription' : 'Add Subscription'}
                    </button>
                </form>
            </Modal>
        </section>
    );
};

export default Subscription;
