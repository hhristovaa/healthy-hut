import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '../../firebase.config';
import {
	doc,
	serverTimestamp,
	setDoc,
	deleteDoc,
	getDoc,
    query,
    collection,
    orderBy,
    getDocs
} from "firebase/firestore";
import { toast } from "react-toastify";

export const addFavorite = createAsyncThunk(
	"favorites/addFavorite",
	async ({ id, image, title }, { getState, rejectWithValue }) => {
		try {
			const { uid } = getState().auth.user;

			const favoriteDocRef = doc(db, `users/${uid}/favorites/${id}`);

			await setDoc(favoriteDocRef, {
				id,
				image,
				title,
				timestamp: serverTimestamp()
			});

			toast.success("Favorite added");
		} catch (err) {
			toast.error("Something went wrong");

			return rejectWithValue(err.message);
		}
	}
);

export const removeFavorite = createAsyncThunk(
	"favorites/removeFavorite",
	async (id, { getState, rejectWithValue }) => {
		try {
			const { uid } = getState().auth.user;

			const favoriteDocRef = doc(db, `users/${uid}/favorites/${id}`);

			await deleteDoc(favoriteDocRef);

			toast.success("Favorite  removed");
		} catch (err) {
			toast.error("Something went wrong");

			return rejectWithValue(err.message);
		}
	}
);

export const checkFavorite = createAsyncThunk(
	"favorites/checkFavorite",
	async (id, { getState, rejectWithValue }) => {
		try {
			const { uid } = getState().auth.user;

			const favoriteDocRef = doc(db, `users/${uid}/favorites/${id}`);

			const favoriteDocSnap = await getDoc(favoriteDocRef);

			return favoriteDocSnap.exists();
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const fetchFavorites = createAsyncThunk(
	"favorites/fetchFavorites",
	async (_, { getState, rejectWithValue }) => {
		try {
			const { uid } = getState().auth.user;

			const q = query(
				collection(db, `users/${uid}/favorites`),
				orderBy("timestamp", "desc")
			);

			const querySnap = await getDocs(q);

			const docs = querySnap.docs.map((doc) => {
				const { id, image, title } = doc.data();

				return { id, image, title };
			});

			return docs;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);