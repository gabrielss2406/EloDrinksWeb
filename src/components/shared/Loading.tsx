import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Carregando dados..." }) => {
    return (
        <div className="flex justify-center items-center space-x-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{message}</span>
        </div>
    );
};

export default Loading;