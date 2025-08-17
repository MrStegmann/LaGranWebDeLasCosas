import { useParams, Outlet } from "react-router-dom";
import PageGAC from "../framework/PageGAC";

import SheetsMenu from "../components/menus/SheetsMenu";

const SheetsManager = ({ children }) => {
  const { username } = useParams();
  return (
    <PageGAC>
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-1/4 min-h-full flex justify-center items-center">
          <SheetsMenu username={username} />
        </div>

        <div className="min-h-screen w-3/5">
          <Outlet />
        </div>
      </div>
    </PageGAC>
  );
};

export default SheetsManager;
