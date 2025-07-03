import { motion } from "framer-motion";

const CategoryCard = ({ category }: { category: { img: string; genre: string } }) => {

  return (
    <div className="flex justify-center cursor-pointer">
      <div className="relative flex flex-col items-center gap-3">
        {/* Static image on top */}
        <div className="absolute left-1/2 z-10 -translate-x-1/2 translate-y-[50%]  p-1 rounded-md">
          <img
            src={category.img}
            alt={category.genre}
            className="md:w-20 md:h-24 w-14 h-14 object-cover rounded-md"
          />
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="rounded-full md:w-48 w-32 dark:bg-gray-800 dark:border-white bg-white h-32 md:h-48 border-2 border-dashed border-black"
        ></motion.div>

        <h3 className="text-center md:text-2xl text-xl font-semibold mt-4">
          {category.genre}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;
