/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, CSSProperties } from "react";
import { motion } from "framer-motion";
import { getDirectusMedia } from "../utils/api-helpers";
import Link from "next/link";
import VIcon from "./base/VIcon";

interface TeamCardProps {
  person: {
    id: string;
    name: string;
    job_title: string;
    image: string;
    social_media?: {
      service?: string;
      url?: string;
    }[];
  };
  style?: CSSProperties | undefined;
}

function TeamCard({ person, style }: TeamCardProps) {
  const [flipped, setFlipped] = useState(false);

  function handleCardClick() {
    setFlipped(!flipped);
  }

  return (
    <div
      className="opacity-0 cursor-pointer select-none animate-fade-in"
      style={style}
      onClick={handleCardClick}
    >
      <div className="relative w-full h-full overflow-hidden group rounded-br-3xl rounded-tl-3xl">
        {/* Front of Team Card */}
        <img
          className="object-cover w-full h-full transition duration-300 grayscale group-hover:grayscale-0"
          src={getDirectusMedia(person.image)}
          alt=""
        />

        {/* Back of Team Card */}
        {/* <motion.div
          className="absolute inset-0 bg-accent"
          initial={{
            opacity: 0,
            y: 100,
            x: 100,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            transformOrigin: "bottom right",
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            x: 100,
            y: 100,
            transformOrigin: "bottom right",
          }}
        >

        </motion.div> */}
        <div className="relative p-4">
          <p className="font-mono tracking-wider uppercase">Links</p>
          <div className="mt-2 space-y-4">
            {person.social_media &&
              person.social_media.map((link) => (
                <Link
                  key={link.service}
                  className="flex border border-gray-900"
                  href={link.url || ""}
                  target="_blank"
                >
                  <div className="flex items-center justify-center flex-none text-black border-r border-black w-14">
                    <VIcon
                      className="w-8 h-8 text-gray-900 hover:opacity-75"
                      icon={`uil:${link.service}`}
                    />
                  </div>
                  <div className="flex flex-col justify-center py-2 pl-3 pr-2 overflow-hidden md:py-3">
                    <div className="pb-1 font-mono text-lg font-semibold leading-none tracking-tight text-black uppercase truncate word-spacing-tight">
                      {link.service}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="absolute z-10 bottom-4 left-7 right-7">
          <h3 className="pb-2 font-serif text-3xl text-white font-extralight text-shadow leading-tight-2 2xl:text-4xl 2xl:leading-tight-2">
            {person.name}
          </h3>
          <p className="font-mono text-sm font-bold tracking-widest uppercase word-spacing-tight text-accent">
            {person.job_title}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black h-1/3 opacity-80"></div>
      </div>
    </div>
  );
}

export default TeamCard;
