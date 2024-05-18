import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MessageAlert({title, message, isVisible}) {
    if (!isVisible) return null;
    return (
        <Alert className='z-10 absolute p-2 w-100 bottom-5 left-5'>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}