"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import directusApi from "../../utils/directus-api";
import { readItems } from "@directus/sdk";
import TeamCard from "../TeamCard";
import TypographyProse from "../typography/TypographyProse";
import TypographyHeadline from "../typography/TypographyHeadline";
import BlockContainer from "./BlockContainer";
import TypographyTitle from "../typography/TypographyTitle";
import { useIntersection } from "react-use";
import useResizeObserver from "../../hooks/useResizeObserver";

function splitArray(array: Array<any>, numParts: number) {
  let result: Array<any> = [];
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function animationDelay() {
  let possibleAnimationDelays = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"];
  return possibleAnimationDelays[
    Math.floor(Math.random() * possibleAnimationDelays.length)
  ];
}

export interface Team {
  id: string;
  headline?: string;
  title?: string;
  content?: string;
}

export interface TeamBlockProps {
  data: Team;
}

export function TeamBlock({ data }: TeamBlockProps) {
  const [teamMembers, setTeamMembers] = useState<Array<any>>([]);
  //   const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const colHeightRef = useRef(0);
  const leftColHeightRef = useRef(0);
  const rightColHeightRef = useRef(0);
  const duration = useRef("");

  const teamToDisplay = useRef<{ left: Array<any>; right: Array<any> }>({
    left: [],
    right: [],
  });

  const intersection = useIntersection(targetRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.25,
  });

  const onResize = useCallback((target: HTMLDivElement) => {
    // Handle the resize event
    colHeightRef.current = target.offsetHeight;
    duration.current = `${colHeightRef.current * 15}ms`;
  }, []);

  useResizeObserver(onResize);

  useEffect(() => {
    async function fetchData() {
      const team = await directusApi.request(readItems("team"));
      console.log("team:" + JSON.stringify(team));
      setTeamMembers(team as any);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (teamMembers.length < 2) return;
    const teamMembersSplit = splitArray(teamMembers, 2);

    teamToDisplay.current = {
      left: [...teamMembersSplit[0], ...teamMembersSplit[0]],
      right: [...teamMembersSplit[1], ...teamMembersSplit[1]],
    };

    return () => {};
  }, [teamMembers]);

  return (
    <section>
      <BlockContainer>
        <div className="flex flex-col-reverse py-24 mx-auto lg:flex-row">
          <div className="flex flex-col pr-4 mt-8 lg:w-2/5">
            {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
            {data.headline && (
              <TypographyHeadline content={data.headline} size="lg" />
            )}
            {data.content && (
              <TypographyProse
                content={data.content}
                className="mt-4 font-mono"
              />
            )}
          </div>
          <div
            className="relative grid h-[49rem] max-h-[60vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 md:grid-cols-2 border-t-4 border-t-accent border-b-4 border-b-gray-500"
            ref={targetRef}
          >
            <div className="absolute top-0 z-10 w-full h-16 bg-gradient-to-b from-white to-transparent dark:from-gray-800" />
            <div className="absolute bottom-0 z-10 w-full h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-800" />
            <div
              className={`${
                intersection && intersection.isIntersecting
                  ? "animate-marquee"
                  : ""
              } space-y-10 py-4 -mt-10 max-w-[320px]`}
              style={{ "--marquee-duration": duration }}
              ref={leftColRef}
            >
              {teamToDisplay.current.left.map((person, index: number) => (
                <TeamCard key={index} person={person} />
              ))}
            </div>
            <div
              className={`${
                intersection && intersection.isIntersecting
                  ? "animate-marquee"
                  : ""
              } space-y-10 py-4 max-w-[320px]`}
              style={{ "--marquee-duration": duration }}
              ref={rightColRef}
            >
              {teamToDisplay.current.right.map((person, index: number) => (
                <TeamCard
                  key={index}
                  style={{ animationDelay: animationDelay() }}
                  person={person}
                />
              ))}
            </div>
          </div>
        </div>
      </BlockContainer>
    </section>
  );
}
