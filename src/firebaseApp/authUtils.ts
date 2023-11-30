import { auth, googleProvider, githubProvider, facebookProvider } from '@firebaseApp/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  signInAnonymously,
  AuthProvider,
  getRedirectResult,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  OAuthProvider,
  Auth,
  UserCredential,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';

async function signUp(email: string, password: string) {
  let result: any = null,
    error: FirebaseError | null = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    if (e instanceof FirebaseError) error = e;
  }
  return { result, error };
}

async function signIn(email: string, password: string) {
  let result: any = null,
    error: FirebaseError | null = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    if (e instanceof FirebaseError) error = e;
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

function getProvider(providerId: string) {
  switch (providerId) {
    case googleProvider.providerId:
      return googleProvider;
    case githubProvider.providerId:
      return githubProvider;
    case facebookProvider.providerId:
      return facebookProvider;
  }
}

async function signInPopupOrRedirect(
  auth: Auth,
  provider: AuthProvider,
  mobile: boolean = false
): Promise<UserCredential | null> {
  if (!mobile) {
    return signInWithPopup(auth, provider);
  } else {
    signInWithRedirect(auth, provider);
    return getRedirectResult(auth);
  }
}

async function oauthSignIn(provider: AuthProvider, isMobile: boolean = false): Promise<{ result: any; error: any }> {
  let result: any = null,
    error: FirebaseError | null = null;
  try {
    result = await signInPopupOrRedirect(auth, provider, isMobile);
  } catch (e: any) {
    try {
      const providers = await fetchSignInMethodsForEmail(auth, e.customData.email);
      const firstProvider = providers.find((provider) =>
        [googleProvider.providerId, githubProvider.providerId, facebookProvider.providerId].includes(provider)
      );
      if (!firstProvider) {
        throw new Error('Account already linked to a non supported provider.');
      }
      const linkedProvider = getProvider(firstProvider);
      if (!linkedProvider) {
        throw new Error("Couldn't find a supported provider");
      }
      const windowObj = typeof window !== 'undefined' ? window : null;
      const storageObj: Storage | null = windowObj && sessionStorage;
      storageObj &&
        storageObj?.setItem(
          'loginProvider',
          JSON.stringify({
            linkedProvider: firstProvider,
            credentialError: e,
          })
        );
      const newRoute = windowObj && `${windowObj?.origin}/auth/authenticate`;
      newRoute && (windowObj.location.href = newRoute as string);
    } catch (e: any) {
      error = e;
      throw new Error(`Login error: ${e}`);
    }
  }
  return result;
}

async function linkProvidersSignIn(
  provider: AuthProvider,
  credentialError: FirebaseError,
  isMobile: boolean = false
): Promise<{ result: any; error: any }> {
  let result = null,
    error = null;
  try {
    const credential = OAuthProvider.credentialFromError(credentialError);
    const linkedProviderResult = await signInPopupOrRedirect(auth, provider, isMobile);
    result =
      linkedProviderResult && credential ? await linkWithCredential(linkedProviderResult.user, credential) : null;
  } catch (e: any) {
    error = e;
  }
  return { result, error };
}

async function anonSignIn(): Promise<{ result: any; error: any }> {
  let result = null,
    error = null;
  try {
    result = await signInAnonymously(auth);
  } catch (e: any) {
    error = e;
  }
  return { result, error };
}

export { signUp, signIn, logOut, oauthSignIn, anonSignIn, linkProvidersSignIn, getProvider };
