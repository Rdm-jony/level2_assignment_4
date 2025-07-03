import { useGetCategoriesQuery } from "@/redux/feature/book/bookApi";
import CategoryCard from "./CategoryCard";
import { motion } from 'motion/react'
import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/filterSlice";
import { useNavigate } from "react-router";


const TopCategories = () => {
    const navigate = useNavigate()
    const disPatch = useDispatch()
    const { data } = useGetCategoriesQuery()

    const handleTabChange = (value: string) => {
        disPatch(setFilter(value === "All" ? "" : value));
        navigate("/allBook")
    };
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className=" py-10">
            <h1 className="text-center text-3xl font-semibold pb-10">Top Catrgories</h1>
            <div className="flex gap-10 justify-center flex-wrap max-w-6xl mx-auto">
                {
                    data?.data.map((category, idx) => <motion.div onClick={() => handleTabChange(category.genre)} initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: idx * 0.2 }} ><CategoryCard category={category} key={category.genre} /></motion.div>)
                }
            </div>
        </motion.div>
    );
};

export default TopCategories;