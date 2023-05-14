import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import restaurantApi from "../api/restaurantApi";

const addProductFunc = createAsyncThunk("user/addProductFunc", async (data) => {
  const docRef = collection(db, 'products')

  const storageRef = ref(storage, `productImages/${data.image.name}`)
  const uploadTask = uploadBytesResumable(storageRef, data.image)

  uploadTask.on((error) => {
      toast.error(error.message + 'from slice')
  }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(docRef, {
              title: data.title,
              shortDesc: data.shortDesc,
              desc: data.desc,
              price: data.price,
              quantity: data.quantity,
              category: data.category,
              imgURL: downloadURL
          })
      })
      toast.success('from slice verified')
  })
});

let initialState = {
  isLoading: false,
};

const addProductSlice = createSlice({
  name: "addProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProductFunc.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addProductFunc.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addProductFunc.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export { addProductFunc };

export default addProductSlice.reducer;
