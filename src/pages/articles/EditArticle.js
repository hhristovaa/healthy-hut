import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { v4 as uuid4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner';
import { toast } from 'react-toastify';
import { uuidv4 } from '@firebase/util';

const EditArticle = () => {
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        articleImageUrl: '',
        content: '',
        source: '',
    });

    const { name, articleImageUrl, content, source } = formData;

    const auth = getAuth();
    const navigate = useNavigate();
    const params = useParams();
    const isMounted = useRef(true);

    // useEffect(() => {
    //     setLoading(true);
    //     const getArticle = async () => {
    //         const docRef = doc(db, 'articles', params.articleId);
    //         const docSnap = await getDoc(docRef);
            
    //         if(docSnap.exists()){
    //             setArticle(docSnap.data());
    //             setFormData({...docSnap.data()});
    //             setLoading(false);
    //         } else {
    //             navigate('/');
    //             toast.error('Article does not exist!');
    //         }

    //     }

    //     getArticle();

    // }, [params.articleId, navigate]);
//redirect if article is not user's

useEffect(() => {
    if (article && article.userRef !== auth.currentUser.uid) {
        toast.error('You cannot edit that article');
        navigate('/');
    }
});

    //fetch articles to edit 
    useEffect(() => {
        
        const fetchArticle = async () => {
            const docRef = doc(db, 'articles', params.articleId);
            console.log(docRef);
         
            const docSnap = await getDoc(docRef);
            console.log(docSnap);
            if (docSnap.exists()) {
                setArticle(docSnap.data());
                setFormData({...docSnap.data()});
                console.log(docSnap.data());
                setLoading(false);
            }

        }

        fetchArticle();
    }, [navigate, params.articleId]);

    //set to logged user
    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid });
                } else {
                    navigate('/sign-in');
                }
            });

        }

        return () => {
            isMounted.current = false;
        }

    }, [isMounted]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        //edit validation
        if (articleImageUrl.length === 0) {
            setLoading(false);
            toast.error('Image is required');
            return;
        }

        //store image in firebase
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

                const storageRef = ref(storage, `images/${fileName}`);

                const uploadTask = uploadBytesResumable(storageRef, image);

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.log(error);
                        reject(error);

                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            resolve(downloadURL);
                        });
                    }
                );
            });
        }



        const imageUrl = await Promise.all(
            [...articleImageUrl].map((img) => storeImage(img))).catch(() => {
                setLoading(false);
                toast.error('Image was not uplodaed');
                return;
            });

        const formDataCopy = {
            ...formData,
            imageUrl,
            timestamp: serverTimestamp()
        };

        delete formDataCopy.articleImageUrl;

        const docRef = doc(db, 'articles', params.articleId);
        await updateDoc(docRef, formDataCopy);

        setLoading(false);
        toast.success('Article created');
        navigate(`/articles/${docRef.id}`)
    }

    const onChange = e => {
        let eTarget = e.target;

        if (eTarget.files) {
            setFormData((prevState) => ({
                ...prevState,
                articleImageUrl: eTarget.files
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [eTarget.id]: eTarget.value
            }));
        }
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <header>Edit Article</header>
            <main>
                <form onSubmit={onSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input type="text" id="name" onChange={onChange} value={name} />
                    <label htmlFor='content'>Content</label>
                    <textarea id="content" onChange={onChange} value={content} />
                    <label htmlFor='source'>Source</label>
                    <input type="text" id="source" onChange={onChange} value={source} />
                    <label htmlFor='image'>Image</label>

                    <input type="file" id="articleImageUrl" accept='.jpg, .png, .jpeg' onChange={onChange} />
                    <button type="submit">Edit Article</button>
                </form>
            </main>
        </>
    )
}

export default EditArticle;