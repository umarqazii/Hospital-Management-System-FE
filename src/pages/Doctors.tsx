import React from "react";
import { PopoverDemo } from "src/components/ui/PopoverDemo";
import DisplayDoctors from "../components/ui/DisplayDoctors";
const adminPImg = require("./admin-p.png");

const Doctors: React.FC = () => {
  return (
    <div className="flex justify-between  flex-col">
      <div className="flex justify-between items-center p-4 bg-white text-[#2c3e50] rounded-lg shadow mb-4">
        <div className="flex-grow">
          <h1>Doctors</h1>
        </div>
        <div className="flex-grow flex justify-center">
          <PopoverDemo />
        </div>
        <div className="flex-grow flex justify-end">
          <img
            src={adminPImg}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-[#2c3e50]"
          />
        </div>
      </div>
      <div>
        <DisplayDoctors />
      </div>
    </div>
  );
};

export default Doctors;
