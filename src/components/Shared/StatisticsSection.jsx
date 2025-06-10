import React from "react";

const StatisticsSection = () => {
  const stats = [
    {
      value: "32,000 +",
      label: (
        <>
          Experienced <br />
          tutors
        </>
      ),
    },
    {
      value: "300,000 +",
      label: (
        <>
          5-star tutor <br />
          reviews
        </>
      ),
    },
    {
      value: "120 +",
      label: (
        <>
          Subjects <br />
          taught
        </>
      ),
    },
    {
      value: "200 +",
      label: (
        <>
          Tutor <br />
          nationalities
        </>
      ),
    },
  ];

  return (
    <section className="flex justify-center mt-10">
      <ul
        className="w-full max-w-[1312px]  min-h-[116px]
        border-[3.5px] border-dashed border-[#9FB7CE] 
        rounded-[30px] 
        px-4 py-4 sm:px-6 sm:py-6 
        flex items-center justify-between flex-wrap sm:flex-nowrap"
      >
        {stats.map((stat) => (
          <li
            key={stat.value}
            className="flex flex-row items-center justify-center text-center flex-1"
          >
            <p className="text-[28px] sm:text-[24px] lg:text-[28px] font-bold text-[#1A1A1A] leading-snug">
              {stat.value}
            </p>
            <p className="text-[14px] sm:text-[13px] text-[#4D4D4D] leading-tight mt-1">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StatisticsSection;
