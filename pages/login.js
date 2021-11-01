import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/utils/useUser";
import Link from "next/link";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });
    const router = useRouter();
    const {user, signIn, signInWithGoogle} = useUser();

    const handleSignin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage({});

        const { error } = await signIn ( {email, password} );
        if(error) {
            setMessage({type:'error', content: error.message});
        }
        setLoading(false);
    }

    const handleOAuthSignIn = async (provider) => {
        setLoading(true);
        const {error} = await signInWithGoogle();
        if(error){
            setMessage({type:'error', content: error.message});
        }
        setLoading(false);
    }

    useEffect( () => {
        if(user) {
            router.back();
        }
    }, [user])


    if(!user){
        // console.log(user)
        return (
            <div className="flex flex-col gap-5 m-20 ml-auto mr-auto text-black bg-white">
                <h1 className="text-2xl font-semibold ml-auto mr-auto">
                    Existing Users Login 
                </h1>
                
                {message.content && (
                    <div className="ml-auto mr-auto text-red-500 font-semibold">{message.content}</div>
                )}
                
                <button
                    onClick={() => handleOAuthSignIn('google')}
                    className="text-white bg-green-500 h-10 font-semibold w-80 mr-auto ml-auto rounded-3xl border-2 text-xl border-green-500 md:hover:bg-green-500 md:hover:text-white transform md:hover:scale-110 transition md:ease-in md:duration-150"
                >
                    Sign In With Google
                </button>

                <div className="text-center">
                    <p>Login With Email Instead</p>
                </div>

                <form onSubmit={handleSignin} className="flex gap-4 flex-col">
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="outline-none border-2 border-red-500 pl-5 h-10 rounded-2xl text-lg w-80 mr-auto ml-auto"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="outline-none border-2 border-red-500 pl-5 h-10 rounded-2xl text-lg w-80 mr-auto ml-auto"
                    />          
                    <button
                        disabled={!password.length || !email.length}
                        className="text-white mb-8 bg-red-500 h-10 font-semibold w-80 mr-auto ml-auto rounded-3xl border-2 text-xl border-red-500 md:hover:bg-red-200 md:hover:text-red-600 transform md:hover:scale-110 transition md:ease-in md:duration-150"
                    >
                        Sign In
                    </button>
                </form>
                <h1 className="text-xl font-medium ml-auto mr-auto mb-2">
                    Don't have account? Signup Below
                </h1>
                 <Link href="/register">
                    <button
                        className="text-white mb-8 bg-red-500 h-10 font-semibold w-80 mr-auto ml-auto rounded-3xl border-2 text-xl border-red-500 md:hover:bg-red-200 md:hover:text-red-600 transform md:hover:scale-110 transition md:ease-in md:duration-150"
                    >
                            Sign Up
                    </button>
                </Link>
            </div>
        )
    }

    return(
        <div className="flex flex-col">
            <p className="text-xl font-bold self-center p-10">Redirecting...</p>
        </div>
    )
}

export default SignIn;
