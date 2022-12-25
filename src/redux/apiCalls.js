import { loginFailure,loginStart,loginSuccess  } from "./userRedux";
import { publicRequest ,} from "../requestMethods";
// import { compose } from "redux";

export const login = async (dispatch ,user )=>{

    dispatch (loginStart());
    try{
        const res = await publicRequest.post("/auth/login",user);
        // console.log("111111111111");
        // console.log(res.data);
        dispatch(loginSuccess(res.data));

    }catch(err){
        dispatch(loginFailure());
    }
}

