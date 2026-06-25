import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getStorage,
    ref,
    uploadBytes
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

const firebaseConfig = {

    apiKey: "AIzaSyDOC2ppRVwgdgasFcz2BcQHlaw1tKNZ9kw",

    authDomain: "asesoria-energetica-sara.firebaseapp.com",

    projectId: "asesoria-energetica-sara",

    storageBucket: "asesoria-energetica-sara.firebasestorage.app",

    messagingSenderId: "944053386547",

    appId: "1:944053386547:web:8986e231365c715a3dd246"

};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, ref, uploadBytes };