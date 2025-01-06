import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../api/authAPI"


//Login
export const login = createAsyncThunk('auth/login', async ({ password, email }, { rejectWithValue }) => {
    try {
        const response = await authAPI.handleLogin({ password, email });

        if (response.success) {
            return response.data; // return the full response if successful
        } else {
            // In case the response indicates failure, return a custom message
            return rejectWithValue(response.message || "Login failed.");
        }
    } catch (error) {
        return rejectWithValue(error.message || "An error occurred while logging in.");
    }
});


//Check session for authorization
export const checkAuth = createAsyncThunk('auth/checkSession', async (__dirname, { rejectWithValue }) => {
    try {
        const response = await authAPI.checkSession();

        if (response.success) {
            return response.data;
        }
        else {
            return rejectWithValue(response.message || "Session check failed.");
        }
    } catch (error) {
        return rejectWithValue(error.message || "An error occurred while checking the session.");
    }
})

//Register
export const signUp = createAsyncThunk('auth/signUp', async ({ username, cfID, email, password }, { rejectWithValue }) => {
    try {
        const response = await authAPI.handleRegister({ username, cfID, email, password });
        if (response.success) {
            return response.data;
        }
        else {
            return rejectWithValue(response.message || "Sign Up failed");
        }
    } catch (error) {
        return rejectWithValue(error.message || "An error occurred while signing up");
    }
})

//Email Verification
export const verifyEmail = createAsyncThunk('auth/verifyEmail', async ({ email, verificationCode }, { rejectWithValue }) => {
    try {
        const response = await authAPI.handleVerifyEmail({ email, verificationCode });
        if (response.success) {
            return response.data;
        }
        else {
            return rejectWithValue(response.message || "Sign Up failed");
        }
    } catch (error) {
        return rejectWithValue(error.message || "An error occurred while signing up");
    }
})

//Logout
export const logout= createAsyncThunk('auth/logout', async(_, {rejectWithValue})=>{
    try {
       const response= await authAPI.handleLogout();
       if(response.success) {
           return response.message;
       }
       else{
           return rejectWithValue(response.message || "Logout Failed");
       }
    } catch (error) {
       return rejectWithValue(error.message || "An error occured during logout");
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Session Checking
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // User data from server
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload || 'Failed to authenticate';
            })

            //Sign Up
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Logout
            .addCase(logout.pending, (state) => {
                state.loading= true;
                state.error= null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading= false;
                state.user= null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading= false;
                state.error= action.payload;
            })

    }
})

export default authSlice.reducer;