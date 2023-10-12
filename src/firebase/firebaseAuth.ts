import { auth } from "@firebase/config";
import { redirect } from 'next/navigation';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signInWithRedirect,
  signOut,
  signInAnonymously, 
  AuthProvider} from "firebase/auth";

async function signUp(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }
    return { result, error };
}

async function logOut() {
  try {
    await signOut(auth);
  } catch (e) {
    console.error(e);
  }
}

async function oauthSignIn(provider: AuthProvider, isMobile: boolean = false): Promise<{ result:any, error:any }> {
  let result = null, error = null;
  try {
    if (!isMobile) {
      result = await signInWithPopup(auth, provider);
    } else {
      result = await signInWithRedirect(auth, provider);
    }
    console.log(result.user);
    if (result) {
      return redirect('/')
    }
  } catch (e: any) {
    error = e
  } 
  return { result, error }
}

async function anonSignIn(): Promise<{ result:any, error:any}> {
  let result = null, error = null;
  try {
    result = await signInAnonymously(auth);
  } catch (e:any) {
    error = e;
  }
  return { result, error }
}

export { signUp, signIn, logOut, oauthSignIn, anonSignIn }
