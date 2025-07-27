import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Logos = [
    "Partnership 1",
    "Partnership 2",
    "Partnership 3",
    "Partnership 4",
    "Partnership 5",
    "Partnership 6",
    "Partnership 7",
];

export default function Discography() {
    const duplicated = [...Logos, ...Logos];

    return (
        <div className="bg-black p-7 overflow-hidden">
            <div className="flex justify-between">
                <div>
                <h2 className="text-yellow-300 text-3xl font-justme mb-4">
                    Discography
                </h2>
                </div>
                <div>
                <Button className="font-sans text-lg border-2 border-yellow-300 rounded-4xl bg-transparent cursor-pointer text-yellow-300 font-extrabold ">
                    SEE MORE
                </Button>
                </div>
            </div>
            <div className="flex gap-6 grid-rows-2 items-center justify-center">
                <Card>01</Card>
                <Card>02</Card>
                <Card>03</Card>
                <Card>04</Card>
                <Card>05</Card>
                <Card>06</Card>
            </div>
        </div>
    );
}
