import React, { useEffect, useState } from 'react';
import { Modal, Input, message, Form, Upload } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useCreateBabucareMutation, useDeleteBabucareMutation, useEditBabucareMutation, useGetAllBabucareQuery } from '../../redux/features/babucare/babucare';
import Url from '../../redux/baseApi/forImageUrl';

const BabyCusedetails = () => {
    const [babyCues, setBabyCues] = useState([]);

    const { data } = useGetAllBabucareQuery("BABY_CUES");
    const fullData = data?.data?.attributes;
    useEffect(() => {
        if (fullData) {
            setBabyCues(fullData);
        }
    }, [fullData]);

    const [createBabycare] = useCreateBabucareMutation();
    const [editBabycare] = useEditBabucareMutation(); // Edit mutation hook
    const [deleteBabucare] = useDeleteBabucareMutation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentCue, setCurrentCue] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setDescription] = useState('');
    const [image, setImage] = useState(null); // New state for image

    // Open modal for adding a new baby cue
    const handleAddClick = () => {
        setIsEditMode(false);
        setTitle('');
        setDescription('');
        setImage(null); // Clear the image
        setIsModalVisible(true);
    };

    // Open modal for editing a baby cue
    const handleEditClick = (cue) => {
        setIsEditMode(true);
        setCurrentCue(cue);
        setTitle(cue.title);
        setDescription(cue.content); // Adjusted from 'description' to 'content'
        setImage(cue.image); // Set the image for edit
        setIsModalVisible(true);
    };

    // Handle delete action
    const handleDeleteClick = async (cue) => {
        try {
            const res = await deleteBabucare(cue._id);
            if (res?.data?.code === 200) {
                message.success(res?.data?.message);
            }
        } catch (error) {
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
        formData.append('category', 'BABY_CUES');
        if (image) {
            formData.append('image', image.originFileObj); // Append the actual file object
        }

        try {
            if (isEditMode) {
                // Edit mode
                const res = await editBabycare({ id: currentCue._id, data: formData });
                console.log(res);
                if (res.data?.code === 200) {
                    message.success(res.data?.message);
                }
            } else {
                // Add new cue
                const res = await createBabycare(formData);
                if (res.data?.code === 201) {
                    message.success(res.data?.message);
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
                    <h1>Baby Cues</h1>
                </Link>
                <button
                    onClick={handleAddClick}
                    className="bg-[#344f47] text-white font-bold py-3 px-10 rounded-lg"
                >
                    Add Baby Cue
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-4">
                {babyCues.map((cue) => (
                    <div
                        key={cue.id}
                        className="border-2 border-[#344f47] shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 rounded-lg hover:bg-[#f3f3f3] cursor-pointer"
                    >
                        <div>
                            <h3 className="text-xl mb-3 font-semibold text-[#344f47] flex items-center gap-2">
                                <img
                                    src={Url + cue.image}
                                    alt={cue.title}
                                    className="w-8 object-cover rounded-lg"
                                />
                                {cue.title}
                            </h3>
                            <p className="text-sm text-gray-500">{cue.content}</p>
                        </div>

                        <hr className="my-2" />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => handleEditClick(cue)}
                                className="text-[#fff] h-10 w-10 bg-[#344f47] rounded-full flex items-center justify-center hover:bg-[#2c3e50] transition-colors duration-200"
                            >
                                <RiEdit2Line size={20} />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(cue)}
                                className="text-[#fff] h-10 w-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                            >
                                <RiDeleteBin6Line size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Add/Edit Baby Cue */}
            <Modal
                title={isEditMode ? 'Edit Baby Cue' : 'Add Baby Cue'}
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

                    <Form.Item label="Content" required>
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
                                {image ? 'Image Uploaded! Click to Change Image' : 'Click or drag image to this area to upload'}
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BabyCusedetails;