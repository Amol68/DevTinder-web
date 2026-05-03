import React from "react";

const FormTitle = ({ icon, title }) => {
  return (
    <div className="flex items-center gap-3 ">
      {/* Icon Badge */}
      <div className="size-6 flex items-center justify-center rounded-full bg-white/10 text-ring">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-xs sm:text-sm tracking-[0.2em] text-gray-400 uppercase whitespace-nowrap">
        {title}
      </h2>

      {/* Divider */}
      <div className="flex-1 h-px bg-muted"></div>
    </div>
  );
};

export default FormTitle;
