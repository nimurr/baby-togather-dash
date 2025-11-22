import { Pagination } from "antd";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import moment from "moment";

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Demo Data (Replace with your actual API data)
  const allNotification = {
    notifications: [
      {
        id: 1,
        message: "Your apartment unit has been successfully added!",
        createdAt: "2023-06-18T12:30:00Z",
      },
      {
        id: 2,
        message: "New payment received for Studio 1 unit.",
        createdAt: "2023-06-19T14:45:00Z",
      },
      {
        id: 3,
        message: "Your rental agreement for Penthouse 2 has been approved.",
        createdAt: "2023-06-20T16:10:00Z",
      },
      {
        id: 4,
        message: "New tenant has moved into the 3 Bedroom unit.",
        createdAt: "2023-06-21T09:00:00Z",
      },
      {
        id: 5,
        message: "You have a pending maintenance request for Studio 4.",
        createdAt: "2023-06-22T11:15:00Z",
      },
      {
        id: 6,
        message: "Reminder: Rent payment is due tomorrow for Studio 3.",
        createdAt: "2023-06-23T08:30:00Z",
      },
      {
        id: 7,
        message: "The new rental policy has been updated in your dashboard.",
        createdAt: "2023-06-24T10:00:00Z",
      },
      {
        id: 8,
        message: "Your tenant has requested a lease extension for Studio 2.",
        createdAt: "2023-06-25T12:45:00Z",
      },
      {
        id: 9,
        message: "The maintenance issue for Studio 1 has been resolved.",
        createdAt: "2023-06-26T13:30:00Z",
      },
      {
        id: 10,
        message: "You have received a 5-star rating from your tenant in Penthouse 1.",
        createdAt: "2023-06-27T14:00:00Z",
      },
      {
        id: 11,
        message: "Your lease renewal for 2 Bedroom unit is due in 30 days.",
        createdAt: "2023-06-28T09:30:00Z",
      },
      {
        id: 12,
        message: "Reminder: Please update your contact information in the system.",
        createdAt: "2023-06-29T15:15:00Z",
      },
    ],
  };

  const pageSize = 10; // Show 5 notifications per page

  // Pagination Logic
  const paginatedNotifications = allNotification?.notifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <Link to={"/"} className="text-2xl flex items-center mb-4">
        <FaAngleLeft /> Notification
      </Link>

      <div className="space-y-2">
        {paginatedNotifications?.map((item) => (
          <div
            key={item.id}
            className="border border-[#344f47] hover:bg-[#344f473b] cursor-pointer rounded-md p-1 flex items-center space-x-4"
          >
            <div className="text-[#344f47] border border-[#344f47] rounded-full p-1">
              <span className="bg-[#344f47] p-1 rounded-full absolute ml-3.5 z-20"></span>
              <IoMdNotificationsOutline size={25} className="relative" />
            </div>
            <div>
              <p className="font-semibold">{item?.message}</p>
              <p className="text-gray-500">{moment(item?.createdAt).fromNow()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Centering the Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={allNotification?.notifications.length}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Notification;
