import store from "../app/store";
import {setModalDefault} from "../app/slice";
import {auth, firestore} from "../firebase/Firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";

export const createUserWithEmailAndPasswordApi = (values) => {
    const user = firestore.collection("user");
    return createUserWithEmailAndPassword(auth, values.user.email, values.user.password)
        .then((userCredential) => {
            const userInfo = userCredential.user;
            user.doc(userInfo.uid).set({
                ...values.user,
                photoURL : "https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_1280.png"
            });
        })
        .catch((error) => {
            console.error('이메일 가입시 에러 : ', error);
            switch(error.code){
                case "auth/email-already-in-use":
                    store.dispatch(setModalDefault({show: true, type: "email-already-in-use"}));
                    break;
                case "auth/weak-password":
                    store.dispatch(setModalDefault({show: true, type: "weak-password"}));
                    break;
                default:
                    store.dispatch(setModalDefault({show: true, type: "join-fail"}));
                    break;
            }
        });
};
