import React from "react";
import MainSection from "./_components/main/MainSection";

const layout = ({ children }) => {
  return (
    <div className="bg-surface">
      <div className=" w-11/12 mx-auto">
        {/* <MainSection children={children} /> */}
        <MainSection>{children}</MainSection>
      </div>
    </div>
  );
};

export default layout;
