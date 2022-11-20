import Image from "next/image";
import { useMemo } from "react";
import EntryMotion from "../../components/entry-motion/entry-motion";
import { useWindowSize } from "../../utilities/app-hooks";
import { SCREEN_WIDTHS } from "../../utilities/app-utilities";

const bookAnnouncement = "https://res.cloudinary.com/anythinkimages/image/upload/v1668959586/mr-website/book-announcement_yjzd84.png";
const bookBlurb = "As a writer and editor specializing in health and wellness, it was a thrill when Maria Shriver asked me to write a women’s health book for her imprint at Penguin Random House. My goal: To provide women with a book that’s filled with the smartest voices in each health specialty, the newest research, and science-backed service that’ll help all of us live our healthiest lives.";

function BookSection(){
  const { width } = useWindowSize();
  const imageSize = useMemo(() => width <= SCREEN_WIDTHS.mobile ? {height: 131, width: 325} : {height: 262, width: 649}, [width]);
  
  return (
    <div className="flex flex-col w-full">
      <EntryMotion>
        <div className="flex flex-col items-center my-4 px-4 py-0">

          <div className="flex justify-center md:justify-start items-center my-4 section-header header-center" >
            <span className="hidden md:inline-block sep-left" />
            <h1>Exciting news</h1>
            <span className="hidden md:inline-block" />
          </div>

          <Image src={bookAnnouncement} alt="Book Announcement" height={imageSize.height} width={imageSize.width} layout="fixed" objectFit="contain" />
          <p className="font-normal mt-3 px-4">{bookBlurb}</p>
        </div>

      </EntryMotion>
    </div>
  )
}

export default BookSection;