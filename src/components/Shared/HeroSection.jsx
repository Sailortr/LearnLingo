import React from "react";
import { useNavigate } from "react-router-dom";
import HeroImage from "../../assets/block.svg";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/teachers");
  };

  return (
    <section className="py-16">
      <div className="max-w-[1312px] mx-auto px-4 flex flex-row items-center gap-8">
        <div className="bg-[#F8F8F8] rounded-[30px] w-[620px] h-[370px] flex flex-col justify-start items-start pt-[88px] pl-[64px] pr-[2px]">
          <h1 className="text-[48px] leading-[56px] font-medium tracking-[-0.02em] text-[#121417] mb-6">
            Unlock your potential with <br />
            the best{" "}
            <span
              style={{ fontWeight: 400 }}
              className="bg-[#D6E6FB] text-[48px] leading-[56px] tracking-[-0.02em] italic font-normal px-2"
            >
              language
            </span>{" "}
            tutors
          </h1>

          <p
            style={{ fontWeight: 400 }}
            className="text-[16px] lg:text-lg text-[#121417] mb-8 max-w-xl"
          >
            Embark on an Exciting Language Journey with Expert Language Tutors.
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button
            style={{ fontWeight: 700 }}
            onClick={handleGetStarted}
            className="w-[267px] h-[60px] px-[88px] py-4 
             bg-[#9FB7CE] 
             text-[#121417] text-[16px] font-bold leading-6 
             rounded-[12px] 
             border-none outline-none ring-0 
             hover:bg-[#b1c8dc] transition-colors duration-200"
          >
            Get started
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src={HeroImage}
            alt="Language Tutor Character"
            className="w-full max-w-[480px] rounded-[32px] bg-[#D6E6FB]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
