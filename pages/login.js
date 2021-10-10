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
    const {user, signIn} = useUser();

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
        const {error} = await signIn({provider});
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
            <div className="flex flex-col m-20 ml-auto mr-auto text-black bg-white">
                <h1 className="text-2xl font-semibold ml-auto mr-auto">
                    Existing Users Signin 
                </h1>
                
                {message.content && (
                    <div className="ml-auto mr-auto text-red-500 font-semibold">{message.content}</div>
                )}
                
                {/* <form onSubmit={handleOAuthSignIn('google')} className="flex gap-4 flex-col">
                    <button
                        disabled={loading}
                    >
                        Sign In With Google
                    </button>
                </form> */}


                <form onSubmit={handleSignin} className="flex gap-4 flex-col">
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="outline-none border-2 border-red-500 pl-5 h-10 rounded-2xl text-lg w-80 mr-auto ml-auto mt-10"
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
                    Signup Instead
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
