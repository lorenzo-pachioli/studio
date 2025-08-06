import "server-only";
import admin from "firebase-admin";

interface FirebaseAdminAppParams {
    projectId: string;
    clientEmail: string;
    storageBucket: string;
    privateKey: string;
}

function formatPrivateKey(privateKey: string): string {
    return privateKey.replace(/\\n/g, '\n');    
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
   const privateKey = formatPrivateKey(params.privateKey);

   if (admin.apps.length > 0) {
       return admin.app();
   }

   const cert = admin.credential.cert({
       projectId: params.projectId,
       clientEmail: params.clientEmail,
       privateKey: privateKey
   });

   return admin.initializeApp({
       credential: cert,
       projectId: params.projectId,
       storageBucket: params.storageBucket
   });
}

export async function initAdminApp() {
    const params = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!
    }

    return createFirebaseAdminApp(params);
}