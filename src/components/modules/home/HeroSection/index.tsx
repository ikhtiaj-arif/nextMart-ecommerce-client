import cupImage from "@/assets/cup-with-headphone.png";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const HeroSection = () => {
    return (
        <div className={`${styles.banner} container mx-auto border-2 border-white rounded-3xl mt-2`}>
            <div className='grid grid-cols-2 gap-4 items-center'>
                <div className='pl-12'>
                    <h1 className='text-3xl font-bold leading-normal'>Don&apos;t Miss Out On <br /> The Latest Black <br /> Friday Deals!</h1>
                    <p className='py-3 text-sm '>Sign up for our newsletter to get the latest deals on our products.</p>
                    <Button className='rounded-full mr-2'>Buy Now</Button>
                    <Button className='rounded-full' variant="outline">All Products</Button>
                </div>
                <div className="flex items-center justify-center">
                    <Image src={cupImage} alt="Cup with headphone" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;