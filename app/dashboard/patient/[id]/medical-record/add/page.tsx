"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GET_DOCTOR_FOR_SELECT } from "./action";
import { useQuery } from "@tanstack/react-query";

const AddMedicalRecord = () => {
    const { data: doctors, isLoading } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => await GET_DOCTOR_FOR_SELECT(),
        staleTime: 60 * 60 * 1000,
    });

    return (
        <div>

        </div>
    )
}

export default AddMedicalRecord
