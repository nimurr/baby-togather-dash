import React, { useState, useEffect } from 'react';
import { Modal, Input, message, Form, Upload } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { IoCloudUploadOutline, IoSearch } from 'react-icons/io5';
import { useCreateBabucareMutation, useEditBabucareMutation, useDeleteBabucareMutation, useGetAllBabucareQuery } from '../../redux/features/babucare/babucare';
import Url from '../../redux/baseApi/forImageUrl';

const BabyCuseSouthingdetails = () => {
    const [babyCues, setBabyCues] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { data } = useGetAllBabucareQuery("Soothing");
    const [createBabycare] = useCreateBabucareMutation();
    const [editBabycare] = useEditBabucareMutation();
    const [deleteBabucare] = useDeleteBabucareMutation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentCue, setCurrentCue] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [fileList, setFileList] = useState([]); // Controlled fileList state

    // Load cues from API
    useEffect(() => {
        if (data?.data?.attributes) {
            setBabyCues(data?.data?.attributes?.results);
        }
    }, [data]);

    const handleAddClick = () => {
        setIsEditMode(false);
        setTitle('');
        setDescription('');
        setImage(null);
        setFileList([]); // reset file list
        setIsModalVisible(true);
    };

    const handleEditClick = (cue) => {
        setIsEditMode(true);
        setCurrentCue(cue);
        setTitle(cue.title);
        setDescription(cue.content);
        setImage(cue.image);
        // If editing, prefill fileList with existing image
        setFileList(cue.image ? [{ uid: '-1', name: 'image', status: 'done', url: Url + cue.image }] : []);
        setIsModalVisible(true);
    };

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

    const handleModalSubmit = async () => {
        if (!title || !content) {
            message.error('Please provide both title and content.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', 'SOOTHING');
        if (image?.originFileObj) formData.append('image', image.originFileObj);

        try {
            if (isEditMode) {
                const res = await editBabycare({ id: currentCue.id, data: formData });
                if (res?.data?.code === 200) {
                    message.success(res?.data?.message);
                    setIsModalVisible(false);
                    resetForm();
                }
            } else {
                const res = await createBabycare(formData);
                setImage(null);
                if (res?.data?.code === 201) {
                    message.success(res?.data?.message);
                    setIsModalVisible(false);
                    resetForm();
                }
            }
        } catch (error) {
            console.log(error);
            message.error('An error occurred.');
        }
    };

    const handleCancel = () => setIsModalVisible(false);

    const handleImageChange = ({ fileList }) => {
        setFileList(fileList);
        setImage(fileList[0] || null);
    };

    // Reset form after successful submit
    const resetForm = () => {
        setCurrentCue(null);
        setTitle('');
        setDescription('');
        setImage(null);
        setFileList([]);
        setIsEditMode(false);
    };

    // Filter cues based on search query
    const filteredCues = babyCues.filter(cue =>
        cue.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Link className="text-2xl font-bold text-[#344f47] flex items-center gap-2" to="/baby-cuse">
                    <FaArrowLeft />
                    <h1>Soothing</h1>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Search Field */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by title..."
                            className="border border-[#344f47] px-4 py-2 rounded-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <IoSearch className="absolute right-4 top-3" />
                    </div>

                    <button
                        onClick={handleAddClick}
                        className="bg-[#344f47] text-white font-bold py-3 px-10 rounded-lg"
                    >
                        Add Soothing
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-start gap-4">
                {filteredCues?.map((cue) => (
                    <div key={cue.id} className="border-2 border-[#f9e4c8] shadow-lg p-2 rounded-lg hover:bg-[#f3f3f3] cursor-pointer">
                        <div className="mb-4 flex items-center">
                            <img src={Url + cue.image} alt={cue.title} className="w-full object-cover mr-2 border" />
                        </div>
                        <div className="text-center my-4">
                            <h3 className="text-3xl font-semibold text-[#344f47]">{cue.title}</h3>
                            <p className="text-sm text-gray-500 mt-2">{cue.content}</p>
                        </div>

                        <hr className="my-2" />

                        <div className="flex justify-end gap-2">
                            <button onClick={() => handleEditClick(cue)} className="text-white h-10 w-10 bg-[#344f47] rounded-full flex items-center justify-center hover:bg-[#2c3e50] transition-colors duration-200">
                                <RiEdit2Line size={20} />
                            </button>
                            <button onClick={() => handleDeleteClick(cue.id)} className="text-white h-10 w-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200">
                                <RiDeleteBin6Line size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Add/Edit */}
            <Modal title={isEditMode ? 'Edit Soothing' : 'Add Soothing'} visible={isModalVisible} onOk={handleModalSubmit} onCancel={handleCancel} footer={[
                <button key="submit" onClick={handleModalSubmit} className="bg-[#344f47] text-white font-bold py-3 px-10 rounded-lg">
                    {isEditMode ? 'Update' : 'Add'}
                </button>,
            ]}>
                <Form layout="vertical">
                    <Form.Item label="Title" required>
                        <Input className="py-3" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter baby cue title" />
                    </Form.Item>

                    <Form.Item label="Content" required>
                        <Input.TextArea className="py-3" value={content} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Enter baby cue content" />
                    </Form.Item>

                    <Form.Item label="Upload Image" required>
                        <Upload.Dragger name="file" listType="picture-card" beforeUpload={() => false} onChange={handleImageChange} fileList={fileList} showUploadList={false}>
                            <p className="ant-upload-drag-icon flex items-center justify-center"><IoCloudUploadOutline size={40} /></p>
                            <p className="ant-upload-text">{fileList.length > 0 ? 'Change Image' : 'Click or drag image to this area to upload'}</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BabyCuseSouthingdetails;