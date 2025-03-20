"use client";

import { useParams } from 'next/navigation';

export default function OrderDetails() {
    const { id } = useParams();

    return (
        <div className="container mx-auto py-10">
            {id}
        </div>
    );
}
