import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";
import dashboardIcon from "/public/logo/dashboard-icon.png";
import { FaArrowTrendUp } from "react-icons/fa6";

const Status = () => {
  const { data, isLoading } = useGetDashboardStatusQuery();
  const fullData = data?.data?.attributes; 

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

      {/* Total Renter User Card */}
      <div className="shadow-[0_4px_10px_rgba(0,0,0,0.2)] p-5 rounded-lg border-2 border-[#344f47] bg-white">
        <div className="flex items-center gap-5 ">
          <img src={dashboardIcon} className="w-16" alt="" />
          <h2 className="text-2xl font-semibold">Total user</h2>
        </div>
        <div className="flex items-center mt-5 gap-3">
          <h1 className="text-4xl font-semibold text-[#222222]">
            {fullData?.totalUsers || "00"}
          </h1>
          {/* <p className="bg-[#19f1361f] text-[#159726] rounded-lg px-2 py-1 flex items-center gap-1"> <FaArrowTrendUp className="text-[#159726]" /> 20%</p>
          <h1>Last month total  1050</h1> */}
        </div>
      </div>
      {/* Total Renter User Card */}
      <div className="shadow-[0_4px_10px_rgba(0,0,0,0.2)] p-5 rounded-lg border-2 border-[#344f47] bg-white">
        <div className="flex items-center gap-5">
          <img src={dashboardIcon} className="w-16" alt="" />
          <h2 className="text-2xl font-semibold">Baby Cuse</h2>
        </div>
        <div className="flex items-center mt-5 gap-3">
          <h1 className="text-4xl font-semibold text-[#222222]">
            {data?.babyCare || "0"}
          </h1>
          {/* <h1>Last month total  1050</h1> */}
        </div>
      </div>
      {/* Total Renter User Card */}
      <div className="shadow-[0_4px_10px_rgba(0,0,0,0.2)] p-5 rounded-lg border-2 border-[#344f47] bg-white">
        <div className="flex items-center gap-5">
          <img src={dashboardIcon} className="w-16" alt="" />
          <h2 className="text-2xl font-semibold">Total  Milestone</h2>
        </div>
        <div className="flex items-center mt-5 gap-3">
          <h1 className="text-4xl font-semibold text-[#222222]">
            {data?.journey || "0"}
          </h1>
        </div>
      </div>

    </div>
  );
};

export default Status;