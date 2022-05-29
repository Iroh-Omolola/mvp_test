// import jwtDecode from 'jwt-decode';
// import store from '../redux/store';

//   /***
//    * Auth Service for getting sessions
//   */

// class AuthService {
//     /**
//      * @constructor
//      */
//     constructor() {
//         this.getUserSession = this.getUserSession.bind(this);
//     }

//     /**
//      * get user session from the state
//      */
//     getUserSession() {
//         const { getState } = store;
//         const { app } = getState();
//         return app?.user?.session;
//     }
//     getUser() {
//         const { getState } = store;
//         const { app } = getState();
//         // console.log("appppp===", app?.user?.user)
//         return app?.user?.user
//     }

//     /**
//      * check auth token session
//      */
//     isLoggedIn() {
//         const token = this.getUserSession();
//         if (token) {
//             try {
//                 const decoded = jwtDecode(token);
//                 const sessionTimeExp = decoded.exp;
//                 return sessionTimeExp > new Date().getDate() / 1000;
//             } catch (e) {
//                 return false;
//             }
//         }
//         return false;
//     }
// }

// export default new AuthService();