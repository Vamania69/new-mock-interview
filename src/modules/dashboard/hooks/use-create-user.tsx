// import { CreateUserResponse } from "@/interfaces/api"
// import { api } from "@/utils/axios-instance"
// import { useMutation, UseMutationResult } from "@tanstack/react-query"

// interface CreateUserPayload {
//     email: string
//     name: string
// }

// // Separate the API call
// const createUser = async (payload: CreateUserPayload): Promise<CreateUserResponse> => {
//     const response = await api.post<CreateUserResponse>('/users/create', payload)
//     return response.data
// }

// // Updated hook with better TypeScript types and optional callbacks
// export const useCreateUser = (options?: {
//     onSuccess?: (data: CreateUserResponse, variables: CreateUserPayload) => void | Promise<unknown>,
//     onError?: (error: Error, variables: CreateUserPayload) => void | Promise<unknown>
// }): UseMutationResult<CreateUserResponse, Error, CreateUserPayload> => {
//     return useMutation({
//         mutationFn: createUser,
//         onSuccess: options?.onSuccess,
//         onError: options?.onError,
//     })
// }


import { CreateUserResponse } from "@/interfaces/api"
import { api } from "@/utils/axios-instance"
import {
    UseMutationResult,
    useMutation,
    UseMutationOptions
} from "@tanstack/react-query"

interface CreateUserPayload {
    email: string
    name: string
}

// Separate the API call
const createUser = async (payload: CreateUserPayload): Promise<CreateUserResponse> => {
    const response = await api.post<CreateUserResponse>('/users/create', payload)
    return response.data
}

// Updated type definition to include all mutation options
export const useCreateUser = (
    options?: UseMutationOptions<
        CreateUserResponse,
        Error,
        CreateUserPayload,
        unknown
    >
): UseMutationResult<CreateUserResponse, Error, CreateUserPayload, unknown> => {
    return useMutation({
        mutationFn: createUser,
        ...options
    })
}