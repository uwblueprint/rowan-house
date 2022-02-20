type contentType = "text" |"image"|"video";
export interface ContentBlock {
    type: contentType;
    content: {}
}

export interface TextBlock extends ContentBlock {
    content: {text: String;}
}

export interface ImageBlock extends ContentBlock {
    content: {link: String;}
}

export interface VideoBlock extends ContentBlock {
    content: {link: String;}
}

