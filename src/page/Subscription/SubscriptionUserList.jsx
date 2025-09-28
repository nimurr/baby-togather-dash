import { useEffect, useState } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { useGetAllSubscribersQuery } from "../../redux/features/subscription/subscription"; // API hooks
import Url from "../../redux/baseApi/forImageUrl";

const { Item } = Form;

const SubscriptionUserList = () => {
    const { data, isLoading } = useGetAllSubscribersQuery();  // Fetch the subscription data from API
    const fullData = data?.data?.attributes || [];
    console.log(fullData);


    const [searchText, setSearchText] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataSource, setDataSource] = useState([]); // Initialize with demo data
    useEffect(() => {
        if (fullData) {
            setDataSource(fullData);
        }
    }, [fullData]);

    // User details visibility state
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [userDataFull, setUserDataFull] = useState(null); // Store full user data for the selected user

    // Search Filter
    useEffect(() => {
        if (searchText.trim() === "") {
            setDataSource(fullData); // Reset to all users
        } else {
            setDataSource(
                fullData?.filter(
                    (user) =>
                        user?.userId?.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
                        user?.userId?.email.toLowerCase().includes(searchText.toLowerCase()) ||
                        String(user?.userId?.phoneNumber).includes(searchText)
                )
            );
        }
    }, [searchText]);

    // Date Filter
    useEffect(() => {
        if (!selectedDate) {
            setDataSource(fullData); // Reset to all users if no date is selected
        } else {
            const formattedDate = selectedDate.format("YYYY-MM-DD");
            setDataSource(
                fullData?.filter(
                    (user) => moment(user?.createdAt).format("YYYY-MM-DD") === formattedDate
                )
            );
        }
    }, [selectedDate]);

    const handleShowDetails = (user) => {
        setUserDataFull(user); // Set the selected user details
        setDetailsVisible(true); // Show user details section
    };

    const columns = [
        { title: "#SI", dataIndex: "si", key: "si", render: (text, record, index) => index + 1 },
        {
            title: "Full Name", dataIndex: "fullName", key: "fullName",
            render: (_, text) => (
                <span className="flex items-center gap-2">
                    <span>{text?.userId?.fullName}</span>
                </span>
            ),
        },
        { title: "Email", dataIndex: "email", key: "email", render: (_, text) => text?.userId?.email },
        { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber", render: (_, text) => text?.userId?.countryISOCode + " " + text?.userId?.phoneNumber },
        {
            title: "Joined Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => moment(date).format("DD MMM YYYY"),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div onClick={() => handleShowDetails(record)} className="cursor-pointer">
                    <IoEyeOutline className="text-2xl" />
                </div>
            ),
        },
    ];

    return (
        <section>
            <div className="md:flex justify-between items-center py-6 mb-4">
                <Link to={"/subscription"} className="text-2xl flex items-center">
                    <FaAngleLeft />  Subscriptions User list  {detailsVisible ? "Details" : ""}
                </Link>
                <Form layout="inline" className="flex space-x-4">
                    <Item name="date">
                        <DatePicker
                            className="rounded-md border border-[#344f47]"
                            onChange={(date) => setSelectedDate(date)}
                            placeholder="Select Date"
                        />
                    </Item>
                    <Item name="username">
                        <Input
                            className="rounded-md w-[70%] md:w-full border border-[#344f47]"
                            placeholder="User Name"
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Item>
                    <Item>
                        <button className="size-8 rounded-full flex justify-center items-center bg-[#344f47] text-black">
                            <IoIosSearch className="size-5" />
                        </button>
                    </Item>
                </Form>
            </div>

            <div className={`${detailsVisible ? "grid lg:grid-cols-2 gap-5" : "block"} duration-500`}>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: "#344f47",
                                headerColor: "#fff",
                                headerBorderRadius: 5,
                            },
                        },
                    }}
                >
                    <Table
                        pagination={{
                            position: ["bottomCenter"],
                            current: currentPage,
                            onChange: setCurrentPage,
                        }}
                        scroll={{ x: "max-content" }}
                        responsive={true}
                        columns={columns}
                        dataSource={dataSource}
                        rowKey="id"
                        loading={isLoading}
                    />
                </ConfigProvider>

                {/* User Details Section */}
                <div className={`${detailsVisible ? "block" : "hidden"} duration-500`}>
                    <div className=" w-full md:w-2/4 mx-auto border-2 border-[#344f47] p-2 rounded-lg relative">

                        <div onClick={() => setDetailsVisible(false)} className="absolute bg-[#344f47] text-white p-3 rounded-full -top-5 -left-5 cursor-pointer" >
                            <FaArrowLeft className="text-2xl" />
                        </div>
                        {/* User Profile Section */}
                        <div className="flex items-center justify-between gap-5 mb-5">
                            <div className="flex items-center gap-5">
                                <img
                                    className="w-24 h-24 rounded-full"
                                    src={Url + userDataFull?.userId?.image || "/logo/userimage.png"}
                                    alt="User"
                                />
                                <h1 className="text-2xl font-semibold">{userDataFull?.userId.fullName}</h1>
                            </div>
                        </div>

                        {/* User Details Section */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
                                <span className="font-semibold">Name</span>
                                <span>{userDataFull?.userId.fullName}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
                                <span className="font-semibold">Email</span>
                                <span>{userDataFull?.userId.email}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
                                <span className="font-semibold">Status</span>
                                <span>{userDataFull?.userId.status || "N/A"}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
                                <span className="font-semibold">Phone Number</span>
                                <span>{userDataFull?.userId.phoneNumber}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
                                <span className="font-semibold">User Type</span>
                                <span className="capitalize">{userDataFull?.userId.role}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
                                <span className="font-semibold">Joining Date</span>
                                <span>{moment(userDataFull?.userId.createdAt).format("DD MMM YYYY")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubscriptionUserList;
