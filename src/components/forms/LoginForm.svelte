<script>
    import Form from "../common/forms/Form.svelte";
    import TextInput from "../common/forms/TextInput.svelte";
    import * as yup from "yup";

    const onSubmit = async (values) => {
        console.log(values)
    }
</script>

<Form 
    let:handleChange 
    let:errors 
    let:state onSubmit={onSubmit}
    validationSchema={
        yup.object().shape({
            username: yup
            .string()
            .required("Username is required"),
            password: yup.string().required("Password is required")
        })
    }
    class="d-flex justify-content-center align-items-center flex-column"
>
    <h3>Login</h3>
    <TextInput 
        name="username" 
        label="Username:" 
        handleChange={handleChange} 
        value={state?.username} 
        error={errors?.username}
    />
    <TextInput 
        name="password"
        label="Password:"
        handleChange={handleChange}
        value={state?.password}
        error={errors?.password}
        class="mt-2"
    />
    <button 
        class="btn btn-primary mt-2" 
        type="submit"
    >
        Login
    </button>
</Form>
