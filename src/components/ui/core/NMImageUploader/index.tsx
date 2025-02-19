import React from 'react';
import { Input } from '../../input';

type TImageUploadProps = {

    setImageFiles: React.Dispatch<React.SetStateAction<File[] | []>>

    setImagePreview: React.Dispatch<React.SetStateAction<string[] | []>>
}

const NMImageUploader = ({ setImageFiles, setImagePreview }: TImageUploadProps) => {


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0]
        setImageFiles((prev) => [...prev, file])

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview((prev) => [...prev, reader.result as string])
            }
            reader.readAsDataURL(file)
        }
        event.target.value = '';
    };


    return (
        <div>
            <Input onChange={handleImageChange} type='file' multiple accept='image/*' className='hidden' id="image-uploader" />
            <label className='w-32 size-32  flex items-center justify-center bg-gray-500 border border-primary shadow-md hover:bg-gray-300 cursor-pointer' htmlFor='image-uploader'>Upload Logo</label>

        </div>
    );
};

export default NMImageUploader;