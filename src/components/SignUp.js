import React, {useState, useEffect} from "react";
import { ToastContainer} from 'react-toastify';
import { validate } from "./validate";
import { notify } from "./toast";
import 'react-toastify/dist/ReactToastify.css';
import styles from "./SignUp.module.css";

const SignUp = () => {
    const[data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false
    })

    const[errors, setErrors] = useState({});
    const[touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data))
        console.log(errors)
    }, [data, touched])

    const changeHandler = event => {
        if(event.target.name === "isAccepted") {
            setData({...data, [event.target.name]: event.target.checked})
        }else{
            setData({...data, [event.target.name]: event.target.value})
        }
    }

    const focusHandler = event => {
        setTouched({...touched, [event.target.name]: true})
    }

    const submitHandler = event => {
        event.preventDefault();
        if(!Object.keys(errors).length){
            notify ("You Signed in Successfully", "success")
        } else {
            notify ("Invalid data!", "error")
            setTouched ({
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                isAccepted: true
            })
        }
    }

    return(
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={submitHandler}>
                <h2 className={styles.header}>SignUp</h2>
                <div className={styles.formField}>
                    <label>Name</label>
                    <input className={(errors.name && touched.name) ? styles.uncomleted : styles.formInput}
                    type="text" 
                    name="name" 
                    value={data.name} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Email</label>
                    <input className={(errors.email && touched.email) ? styles.uncomleted : styles.formInput }
                    type="text" 
                    name="email" 
                    value={data.email} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <input className={(errors.password && touched.password) ? styles.uncomleted : styles.formInput}
                    type="password" 
                    name="password" 
                    value={data.password} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Confirm Password</label>
                    <input className={(errors.confirmPassword && touched.confirmPassword) ? styles.uncomleted : styles.formInput} 
                    type="password" 
                    name="confirmPassword" 
                    value={data.confirmPassword} 
                    onChange={changeHandler} 
                    onFocus={focusHandler} />
                    {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className={styles.formField}>
                    <div className={styles.checkBoxContainer}>
                    <label>I accept the terms of privacy policy</label>
                    <input
                     type="checkbox" 
                     name="isAccepted" 
                     value={data.isAccepted} 
                     onChange={changeHandler} 
                     onFocus={focusHandler} />
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div>
                <div className={styles.formButtons}>
                    <a href="#">Login</a>
                    <button type="submit">SignUp</button>
                </div>

            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;