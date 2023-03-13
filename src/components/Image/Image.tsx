import { useState } from 'react';
import noImage from '/no-image.png';

interface ImageProps {
    src?: string;
    alt?: string;
    className?: string;
    id?: string;
    fallback?: string;
}

function Image({ id, src, alt, className, fallback: customFallback = noImage, ...props }: ImageProps) {
    const [fallback, setFallback] = useState<string>('');
    const handleError = () => {
        setFallback(customFallback);
    };
    return <img id={id} src={fallback || src} className={className} alt={alt} {...props} onError={handleError} />;
}

export default Image;
