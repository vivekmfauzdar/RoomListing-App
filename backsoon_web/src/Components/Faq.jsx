import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export default function Faq() {
  const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
    <div className="lg:max-w-[700px] min-w-[400px] p-5  mx-auto pt-[80px] caret-transparent mb-[100px]">
    <h1 className="text-red-400 text-2xl font-semibold">FAQ's</h1>
      <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={`border-b-0 transition-colors ${
            open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          What is Backsoon?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          Backsoon is a platform where anyone can list their rooms for rent easily and the needy one can find rooms for according to their needs. We are building this platform to help the people find rooms and list room easily without any problem.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className={`border-b-0 transition-colors ${
            open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          How can I List my rooms ?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          Anyone Can list their room just by going to the List Rooms Section and enter your rooms/house's details like how many rooms you want to rent out. Whom you give prefrence like girl,boy or for anyone. Enter your expected rent, give a attractive title and write some lines to describe your room/house. Just Upload some 2-3 photos of your rooms and Select your room's location and just submit.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} className="rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className={`border-b-0 transition-colors ${
            open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          Is it Free or Paid?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          No! We are completely free we are not charging any amount neither for listing the rooms nor finding the rooms you can do whatever you want completely free.
           
        </AccordionBody>
      </Accordion>
      </div>
    </>
  );
}