//firebase.js
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyDTQjbVoXLAeCA5i7TafVg1cgl_cvBKizk",
    authDomain: "fir-test-9489e.firebaseapp.com",
    projectId: "fir-test-9489e",
    storageBucket: "fir-test-9489e.appspot.com",
    messagingSenderId: "376605197301",
    appId: "1:376605197301:web:aa6a0b118679a2c25456bc",
    measurementId: "G-HL2LLG36MN"
};

// firebaseConfig 정보로 firebase 시작
const app = firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();
const auth = getAuth(app);

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore, auth};
