import authRepository from "./Authentication/authRepository";

const repository={
    Authentication:authRepository
}

export const authApi=repository['Authentication'];
