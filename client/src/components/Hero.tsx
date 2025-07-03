import bgShape from '@/assets/bg-shape.png'
import heroGirl from '@/assets/hero-girl.png'
import frame from '@/assets/frame.png'
import { Button } from '@/components/ui/button';
import { motion } from "motion/react"

const Hero = () => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full  min-h-screen relative">
            <div className='md:max-w-6xl w-full  mx-auto px-5'>
                <img className='ml-auto' src={bgShape} alt="" />
                <div className='md:w-2/3 w-full'>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='md:text-5xl text-3xl md:text-left text-center  font-bold md:leading-snug mb-4'>Get Your New Book
                        With The Best Price</motion.h1>
                    <Button className=' md:static absolute bottom-[100px]'>Shop Now</Button>
                </div>
                <img src={frame} className='absolute  top-20 lg:right-1/2' alt="" />
                <motion.img
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className='absolute  w-40  bottom-0 right-0 md:w-1/3' src={heroGirl} alt="" />

            </div>

        </motion.div>
    );
};

export default Hero;