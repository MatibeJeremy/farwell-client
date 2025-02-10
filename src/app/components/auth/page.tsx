"use client"

import {UserRegistrationForm} from "@/app/components/auth/register/UserRegistrationForm";
import {useAppSelector} from "@/store";
import {UserLoginForm} from "@/app/components/auth/login/UserLoginForm";

export default function Auth() {
    const registrationSuccess = useAppSelector(state => state.auth.registrationSuccess);
    return registrationSuccess ? <UserLoginForm/> :
        <UserRegistrationForm/>;
}
