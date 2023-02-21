<script>
  import Form from "../common/forms/Form.svelte";
  import * as yup from "yup";
  import httpService from "../../services/httpService";
  import TextInput from "../common/forms/TextInput.svelte";
  import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from "../../constants";
  import { userStore } from "../../store";

  export let onComplete = () => {};

  let editProfileError = "";

  const user = userStore.getUser();
  $: userRole = $user?.roles?.map((role) => role?.name)[0];

  const ROLE_URL_MAP = {
    [ROLE_ADMIN]: "api/users",
    [ROLE_STUDENT]: "api/students",
    [ROLE_TEACHER]: "api/teachers",
  };

  const onSubmit = async (data) => {
    const url = ROLE_URL_MAP[userRole];

    try {
      if (!url) {
        throw { message: "Cannot map api url to role" };
      }

      const userData = {
        ...$user,
        ...data,
        role: userRole,
      };

      const updatedUser = await httpService.withAuth().request({
        method: "POST",
        url,
        body: JSON.stringify(userData),
      });

      userStore.setUser(userData);

      onComplete && onComplete(updatedUser);
    } catch (e) {
      editProfileError = e.message || e.error;
    }
  };
</script>

<Form
  let:handleChange
  let:errors
  let:form
  {onSubmit}
  validationSchema={yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Email is required"),
    phoneNumber: yup.string().required("Phone number is required"),
  })}
  initialValues={{
    firstName: $user.firstName,
    lastName: $user.lastName,
    email: $user.email,
    phoneNumber: $user.phoneNumber,
  }}
>
  <p class="text-danger">{editProfileError}</p>
  <TextInput
    name="firstName"
    label="First Name:"
    {handleChange}
    value={form?.firstName}
    error={errors?.firstName}
    class="mt-2"
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
    name="phoneNumber"
    label="Phone Number:"
    {handleChange}
    value={form?.phoneNumber}
    error={errors?.phoneNumber}
    class="mt-2"
    variant="text"
  />
  <button class="btn btn-primary mt-2" type="submit">Save</button>
</Form>
