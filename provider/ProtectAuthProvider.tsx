import { RootState } from "@/lib/store"
import { usePathname, useRouter } from "expo-router"
import { useSelector, useDispatch } from "react-redux"


import { setAuth } from "@/lib/features/auth/authSlice"
import { useGetProfile } from "@/hook/user"
import React from "react"

const privatePath = ['/', '/LogLightDetail', '/LogPumpDetail']
const authPath = ['/login', '/landing']

export default function ProtectAuthProvider({children}:{children:React.ReactNode}){
   
    const { data: profile } = useGetProfile();


    return <>{children}</>
}
