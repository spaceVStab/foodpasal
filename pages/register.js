import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/utils/useUser";

const SignUp = () => {
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState({ type: '', content: '' });
	const router = useRouter();
	const { signUp } = useUser();

	const handleSignup = async (e) => {
		e.preventDefault();

		setLoading(true);
		setMessage({});

		const {error, user} = await signUp({ "email": email, "password": password});
		if(error){
			setMessage({type:'error', content: error.message});
		}
		else{
			if(user){
				setUser(user);
			}
		}
		setLoading(false);
	}

	useEffect(() => {
		if(user){
			router.replace('/')
		}
	}, [user]);

	if(user){
		return(
			<div className="flex flex-col">
				<p className="text-xl font-bold self-center p-10">Redirecting...</p>
			</div>
		)
	}

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-semibold ml-auto mr-auto">
				Sign Up with Email Id
			</h1>

			{message.content && (
				<div className="ml-auto mr-auto text-red-500 font-semibold">{message.content}</div>
			)}

			<form onSubmit={handleSignup} className="flex flex-col gap-4">
				<input 
					type="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					required
					className="outline-none border-2 border-red-500 pl-5 h-10 rounded-2xl text-lg w-80 mr-auto ml-auto mt-10"
				/>
				<input 
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					className="outline-none border-2 border-red-500 pl-5 h-10 rounded-2xl text-lg w-80 mr-auto ml-auto"
				/>
				<button
					className="hover:bg-gray-400"
					type="submit"
					disabled={ !email.length || !password.length}
					className="text-white mb-8 bg-red-500 h-10 font-semibold w-80 mr-auto ml-auto rounded-3xl border-2 text-xl border-red-500 md:hover:bg-red-200 md:hover:text-red-600 transform md:hover:scale-110 transition md:ease-in md:duration-150"
				>
					Sign Up 
				</button>
			</form>
		</div>
	)
}

export default SignUp;