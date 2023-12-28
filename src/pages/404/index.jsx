import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col flex-grow mt-10">
      {/* <p className="text-sm text-font-dark-gray my-[20px]">
        <span className="text-sky-500"> Page Not Found</span>
      </p> */}
      <div className="flex flex-grow items-center justify-center rounded-main bg-white dark:bg-slate overflow-auto p-default">
        <p className="dark:text-white text-black text-4xl">
          404 : Page Not Found
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
