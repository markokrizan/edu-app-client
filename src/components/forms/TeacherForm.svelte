<script>
  import Form from "../common/forms/Form.svelte";
  import * as yup from "yup";
  import httpService from "../../services/httpService";
  import TextInput from "../common/forms/TextInput.svelte";
  import { useQueryClient } from "@sveltestack/svelte-query";

  export let teacher = {};

  export let onComplete = () => {};

  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    const studentData = {
      ...teacher,
      ...data
    };

    const returnedTeacher = await httpService.withAuth().request({
      method: "POST",
      url: "api/teachers",
      body: JSON.stringify(studentData),
    });

    if (teacher?.id) {
      await queryClient.setQueryData("teacher", () => returnedTeacher);
    } else {
      await queryClient.refetchQueries(["teachers"], { active: true });
    }

    onComplete && onComplete(returnedTeacher);
  };
</script>

<Form
  let:handleChange
  let:errors
  let:form
  {onSubmit}
  validationSchema={yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email is required"),
    username: yup.string().required("Username is required"),
    personalIdNumber: yup.string().required("Personal id number is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    academicTitle: yup.string().required("Academic Title is required"),
  })}
  initialValues={{
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    email: teacher.email,
    username: teacher.username,
    personalIdNumber: teacher.personalIdNumber,
    phoneNumber: teacher.phoneNumber,
    academicTitle: teacher.academicTitle
  }}
  let:submitError
>
  <p class="text-danger">{submitError}</p>
  <TextInput
    name="firstName"
    label="First Name:"
    {handleChange}
    value={form?.firstName}
    error={errors?.firstName}
    variant="text"
  />
  <TextInput
    name="lastName"
    label="Last Name:"
    {handleChange}
    value={form?.lastName}
    error={errors?.lastName}
    class="mt-2"
    variant="text"
  />
  <TextInput
    name="email"
    label="Email:"
    {handleChange}
    value={form?.email}
    error={errors?.email}
    class="mt-2"
    variant="email"
  />
  <TextInput
    name="username"
    label="Username:"
    {handleChange}
    value={form?.username}
    error={errors?.username}
    class="mt-2"
    variant="text"
  />
  <TextInput
    name="personalIdNumber"
    label="Personal Id number:"
    {handleChange}
    value={form?.personalIdNumber}
    error={errors?.personalIdNumber}
    class="mt-2"
    variant="text"
  />
  <TextInput
    name="phoneNumber"
    label="Phone Number:"
    {handleChange}
    value={form?.phoneNumber}
    error={errors?.phoneNumber}
    class="mt-2"
    variant="text"
  />
  <TextInput
    name="academicTitle"
    label="Academic Title"
    class="mt-2"
    {handleChange}
    value={form?.academicTitle}
    error={errors?.academicTitle}
  />
  <button class="btn btn-primary mt-2" type="submit">Save</button>
</Form>
