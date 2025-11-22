import IncomeGraphChart from "../../component/Main/Dashboard/IncomeGraphChart";
import Piechart from "../../component/Main/Dashboard/Piechart";
import RecentTransactions from "../../component/Main/Dashboard/RecentTransactions";
import Status from "../../component/Main/Dashboard/Status";
const DashboardHome = () => {
  const time = new Date().getHours();


  return (
    <section>
      <h1 className="text-4xl py-5 px-3 flex items-center gap-1"> Good {time < 12 ? <div className="flex items-center gap-2">
        Morning
        <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=tMl3iJECqyRx&format=png" alt="" />
      </div> : time < 18 ? <div className="flex items-center gap-2">
        Afternoon
        <img className="w-10 h-10" src="https://img.icons8.com/?size=48&id=xctFOOIVorz0&format=png" alt="" />
      </div> :
        <div className="flex items-center gap-2">
          Evening
          <img className="w-10 h-10" src="https://img.icons8.com/?size=80&id=Ah2dOwUOsH7N&format=png" alt="" />
        </div>
      }  </h1>
      <div className="px-3">
        <Status />
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 pt-10">
          <IncomeGraphChart />
          <Piechart />
        </div>
        <RecentTransactions />
      </div>
    </section>
  );
};

export default DashboardHome;
