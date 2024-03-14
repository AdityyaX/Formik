import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = { "login": false, "user" : "" };

export const userSlice=createSlice({ name: "userLogin",
initialState: { value: initialState },
reducers: {
    login: (state, action) => {
        if(action.payload.user === "admin" ){
            action.payload.login = true;
            console.log("hehe user login done");
        }
        state.value = action.payload;
      
    },
    logout: (state,action) => {
        action.payload.login = false;
    }
}
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;