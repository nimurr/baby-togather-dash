

import { message, Modal, Input } from 'antd';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useCreateCategoriesForBabyMutation, useDeleteCategoriesForBabyMutation, useGetAllMilestoneQuery } from '../../redux/features/milestone/milestone';

const Milestone = () => {

    const { data, isLoading, refetch } = useGetAllMilestoneQuery({ name: "Month", type: "babyJourney" });
    const milestones = data?.data?.attributes?.results;
    console.log(milestones)

    const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
    const [monthName, setMonthName] = useState(''); // State to manage the month input


    const [deleteItem] = useDeleteCategoriesForBabyMutation();
    const handleDeleter = async (id) => {
        try {
            const res = await deleteItem(id);
            console.log(res);
            if (res?.data?.code === 200) {
                message.success(res?.data?.message);
                refetch();
            }
            else {
                message.error(res?.error?.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const showModal = () => {
        setIsModalVisible(true); // Show the modal
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Close the modal
    };



    const [createCategory] = useCreateCategoriesForBabyMutation();

    const handleOk = async () => {
        // Logic for adding a new month
        if (!monthName) {
            message.error('Please enter a month name!');
            return;
        }
        try {
            const res = await createCategory({ name: monthName, type: "babyJourney" });

            if (res?.data?.code === 201) {
                message.success(res?.data?.message);
                refetch();
                setMonthName(''); // Reset the month name
                setIsModalVisible(false); // Close the modal
            }
            else if (res?.data?.code !== 201) {
                message.error(res?.error?.data?.message);
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong!');
        }
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
                    milestones?.map((item, i) => (
                        <Link to={`/milestone/${item?.id}`} key={i} className='h-[140px] relative group rounded-lg w-[140px] border border-[#344f47] cursor-pointer hover:bg-[#344f47] flex items-center justify-center'>
                            <h1 className='text-xl font-semibold text-[#344f47] group-hover:text-white px-4'> {item?.name}</h1>
                            <Link to={`/milestone`} onClick={() => handleDeleter(item?.id)} className='absolute bottom-1 w-8 h-8 bg-white rounded-full left-1/2 items-center justify-center transform -translate-x-1/2 hidden group-hover:flex'>
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
                        <button onClick={handleOk} className='bg-[#344f47] hover:bg-[#344f47] text-white font-bold py-3 px-10 rounded-lg'>Add Month </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Milestone;
