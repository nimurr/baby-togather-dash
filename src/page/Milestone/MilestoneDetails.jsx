

import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import { useCreateNewTaskMutation, useDeleteTaskMutation, useEditTaskMutation, useGetAlltasksQuery, useGetFullCetegoryDetailsQuery } from '../../redux/features/milestone/milestone';

const MilestoneDetails = () => {

    const { id } = useParams();

    const { data: detialsData } = useGetFullCetegoryDetailsQuery(id);
    console.log(detialsData?.data?.attributes?.name)

    const { data, refetch, isLoading } = useGetAlltasksQuery(id);
    const movmentFullData = data?.data?.Movement;
    const socialFullData = data?.data?.Social;
    const cognitiveFullData = data?.data?.Cognitive;
    const communicationFullData = data?.data?.Communication;


    const [createTask] = useCreateNewTaskMutation();


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
    const [updateData, setUpdateData] = useState({});
    const [deleteTaks] = useDeleteTaskMutation();
    const [tasks, setTasks] = useState('');
    // Function to handle adding/editing activity
    const handleOk = async () => {


        if (isEditMode) {
            // edit existing activity
            const data = {
                // category: updateData.id,
                type: updateData.type,
                task: newActivity
            }

            try {
                const res = await updateTask({ id: updateData.id, data }).unwrap();
                console.log(res)
                if (res?.code === 200) {
                    message.success(res?.message);
                    refetch();
                }
            } catch (error) {
                console.log(error)
                message.error(error?.data?.message);
            }

        } else {
            const data = {
                category: id,
                type: tasks,
                task: newActivity
            }
            try {
                const res = await createTask(data).unwrap();
                if (res?.code === 201) {
                    message.success(res?.message);
                    refetch();
                } else {
                    message.error(res?.message);
                }
            } catch (error) {
                console.log(error)
                message.error(error?.data?.message);
            }


        }

        setIsModalVisible(false);
        setNewActivity('');
    };


    // Function to handle deleting an activity
    const handleDelete = async (id) => {

        try {
            const res = await deleteTaks(id);
            if (res?.data?.code === 200) {
                message.success(res?.data?.message);
                refetch();
            }

        } catch (error) {
            console.log(error)
            message.error(error?.data?.message);
        }
    };

    const [updateTask] = useEditTaskMutation();

    const handleUpdate = async ({ id, type, name }) => {
        setIsEditMode(true);
        setNewActivity(name);
        showModal(true, { id, type, name });
        setUpdateData({ id, type });

    }

    return (
        <div className="p-4">
            {/* Header with Add Button */}
            <div className='flex justify-between items-center mb-10'>
                <Link className='text-2xl flex items-center gap-2 font-bold text-[#344f47] hover:text-[#344f47]' to="/milestone">
                    <FaArrowLeft /> {detialsData?.data?.attributes?.name ? detialsData?.data?.attributes?.name : "No Name"}
                </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-4 mb-4'>
                {
                    [...Array(4)].map((_, index) => (
                        <div className='border border-gray-300 pb-4 mb-4 p-5 rounded-lg shadow-md bg-white'>
                            <div className="flex justify-between items-center mb-4 bg-[#fef7ef] p-4 rounded-lg shadow-md">
                                <div>
                                    <h2 className="text-2xl font-semibold"> {index == 0 ? "Movement" : index == 1 ? "Social" : index == 2 ? "Cognitive" : "Communication"} </h2>
                                    {/* <p>Total (04)</p> */}
                                </div>
                                <button
                                    className='bg-[#344f47] hover:bg-[#344f47] text-white font-bold py-4 px-4 rounded-full flex items-center gap-2'
                                    onClick={() => {
                                        showModal(false);
                                        setTasks(index == 0 ? "Movement" : index == 1 ? "Social" : index == 2 ? "Cognitive" : "Communication");
                                    }}
                                >
                                    <FaPlus className='text-2xl' />
                                </button>
                            </div>
                            {/* List of Activities */}
                            <div div className='space-y-4' >
                                {
                                    index == 0 && movmentFullData?.map((activity) => (
                                        <div key={activity.id} className="flex justify-between items-center p-4 border-2 rounded-lg  border-gray-300">

                                            <span>{activity?.task}</span>
                                            <div className="flex items-center space-x-3">
                                                <button className='h-10 w-10 flex items-center justify-center bg-[#344f47] rounded-full' onClick={() => handleUpdate({ id: activity.id, type: index == 0 ? "Movement" : index == 1 ? "Social" : index == 2 ? "Cognitive" : "Communication", name: activity.task })}>
                                                    <RiEdit2Line className="text-lg text-white" />
                                                </button>
                                                <button className='h-10 w-10 flex items-center justify-center bg-[#344f47] rounded-full ' onClick={() => handleDelete(activity.id)}>
                                                    <RiDeleteBin6Line className="text-lg text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    index == 1 && socialFullData?.map((activity) => (
                                        <div key={activity.id} className="flex justify-between items-center p-4 border-2 rounded-lg  border-gray-300">

                                            <span>{activity?.task}</span>
                                            <div className="flex items-center space-x-3">
                                                <button className='h-10 w-10 flex items-center justify-center bg-[#344f47] rounded-full' onClick={() => handleUpdate({ id: activity.id, type: index == 0 ? "Movement" : index == 1 ? "Social" : index == 2 ? "Cognitive" : "Communication", name: activity.task })}>
                                                    <RiEdit2Line className="text-lg text-white" />
                                                </button>
                                                <button className='h-10 w-10 flex items-center justify-center bg-[#344f47] rounded-full ' onClick={() => handleDelete(activity.id)}>
                                                    <RiDeleteBin6Line className="text-lg text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }

                                {
                                    index == 2 && cognitiveFullData?.map((activity) => (
                                        <div key={activity.id} className="flex justify-between items-center p-4 border-2 rounded-lg  border-gray-300">
                                            <span>{activity?.task}</span>
                                            <div className="flex items-center space-x-3">
                                                <button className='h-10 w-10 flex items-center justify-center bg-[#344f47] rounded-full' onClick={() => handleUpdate({ id: activity.id, type: index == 0 ? "Movement" : index == 1 ? "Social" : index == 2 ? "Cognitive" : "Communication", name: activity.task })}>
                                                    <RiEdit2Line className="text-lg text-white" />
                                                </button>
                                                <button className='h-10 w-10 flex items-center justify-center bg-[#344f47] rounded-full ' onClick={() => handleDelete(activity.id)}>
                                                    <RiDeleteBin6Line className="text-lg text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    index == 3 && communicationFullData?.map((activity) => (
                                        <div key={activity.id} className="flex justify-between items-center p-4 border-2 rounded-lg  border-gray-300">

                                            <span>{activity?.task}</span>
                                            <div className="flex items-center space-x-3">
                                                <button className='h-10 w-10 flex items-center justify-center bg-[#344f47] rounded-full' onClick={() => handleUpdate({ id: activity.id, type: index == 0 ? "Movement" : index == 1 ? "Social" : index == 2 ? "Cognitive" : "Communication", name: activity.task })}>
                                                    <RiEdit2Line className="text-lg text-white" />
                                                </button>
                                                <button className='h-10 w-10 flex items-center justify-center bg-[#344f47] rounded-full ' onClick={() => handleDelete(activity.id)}>
                                                    <RiDeleteBin6Line className="text-lg text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    isLoading &&
                                    <div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
                                        <div class="flex animate-pulse space-x-4">
                                            <div class="size-10 rounded-full bg-gray-200"></div>
                                            <div class="flex-1 space-y-6 py-1">
                                                <div class="h-2 rounded bg-gray-200"></div>
                                                <div class="space-y-3">
                                                    <div class="grid grid-cols-3 gap-4">
                                                        <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                                                        <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                                                    </div>
                                                    {/* <div class="h-2 rounded bg-gray-200"></div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    ))
                }

            </div >


            {/* Modal for Adding and Editing Activities */}
            < Modal
                title={isEditMode ? 'Edit Activity' : 'Add New Activity'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={
                    [
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
            </Modal >
        </div >
    );
};

export default MilestoneDetails;

