import { useEffect, useState } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";

const { Item } = Form;

const Users = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: mainData, isLoading } = useGetAllUsersQuery({ page, limit });
  const data = mainData?.data?.attributes?.results || [];
  const total = mainData?.data?.attributes?.totalResults; // total results, used for calculating pages
  const totalPages = mainData?.data?.attributes?.totalPages; // total pages, used for pagination

  useEffect(() => {
    if (data) {
      setDataSource(data);
    }
  }, [data]);

  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);

  // User details visibility state
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [userDataFull, setUserDataFull] = useState(null);

  // Search Filter
  useEffect(() => {
    if (searchText.trim() === "") {
      setDataSource(data);
    } else {
      setDataSource(
        data?.filter(
          (user) =>
            user.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
            String(user.phoneNumber).includes(searchText)
        )
      );
    }
  }, [searchText]);

  // Date Filter
  useEffect(() => {
    if (!selectedDate) {
      setDataSource(data);
    } else {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      setDataSource(
        data?.filter(
          (user) => moment(user.createdAt).format("YYYY-MM-DD") === formattedDate
        )
      );
    }
  }, [selectedDate]);

  const handleShowDetails = (user) => {
    setUserDataFull(user);
    setDetailsVisible(true);
  };

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
    setCurrentPage(newPage);  // This will update the pagination component's page state
  };

  const columns = [
    { title: "#SI", dataIndex: "si", key: "si", render: (_, __, index) => index + 1 },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber", render: (_, text) =>
        text?.countryISOCode + " " + text?.phoneNumber || 'N/A'
    },
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
        <Link to={"/"} className="text-2xl flex items-center">
          <FaAngleLeft />  Renter User list  {detailsVisible ? "Details" : ""}
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
            <button className="size-8 rounded-full flex justify-center items-center bg-[#344f47] text-white">
              <IoIosSearch className="size-5" />
            </button>
          </Item>
        </Form>
      </div>

      <div className={`${detailsVisible ? "grid xl:grid-cols-2 gap-5" : "block"} duration-500`}>
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
            loading={isLoading}
            pagination={{
              position: ["bottomRight"],
              current: currentPage,
              pageSize: limit,
              total: total, // total number of results
              onChange: handlePaginationChange, // This will trigger API call on page change
            }}
            scroll={{ x: "max-content" }}
            responsive={true}
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
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
                  src="../../../public/logo/userimage.png"
                  alt="User"
                />
                <h1 className="text-2xl font-semibold">{userDataFull?.fullName}</h1>
              </div>

            </div>

            {/* User Details Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">Name</span>
                <span>{userDataFull?.fullName}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">Email</span>
                <span>{userDataFull?.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">Status</span>
                <span>{userDataFull?.status || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">Phone Number</span>
                <span>{userDataFull?.phoneNumber}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">User Type</span>
                <span className="capitalize">{userDataFull?.role}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">Joining Date</span>
                <span>{moment(userDataFull?.createdAt).format("DD MMM YYYY")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
