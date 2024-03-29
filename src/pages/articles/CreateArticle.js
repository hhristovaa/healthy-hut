import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { v4 as uuid4 } from 'uuid';
import { uuidv4 } from '@firebase/util';
import { motion } from 'framer-motion';

import Spinner from '../../components/UI/Spinner';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import classes from './Articles.module.scss';

const CreateArticle = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        articleImageUrl: '',
        content: '',
        source: '',
    });

    const { name, articleImageUrl, content, source } = formData;
    const auth = getAuth();
    const navigate = useNavigate();
    const isMounted = useRef(true);

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

        if (name.length === 0 || content.length === 0 || source.length === 0) {
            setLoading(false);
            toast.error('Empty fields are not accepted.');
            return;
        }

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
                        reject(error);

                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            });
        }

        const imageUrl = await Promise.all(
            [...articleImageUrl].map((img) => storeImage(img))).catch(() => {
                setLoading(false);
                toast.error('An error occured while uploading the image.');
                return;
            });

        const formDataCopy = {
            ...formData,
            imageUrl,
            timestamp: serverTimestamp()
        };

        delete formDataCopy.articleImageUrl;
        const docRef = await addDoc(collection(db, 'articles'), formDataCopy);
        setLoading(false);
        toast.success('The article was successfully created!');
        navigate(`/articles/${docRef.id}`)
    }

    const onChange = e => {
        let eTarget = e.target;
        let uploadedFile = eTarget.files;

        if (!uploadedFile) {
            setFormData((prevState) => ({
                ...prevState,
                [eTarget.id]: eTarget.value
            }));
        }
    }

    const handleUpload = e => {
        let eTarget = e.target;
        let uploadedFile = eTarget.files;

        if (uploadedFile) {
            setFormData((prevState) => ({
                ...prevState,
                articleImageUrl: uploadedFile
            }));

            setFile(uploadedFile[0]);
        }
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
        >
            <h1 className={classes['g-title']}>Create Article</h1>
            <form className={classes['articles__form']} onSubmit={onSubmit}>
                <Input type='text' id='name' label='Name' onChange={onChange} value={name} />
                <Input type='text' id='source' label='Source' onChange={onChange} value={source} />
                <Input multiline type='text' id='content' label='Content' onChange={onChange} value={content} />
                <Input type='file' id='articleImageUrl' label='Image' onChange={handleUpload} accept='.jpg, .png, .jpeg' />
                <span className={classes['articles__img-label']}>{file ? file?.name : 'No file chosen'}</span>
                <Button type='submit' version='primary'>Create Article</Button>
            </form>
        </motion.main>
    )
}

export default CreateArticle;