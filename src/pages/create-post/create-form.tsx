import { useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection} from 'firebase/firestore';
import { db } from "../../config/firebase"; 
import { auth } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import {useNavigate} from "react-router-dom"


interface CreateFormdata {
    title:string,
    description: string
}

export const CreateForm = () => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth);
    
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("you must add a description."),
    })

    const { register, handleSubmit, formState: {errors} } = useForm<CreateFormdata>({
        resolver: yupResolver(schema)
    })

    const postRef = collection(db,"posts");
    
    const oncreatepost = async (data:CreateFormdata) => {
       await addDoc(postRef,{
        ...data,
        username:user?.displayName,
        userId:user?.uid,
       });
       navigate("/")
    }

    return (
        <form onSubmit={handleSubmit(oncreatepost)} className="formdata">
            <input type="text" placeholder="Title..." {...register("title")} />
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea placeholder="Description..." {...register("description")} />
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input type="submit" className="submit-form-button"/>
        </form>
    );
}