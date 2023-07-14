'use client'
import React, {useRef, useState} from 'react';
import VIcon from "@/app/[lang]/components/base/VIcon";
import {useDebounce} from "react-use";
import TypographyTitle from "@/app/[lang]/components/typography/TypographyTitle";
import TypographyHeadline from "@/app/[lang]/components/typography/TypographyHeadline";
import BlockContainer from "@/app/[lang]/components/blocks/BlockContainer";
import {getDirectusMedia} from "@/app/[lang]/utils/api-helpers";

interface Testimonial {
    id: string | number
    title: string;
    subtitle: string;
    image: string;
    company: string;
    company_logo: string;
    link: string;
    content: string;
}

interface TestimonialsBlockProps {
    id: string;
    title?: string;
    headline?: string;
    subtitle?: string;
    testimonials: { testimonial: Testimonial }[];
}

interface Props {
    data: TestimonialsBlockProps;
}

export const TestimonialsBlock: React.FC<Props> = ({data}) => {
    const testimonialContainer = useRef<HTMLDivElement>(null);
    const testimonialRefs = useRef<HTMLDivElement[]>([]);
    const [currentItemIdx, setCurrentItemIdx] = useState(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const testimonialWidth = testimonialRefs.current[0].offsetWidth;
        const testimonialCenter = testimonialWidth / 2;
        const scrollLeft = e.currentTarget.scrollLeft;
        const scrollCenter = scrollLeft + testimonialCenter;
        const closestTestimonial = Math.round(scrollCenter / testimonialWidth);

        if (scrollLeft === 0) {
            setCurrentItemIdx(0);
        } else if (
            scrollLeft + e.currentTarget.offsetWidth + 1 >=
            e.currentTarget.scrollWidth
        ) {
            setCurrentItemIdx(testimonialRefs.current.length - 1);
        } else {
            setCurrentItemIdx(closestTestimonial);
        }
    };


    const handleIndicatorButton = (index: number) => {
        if (testimonialContainer.current && testimonialRefs.current[index]) {
            testimonialContainer.current.scrollLeft =
                testimonialRefs.current[index].offsetLeft - 16;
        }
    };

    const handleNavButton = (direction: 'left' | 'right') => {
        if (testimonialContainer.current && testimonialRefs.current[currentItemIdx]) {
            if (direction === 'left') {
                testimonialContainer.current.scrollLeft -= testimonialRefs.current[currentItemIdx].offsetWidth;
            } else {
                testimonialContainer.current.scrollLeft += testimonialRefs.current[currentItemIdx].offsetWidth;
            }
        }
    };


    return (
        <BlockContainer className="relative overflow-hidden" fullWidth>
            <div
                className="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-700 dark:via-gray-900 dark:to-accent"/>
            <div className="absolute inset-0 grain-bg dark:opacity-20"/>

            <div className="relative pt-16 space-y-4 text-center">
                <TypographyTitle>{data.title}</TypographyTitle>
                <TypographyHeadline content={data.headline as string} size="xl"/>

                <p className="max-w-3xl mx-auto leading-7 text-center">{data.subtitle}</p>
            </div>
            <div className="relative mt-4">
                <div className="flex items-center justify-end px-6 space-x-8">
                    <div className="inline-flex space-x-2">
                        {data.testimonials.map((item, itemIdx) => (
                            <button
                                key={item.testimonial.id}
                                className={`flex items-center justify-center w-12 h-3 hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed ${
                                    itemIdx === currentItemIdx ? 'bg-accent' : 'bg-gray-500 bg-opacity-50 dark:bg-gray-900'
                                }`}
                                onClick={() => handleIndicatorButton(itemIdx)}
                            />
                        ))}
                    </div>
                    <div className="flex space-x-2 justify-self-end">
                        <button
                            disabled={currentItemIdx === 0}
                            className="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleNavButton('left')}
                        >
                            <VIcon icon="heroicons:arrow-left" className="w-5 h-5 text-white"/>
                        </button>
                        <button
                            disabled={currentItemIdx === data.testimonials.length - 1}
                            className="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleNavButton('right')}
                        >
                            <VIcon icon="heroicons:arrow-right" className="w-5 h-5 text-white"/>
                        </button>
                    </div>
                </div>
                <div
                    className="flex w-full px-4 py-6 pb-24 space-x-6 overflow-x-auto md:px-6 lg:px-8 scrollbar-hide md:pt-8 snap-x scroll-smooth"
                    ref={testimonialContainer}
                    onScroll={handleScroll}
                >
                    {data.testimonials.map(({testimonial}, itemIdx) => (
                        <div
                            key={testimonial.id}
                            ref={(el) => {
                                if (el) testimonialRefs.current[itemIdx] = el;
                            }}
                            className="relative w-[350px] md:w[450px] lg:w-[600px] flex flex-col justify-between flex-shrink-0 p-8 bg-white dark:bg-gray-900 shadow-md even:rounded-bl-3xl even:rounded-tr-3xl odd:rounded-br-3xl odd:rounded-tl-3xl overflow-hidden snap-center"
                        >
                            <div
                                className="relative font-mono prose-sm prose md:prose-base dark:prose-invert"
                                dangerouslySetInnerHTML={{__html: testimonial.content}}
                            />

                            <div className="flex pt-6 mt-4 space-x-2 border-t border-gray-300 dark:border-gray-700">
                                {testimonial.image ? (
                                    <img
                                        className="inline-block w-16 h-16 border rounded-full"
                                        src={getDirectusMedia(testimonial.image)}
                                        alt=""
                                    />
                                ) : (
                                    <VIcon
                                        icon="ic:baseline-account-circle"
                                        className="inline-block w-16 h-16 text-gray-300 border rounded-full"
                                    />
                                )}

                                <div className="relative">
                                    <p className="font-serif font-bold text-gray-900 lg:text-2xl dark:text-white">
                                        {testimonial.title}
                                    </p>
                                    <p className="font-mono text-sm text-gray-700 lg:text-lg dark:text-gray-300">
                                        {testimonial.subtitle} at {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </BlockContainer>
    );
};
