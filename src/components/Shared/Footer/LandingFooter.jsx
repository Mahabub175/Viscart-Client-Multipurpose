"use client";

import { footerData } from "@/assets/data/footerData";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import ContactInfo from "./ContactInfo";
import Image from "next/image";

const LandingFooter = () => {
  const { data: globalData } = useGetAllGlobalSettingQuery();

  return (
    <section className="bg-[#232f3e] border-t mt-10 mb-16 lg:mb-0 text-white">
      <footer className="pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-0 xl:gap-10 items-start justify-center max-w-7xl mx-auto px-5">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xl font-medium mb-2">Social</h3>
            <Link
              href={globalData?.results?.businessFacebook ?? "/"}
              target="_blank"
              className="flex items-center gap-4"
            >
              <FaFacebook className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              <p>Facebook</p>
            </Link>
            <Link
              href={globalData?.results?.businessLinkedin ?? "/"}
              target="_blank"
              className="flex items-center gap-4"
            >
              <FaLinkedin className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              <p>Linkedin</p>
            </Link>
            <Link
              href={globalData?.results?.businessInstagram ?? "/"}
              target="_blank"
              className="flex items-center gap-4"
            >
              <FaInstagram className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              <p>Instagram</p>
            </Link>
            <Link
              href={globalData?.results?.businessTwitter ?? "/"}
              target="_blank"
              className="flex items-center gap-4"
            >
              <FaSquareXTwitter className="text-4xl bg-primary p-2 rounded-full text-white hover:scale-110 duration-300" />
              <p>Twitter</p>
            </Link>
          </div>

          {footerData?.map((item, i) => (
            <div key={i}>
              <h3 className="text-xl font-medium mb-6">{item?.title}</h3>
              <ul>
                {item?.links?.map((link, j) => (
                  <Link key={j} href={link?.to}>
                    <p className="mt-2 hover:underline hover:text-primary duration-300">
                      {link?.name}
                    </p>
                  </Link>
                ))}
              </ul>
            </div>
          ))}

          <ContactInfo globalData={globalData} />
        </div>

        <div className="flex flex-col md:flex-row gap-5 lg:gap-10 justify-center items-center bg-[#0f1111] mt-10">
          <Link href={"/"} className="">
            <Image
              src={globalData?.results?.logo}
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
          <Link
            href={"/"}
            className="hover:underline hover:text-primary duration-300"
          >
            Terms & Condition
          </Link>
          <Link
            href={"/"}
            className="hover:underline hover:text-primary duration-300"
          >
            Privacy Policy
          </Link>
        </div>
      </footer>
    </section>
  );
};

export default LandingFooter;
