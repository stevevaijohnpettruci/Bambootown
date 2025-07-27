import { motion } from "framer-motion";

const Logos = [
    "Partnership 1",
    "Partnership 2",
    "Partnership 3",
    "Partnership 4",
    "Partnership 5",
    "Partnership 6",
    "Partnership 7",
];

export default function Partnership() {
    const duplicated = [...Logos, ...Logos];

    return (
        <div className="bg-black p-7 overflow-hidden">
            <h2 className="text-yellow-300 text-3xl font-justme mb-4">
                Media & Partnership
            </h2>

        <motion.div
            className="flex w-max gap-8 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
            x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
            },
            }}
        >
            {duplicated.map((logo, idx) => (
            <div
                key={idx}
                className="font-bold text-yellow-300 p-8 rounded shadow-md text-sm min-w-[200px] text-center"
            >
                {logo}
            </div>
            ))}
        </motion.div>
        </div>
    );
}
