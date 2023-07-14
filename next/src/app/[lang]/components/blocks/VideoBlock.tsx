import React from 'react';
import {getDirectusMedia} from "@/app/[lang]/utils/api-helpers";
import BlockContainer from "@/app/[lang]/components/blocks/BlockContainer";
import TypographyTitle from "@/app/[lang]/components/typography/TypographyTitle";
import TypographyHeadline from "@/app/[lang]/components/typography/TypographyHeadline";
import VVideo from "@/app/[lang]/components/base/VVideo";

interface VideoBlockProps {
    id: string;
    title?: string;
    headline?: string;
    type: string;
    video_file?: string;
    video_url?: string;
}

interface Props {
    data: VideoBlockProps;
}

export const VideoBlock: React.FC<Props> = ({ data }) => {

    const url = React.useMemo(() => {
        if (data.type === 'file' && data.video_file) {
            return getDirectusMedia(data.video_file);
        }
        if (data.type === 'url' && data.video_url) {
            return data.video_url;
        }
        return null;
    }, [data.type, data.video_file, data.video_url]);

    return (
        <BlockContainer className="max-w-4xl py-12 mx-auto text-center">
            {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
            {data.headline && <TypographyHeadline content={data.headline} />}
            <div className="relative">
                <div className="absolute inset-0 w-full h-full translate-x-4 translate-y-4 border-2 rounded-tl-2xl rounded-br-2xl border-gray-500/75" />

                {url && (
                    <VVideo
                        className="relative mt-4 overflow-hidden rounded-tl-xl rounded-br-xl"
                        url={url}
                        title={data.title}
                    />
                )}
            </div>
        </BlockContainer>
    );
};
