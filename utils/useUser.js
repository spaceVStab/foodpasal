import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from "./supabaseClient";

export const UserContext = createContext();

export const UserConextProvider = (props) => {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        const session = supabase.auth.session();
        setSession(session);
        setUser(session?.user ?? null);
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
          }
        );
    
        return () => {
          authListener.unsubscribe();
        };
      }, []);

      const value = {
          session, 
          user,
          signIn: (options) => supabase.auth.signIn(options),
          signInWithGoogle: (options) => 
          supabase.auth.signIn(
            {provider:'google'},  
            {redirectTo:'https://khajaghar.stackmystore.com'}),
          signUp: (options) => supabase.auth.signUp(options),
          signOut: () => supabase.auth.signOut()
      }

      return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if(context===undefined){
        throw new Error(`useUser must be within a UserContextProvider`)
    }
    return context;
}