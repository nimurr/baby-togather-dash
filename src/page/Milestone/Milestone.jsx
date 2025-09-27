 

import { message, Modal, Input } from 'antd';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Milestone = () => {
    const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
    const [monthName, setMonthName] = useState(''); // State to manage the month input

    const handleDeleter = () => {
        // Handle the delete action here
        console.log("Delete button clicked");
        message.success('Month deleted successfully!');
    }

    const showModal = () => {
        setIsModalVisible(true); // Show the modal
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Close the modal
    };

    const handleOk = () => {
        // Logic for adding a new month
        if (!monthName) {
            message.error('Please enter a month name!');
            return;
        }
        console.log("New Month Added:", monthName);
        message.success('New Month added successfully!');
        setMonthName(''); // Reset the month name
        setIsModalVisible(false); // Close the modal
    };

    return (
        <div>
            <div className='flex justify-between items-center p-4 '>
                <Link className='text-2xl font-bold text-[#344f47] hover:text-[#344f47] flex items-center gap-2' to="/milestone">
                    <FaArrowLeft />Baby's Journey
                </Link>
                <div>
                    <button onClick={showModal} className='bg-[#344f47] hover:bg-[#344f47] text-white font-bold py-3 px-10 rounded-lg'>
                        Add Month
                    </button>
                </div>
            </div>

            <div className='flex flex-wrap gap-4 p-4 '>
                {
                    [...Array(6)].map((_, i) => (
                        <Link to={`/milestone/${i + 1}`} key={i} className='h-[140px] relative group rounded-lg w-[140px] border border-[#344f47] cursor-pointer hover:bg-[#344f47] flex items-center justify-center'>
                            <h1 className='text-xl font-semibold text-[#344f47] group-hover:text-white px-4'>Month {i + 1}</h1>
                            <Link to={`/milestone`} onClick={handleDeleter} className='absolute bottom-1 w-8 h-8 bg-white rounded-full left-1/2 items-center justify-center transform -translate-x-1/2 hidden group-hover:flex'>
                                <RiDeleteBin6Line className=' text-[#344f47] group-hover:text-[#344f47]' />
                            </Link>
                        </Link>
                    ))
                }
            </div>

            {/* Modal for adding a new month */}
            <Modal
                title="Add New Month"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                // okText="Add Month"
                // cancelText="Cancel"
                footer={null}
            >
                <div>
                    <Input
                        className='py-3 px-4 border border-[#344f47] rounded-lg w-full'
                        value={monthName}
                        onChange={(e) => setMonthName(e.target.value)} // Update month name on input change
                        placeholder="Enter month name"
                    />
                    <div className='flex justify-end mt-4'>
                        <button className='bg-[#344f47] hover:bg-[#344f47] text-white font-bold py-3 px-10 rounded-lg'>Add Month </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Milestone;
