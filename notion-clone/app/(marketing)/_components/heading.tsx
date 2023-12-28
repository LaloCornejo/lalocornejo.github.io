"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Hallo im under the watter
                <span className="underline">
                    LÆLÖ
                </span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                place where faster better work happens.
            </h3>
            <Button>Get Started
                <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>
        </div>
    );
}