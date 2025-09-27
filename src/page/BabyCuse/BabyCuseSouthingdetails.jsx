import React, { useState, useEffect } from 'react';
import { Modal, Input, message, Form, Upload } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useCreateBabucareMutation, useEditBabucareMutation, useDeleteBabucareMutation, useGetAllBabucareQuery } from '../../redux/features/babucare/babucare'; // API hooks
import Url from '../../redux/baseApi/forImageUrl';

const BabyCuseSouthingdetails = () => {
    const [babyCues, setBabyCues] = useState([]);
    const { data } = useGetAllBabucareQuery("SOOTHING"); // Fetch all baby cues
    const [createBabycare] = useCreateBabucareMutation(); // For creating new cue
    const [editBabycare] = useEditBabucareMutation(); // For editing an existing cue
    const [deleteBabucare] = useDeleteBabucareMutation(); // For deleting cue

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentCue, setCurrentCue] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setDescription] = useState('');
    const [image, setImage] = useState(null); // New state for image

    // Load cues from the API when data changes
    useEffect(() => {
        if (data?.data?.attributes) {
            setBabyCues(data?.data?.attributes);
        }
    }, [data]);

    // Open modal for adding a new baby cue
    const handleAddClick = () => {
        setIsEditMode(false);
        setTitle('');
        setDescription('');
        setImage(null); // Clear the image
        setIsModalVisible(true);
    };

    // Open modal for editing an existing baby cue
    const handleEditClick = (cue) => {
        setIsEditMode(true);
        setCurrentCue(cue);
        setTitle(cue.title);
        setDescription(cue.content);
        setImage(cue.image); // Set the image for edit
        setIsModalVisible(true);
    };

    // Handle delete action
    const handleDeleteClick = async (id) => {
        try {
            const res = await deleteBabucare(id);
            if (res?.data?.code === 200) {
                message.success(res?.data?.message);
            }
        } catch (error) {
            message.error('Error deleting the cue!');
            console.log(error);
        }
    };

    // Handle modal submit (add or edit)
    const handleModalSubmit = async () => {
        if (!title || !content) {
            message.error('Please provide both title and content.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', 'SOOTHING');
        if (image.originFileObj) {
            formData.append('image', image.originFileObj); // Append the actual file object
        }

        try {
            if (isEditMode) {
                // Edit existing cue
                const res = await editBabycare({ id: currentCue._id, data: formData });
                if (res?.data?.code === 200) {
                    message.success(res?.data?.message);
                }
            } else {
                // Add new cue
                const res = await createBabycare(formData);
                if (res?.data?.code === 201) {
                    message.success(res?.data?.message);
                }
            }
        } catch (error) {
            console.log(error);
            message.error('An error occurred.');
        }

        setIsModalVisible(false);
    };

    // Modal cancel
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Handle image upload (Dragger component)
    const handleImageChange = ({ fileList }) => {
        setImage(fileList[0]); // Set the image after file upload
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Link
                    className="text-2xl font-bold text-[#344f47] hover:text-[#344f47] flex items-center gap-2"
                    to="/baby-cuse"
                >
                    <FaArrowLeft />
                    <h1>Soothing</h1>
                </Link>
                <button
                    onClick={handleAddClick}
                    className="bg-[#344f47] text-white font-bold py-3 px-10 rounded-lg"
                >
                    Add Soothing 
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-start gap-4">
                {babyCues.map((cue) => (
                    <div
                        key={cue.id}
                        className="border-2 border-[#f9e4c8] shadow-lg p-2 rounded-lg hover:bg-[#f3f3f3] cursor-pointer"
                    >
                        <div className="mb-4 flex items-center">
                            <img
                                src={Url + cue.image}
                                alt={cue.title}
                                className="w-full  object-cover mr-2 border"
                            />
                        </div>
                        <div className='text-center my-4'>
                            <h3 className="text-3xl font-semibold text-[#344f47]">{cue.title}</h3>
                            <p className="text-sm text-gray-500 mt-2">{cue.content}</p>
                        </div>

                        <hr className="my-2" />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => handleEditClick(cue)}
                                className="text-white h-10 w-10 bg-[#344f47] rounded-full flex items-center justify-center hover:bg-[#2c3e50] transition-colors duration-200"
                            >
                                <RiEdit2Line size={20} />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(cue._id)}
                                className="text-white h-10 w-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                            >
                                <RiDeleteBin6Line size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Add/Edit Baby Cue */}
            <Modal
                title={isEditMode ? 'Edit Soothing' : 'Add Soothing'}
                visible={isModalVisible}
                onOk={handleModalSubmit}
                onCancel={handleCancel}
                footer={[
                    <button
                        key="submit"
                        onClick={handleModalSubmit}
                        className="bg-[#344f47] text-white font-bold py-3 px-10 rounded-lg"
                    >
                        {isEditMode ? 'Update' : 'Add'}
                    </button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Title" required>
                        <Input
                            className="py-3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter baby cue title"
                        />
                    </Form.Item>

                    <Form.Item label="content" required>
                        <Input.TextArea
                            className="py-3"
                            value={content}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="Enter baby cue content"
                        />
                    </Form.Item>

                    <Form.Item label="Upload Image" required>
                        <Upload.Dragger
                            name="file"
                            listType="picture-card"
                            beforeUpload={() => false} // Prevent auto upload
                            onChange={handleImageChange}
                            showUploadList={false}
                        >
                            <p className="ant-upload-drag-icon flex items-center justify-center">
                                <IoCloudUploadOutline size={40} />
                            </p>
                            <p className="ant-upload-text">
                                {image ? 'Change Image' : 'Click or drag image to this area to upload'}
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BabyCuseSouthingdetails;
