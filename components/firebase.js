import * as firebase from 'firebase/app'
import 'firebase/auth'
import { getAuth } from 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDDDgG4yDPu8c3mrMMHY2ZyPQJDYs-SeO4",
    authDomain: "thetime-capsule.firebaseapp.com",
    projectId: "thetime-capsule",
    storageBucket: "thetime-capsule.appspot.com",
    messagingSenderId: "300164687581",
    appId: "1:300164687581:web:fabc0e4742533b8a921d34"
})
export const auth = getAuth(app)
export default app