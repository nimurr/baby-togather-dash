import React, { useState, useEffect } from 'react';
import { Modal, Input, message, Form, Upload } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { IoCloudUploadOutline, IoSearch } from 'react-icons/io5';
import { FaCirclePlay } from 'react-icons/fa6';
import { useCreateBabucareMutation, useEditBabucareMutation, useDeleteBabucareMutation, useGetAllBabucareQuery } from '../../redux/features/babucare/babucare'; // API hooks
import Url from '../../redux/baseApi/forImageUrl'; // To handle image URLs

const BabyCuseSounddetails = () => {
    const [babyCues, setBabyCues] = useState([]);
    const [filteredCues, setFilteredCues] = useState([]); // To store filtered cues
    const [searchQuery, setSearchQuery] = useState(''); // To store search query

    const { data } = useGetAllBabucareQuery("CALM_SPACE"); // Fetch all baby sound cues
    const [createBabycare] = useCreateBabucareMutation(); // For creating new cue
    const [editBabycare] = useEditBabucareMutation(); // For editing an existing cue
    const [deleteBabucare] = useDeleteBabucareMutation(); // For deleting cue

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentCue, setCurrentCue] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [audio, setAudio] = useState(null); // New state for audio file

    // Load cues from the API when data changes
    useEffect(() => {
        if (data?.data?.attributes) {
            setBabyCues(data?.data?.attributes); // Set the cues fetched from API
            setFilteredCues(data?.data?.attributes); // Initially show all cues
        }
    }, [data]);

    // Open modal for adding a new baby cue
    const handleAddClick = () => {
        setIsEditMode(false);
        setTitle('');
        setContent('');
        setAudio(null); // Clear the audio
        setIsModalVisible(true);
    };

    // Open modal for editing an existing baby cue
    const handleEditClick = (cue) => {
        setIsEditMode(true);
        setCurrentCue(cue);
        setTitle(cue.title);
        setContent(cue.content);
        setAudio(cue.audio); // Set the audio for edit
        setIsModalVisible(true);
    };

    // Handle delete action
    const handleDeleteClick = async (id) => {
        try {
            const res = await deleteBabucare(id); // Call the delete mutation
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
        formData.append('category', 'CALM_SPACE');
        if (audio.originFileObj) {
            formData.append('audio', audio.originFileObj); // Append the actual audio file
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

    // Handle audio file upload
    const handleAudioChange = ({ fileList }) => {
        setAudio(fileList[0]); // Set the audio file after upload
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter cues based on the search query (title search)
        const filtered = babyCues.filter((cue) =>
            cue.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCues(filtered);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Link
                    className="text-2xl font-bold text-[#344f47] hover:text-[#344f47] flex items-center gap-2"
                    to="/baby-cuse"
                >
                    <FaArrowLeft />
                    <h1>All Calm Space</h1>
                </Link>
                <div className="flex items-center gap-4">
                    {/* Search input field */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by title..."
                            className="border border-[#344f47] px-4 py-2 rounded-full"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <div>
                            <IoSearch className="absolute right-4 top-3" />
                        </div>
                    </div>

                    <button
                        onClick={handleAddClick}
                        className="bg-[#344f47] text-white font-bold py-3 px-10 rounded-lg"
                    >
                        Add Calm Space
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-4">
                {filteredCues.map((cue) => (
                    <div
                        key={cue.id}
                        className="border-2 border-[#344f47] shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 rounded-2xl hover:bg-[#344f4718] cursor-pointer"
                    >
                        <div className="flex gap-4 items-start justify-between mb-4">
                            <img
                                className="w-20"
                                src="/category/Rectangle31555.png"
                                alt=""
                            />
                            <div>
                                <h3 className="text-2xl font-semibold text-[#344f47] ">
                                    {cue.title}
                                </h3>
                                <p className="text-sm text-gray-500">{cue.content}</p>
                                {cue.audio && (
                                    <audio controls className="min-w-48 max-w-60">
                                        <source src={Url + cue.audio} type="audio/mp3" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}
                            </div>
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
                                onClick={() => handleDeleteClick(cue._id)}
                                className="text-[#fff] h-10 w-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                            >
                                <RiDeleteBin6Line size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Add/Edit Sound Cue */}
            <Modal
                title={isEditMode ? 'Edit Sound Cue' : 'Add Sound Cue'}
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
                            placeholder="Enter sound cue title"
                        />
                    </Form.Item>

                    <Form.Item label="Content" required>
                        <Input.TextArea
                            className="py-3"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            placeholder="Enter sound cue content"
                        />
                    </Form.Item>

                    <Form.Item label="Upload Audio" required>
                        <Upload.Dragger
                            name="file"
                            listType="picture-card"
                            beforeUpload={() => false} // Prevent auto upload
                            onChange={handleAudioChange}
                            showUploadList={false}
                        >
                            <p className="ant-upload-drag-icon flex items-center justify-center">
                                <IoCloudUploadOutline size={40} />
                            </p>
                            <p className="ant-upload-text">
                                {audio ? 'Change Audio' : 'Click or drag audio to this area to upload'}
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BabyCuseSounddetails;
