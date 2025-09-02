function parsedUrl(url : string){
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|))([^&?/]+)/;
    const match = url.match(regex);

    if(match){
        const videoId = match[1];
        return {
            embedUrl:`https://www.youtube.com/embed/${videoId}`,
            thumbnailUrl : `https://www.youtube.com/vi/${videoId}/hqdefault.jpg`,
        };
    }
    return null;
}


export {parsedUrl}