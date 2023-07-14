import React from 'react';
import BlockContainer from "@/app/[lang]/components/blocks/BlockContainer";
import TypographyTitle from "@/app/[lang]/components/typography/TypographyTitle";
import TypographyHeadline from "@/app/[lang]/components/typography/TypographyHeadline";
import TypographyProse from "@/app/[lang]/components/typography/TypographyProse";
import {getDirectusMedia} from "@/app/[lang]/utils/api-helpers";

interface Step {
    id: string;
    title: string;
    content: string;
    image: string;
}

interface StepsBlockProps {
    id: string;
    title?: string;
    headline?: string;
    steps: Step[];
    show_step_numbers?: boolean;
    alternate_image_position?: boolean;
}

interface Props {
    data: StepsBlockProps;
}

export const StepsBlock: React.FC<Props> = ({data}) => {
    const isEven = (num: number) => num % 2 === 0;

    return (
        <BlockContainer className="max-w-4xl mx-auto text-center">
            {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
            {data.headline && <TypographyHeadline content={data.headline}/>}
            <div className="mt-8">
                {data.steps.map((step, stepIdx) => (
                    <div
                        key={stepIdx}
                        className={`relative p-6 md:flex md:space-x-8 ring-accent ring-2 ${
                            isEven(stepIdx)
                                ? 'rounded-br-3xl rounded-tl-3xl mr-8'
                                : 'rounded-bl-3xl rounded-tr-3xl ml-8'
                        } ${
                            isEven(stepIdx) && !data.alternate_image_position
                                ? 'md:flex-row'
                                : 'md:flex-row-reverse md:space-x-reverse'
                        }`}
                    >
                        <div className="flex-shrink-0">
                            <img
                                className={`object-cover w-full h-32 md:w-48 md:h-full dark:brightness-90 ${
                                    isEven(stepIdx)
                                        ? 'rounded-br-xl rounded-tl-xl'
                                        : 'rounded-bl-xl rounded-tr-xl'
                                }`}
                                alt=""
                                src={getDirectusMedia(step.image)}
                            />
                        </div>

                        <div className="w-full mt-4 text-left md:mt-0">
                            {data.show_step_numbers && (
                                <div
                                    className="font-mono text-sm font-bold tracking-wide uppercase text-accent text-primary">
                                    Step {stepIdx + 1}
                                </div>
                            )}
                            <h3 className="mt-2 font-serif text-3xl font-bold dark:text-white">{step.title}</h3>
                            <TypographyProse content={step.content} className="mt-4 font-mono"/>
                        </div>

                        {stepIdx !== data.steps.length - 1 && (
                            <svg
                                className="h-16 m-0 mx-auto stroke-current text-accent md:h-20 steps-animation"
                                viewBox="0 0 60 200"
                            >
                                <line
                                    className="path"
                                    x1="15"
                                    x2="15"
                                    y1="0"
                                    y2="200"
                                    strokeWidth="8"
                                    strokeLinecap="square"
                                />
                            </svg>
                        )}
                    </div>

                ))}
            </div>
        </BlockContainer>
    );
};
