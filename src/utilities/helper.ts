export const getImagesFromUrl = (imagePath: string): string => {
    const apiUrl = process.env.REACT_APP_API_URL;
    return `${apiUrl}/${imagePath}`;
};