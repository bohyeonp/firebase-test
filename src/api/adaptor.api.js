import store from "../app/store";
import {setModalDefault, setUserProfile} from "../app/slice";
import {auth, firestore} from "../firebase/Firebase";
import {createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, updatePassword, reauthenticateWithCredential} from "firebase/auth";

export const createUserWithEmailAndPasswordApi = (values) => {
    const {email, password} = values.user;
    const user = firestore.collection("user");
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userInfo = userCredential.user;
            user.doc(userInfo.uid).set({
                ...values.user,
                photoNum : "0"
            });
        })
        .catch((error) => {
            console.error('이메일 가입시 에러 : ', error);
            switch(error.code){
                case "auth/email-already-in-use":
                    store.dispatch(setModalDefault({show: true, type: "email-already-in-use"}));
                    break;
                default:
                    store.dispatch(setModalDefault({show: true, type: "join-fail"}));
                    break;
            }
        });
};

export const deleteUserApi = () => {
    const uid = store.getState().common.userProfile.uid;
    const user = firestore.collection("user");
    deleteUser(auth.currentUser).then(() => {
        user.doc(uid).delete();
    }).catch((error) => {
        store.dispatch(setModalDefault({show: true, type: "delete-fail"}));
    });
};

export const updatePasswordApi = (password) => {
    const userProfile = store.getState().common.userProfile
    const credential = EmailAuthProvider.credential(
        userProfile.email,
        password.current
    );
    console.log(credential)
    const uid = store.getState().common.userProfile.uid;
    const user = firestore.collection("user");
    updatePassword(auth.currentUser, password.new).then(() => {
        console.log("비밀번호 변경 성공")
        user.doc(uid).update({ password : password.new});
        store.dispatch(setModalDefault({show: true, type: "pw-update-success"}));
    }).catch((error) => {
        console.log("비밀번호 변경 실패")
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            console.log("사용자 재인증 성공")
            updatePasswordApi(password)
        }).catch((error) => {
            console.log("사용자 재인증 실패")
            store.dispatch(setModalDefault({show: true, type: "pw-update-fail"}));
        });

    });
};

export const updateProfileApi = (values) => {
    const {name, email, photo, birth, phone} = values.user;
    const uid = store.getState().common.userProfile.uid;
    const user = firestore.collection("user");
    user.doc(uid).update({
        name : name,
        //email: email,
        photoNum : photo,
        birth : birth || "",
        phone : phone || ""
    }).then(() => {
        store.dispatch(setModalDefault({show: true, type: "profile-update-success"}));
        reProfileApi();
    });

};

export const reProfileApi = (userId) => {
    const user = firestore.collection("user");
    const uid = userId || store.getState().common.userProfile.uid;
    user.get().then((doc) => {
        doc.forEach((doc2)=>{
            if(doc2.id === uid){
                store.dispatch(setUserProfile({...doc2.data(), ...{uid : uid}}));
            }
        })
    });
};
