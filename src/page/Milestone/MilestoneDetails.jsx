

import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const MilestoneDetails = () => {
    // State to manage the list of activities
    const [activities, setActivities] = useState([
        { id: 1, name: 'Opens and closes hands' },
        { id: 2, name: 'Brings hands to mouth' },
        { id: 3, name: 'Points to objects of interest' },
        { id: 4, name: 'Claps hands together' },
    ]);

    // State to manage the modal visibility and edit data
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentActivity, setCurrentActivity] = useState(null);
    const [newActivity, setNewActivity] = useState('');

    // Function to handle the opening of the modal
    const showModal = (editMode = false, activity = null) => {
        setIsEditMode(editMode);
        setCurrentActivity(activity);
        setNewActivity(editMode ? activity.name : '');
        setIsModalVisible(true);
    };

    // Function to handle the closing of the modal
    const handleCancel = () => {
        setIsModalVisible(false);
        setNewActivity('');
    };

    // Function to handle adding/editing activity
    const handleOk = () => {
        if (!newActivity.trim()) {
            message.error('Activity name cannot be empty!');
            return;
        }

        if (isEditMode) {
            // Edit mode: update the existing activity
            const updatedActivities = activities.map((activity) =>
                activity.id === currentActivity.id
                    ? { ...activity, name: newActivity }
                    : activity
            );
            setActivities(updatedActivities);
            message.success('Activity updated successfully!');
        } else {
            // Add new activity
            const newId = activities.length + 1;
            setActivities([...activities, { id: newId, name: newActivity }]);
            message.success('Activity added successfully!');
        }

        setIsModalVisible(false);
        setNewActivity('');
    };

    // Function to handle deleting an activity
    const handleDelete = (id) => {
        const updatedActivities = activities.filter((activity) => activity.id !== id);
        setActivities(updatedActivities);
        message.success('Activity deleted successfully!');
    };

    return (
        <div className="p-4">
            {/* Header with Add Button */}
            <div className='flex justify-between items-center mb-10'>
                <Link className='text-2xl flex items-center gap-2 font-bold text-[#344f47] hover:text-[#344f47]' to="/baby-cuse">
                    <FaArrowLeft /> Month 1
                </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
                <div className='border border-gray-300 pb-4 mb-4 p-5 rounded-lg shadow-md bg-white'>
                    <div className="flex justify-between items-center mb-4 bg-[#fef7ef] p-4 rounded-lg shadow-md">
                        <div>
                            <h2 className="text-2xl font-semibold">Movement</h2>
                            <p>Total (04)</p>
                        </div>
                        <button
                            className='bg-[#344f47] hover:bg-[#344f47] text-white font-bold py-4 px-4 rounded-full flex items-center gap-2'
                            onClick={() => showModal(false)}
                        >
                            <FaPlus className='text-2xl' />
                        </button>
                    </div>
                    {/* List of Activities */}
                    <div className='space-y-4'>
                        {activities.map((activity) => (
                            <div key={activity.id} className="flex justify-between items-center p-4 border-2 rounded-lg  border-gray-300">
                                <span>{activity.name}</span>
                                <div className="flex items-center space-x-3">
                                    <button className='h-10 w-10 flex items-center justify-center bg-[#344f47] rounded-full' onClick={() => showModal(true, activity)}>
                                        <RiEdit2Line className="text-lg text-white" />
                                    </button>
                                    <button className='h-10 w-10 flex items-center justify-center bg-[#344f47] rounded-full ' onClick={() => handleDelete(activity.id)}>
                                        <RiDeleteBin6Line className="text-lg text-white" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Modal for Adding and Editing Activities */}
            <Modal
                title={isEditMode ? 'Edit Activity' : 'Add New Activity'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <button className='bg-[#344f47] hover:bg-[#344f47] text-white font-bold py-2 px-4 rounded-lg' key="back" onClick={handleCancel}>
                        Cancel
                    </button>,
                    <button className='bg-[#344f47] hover:bg-[#344f47] ml-2 text-white font-bold py-2 px-4 rounded-lg' key="submit" type="primary" onClick={handleOk}>
                        {isEditMode ? 'Update' : 'Add'}
                    </button>,
                ]}
            >
                <Input
                    className='py-3'
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    placeholder="Enter activity name"
                />
            </Modal>
        </div>
    );
};

export default MilestoneDetails;

