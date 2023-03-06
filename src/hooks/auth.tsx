import {createContext, ReactNode, useContext} from 'react'
import { SignIn } from '../screens/SignIn'


interface AuthProviderProps {
    children: ReactNode
}

interface User {
    id: string;
    name: string;
    email: string
    photo?: string
}

interface AuthContextData {
    user: User;
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}:AuthProviderProps) {
    const user = {
        id: '23423',
        name: "rafael",
        email: 'rafa123#ghmail.xom'
    }

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export {AuthProvider, useAuth}