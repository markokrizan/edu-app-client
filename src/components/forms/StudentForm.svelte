<script>
  import Form from "../common/forms/Form.svelte";
  import * as yup from "yup";
  import httpService from "../../services/httpService";
  import TextInput from "../common/forms/TextInput.svelte";
  import { ROLE_STUDENT } from "../../constants";
  import StudyYearInput from "../common/forms/StudyYearInput.svelte";
  import FinancialStatusInput from "../common/forms/FinancialStatusInput.svelte";
  import StudyProgramInput from "../common/forms/StudyProgramInput.svelte";
  import { useQueryClient } from "@sveltestack/svelte-query";

  export let student = {};

  export let onComplete = () => {};

  let studentUpsertError = "";

  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    try {
      const studentData = {
        ...student,
        ...data,
        role: ROLE_STUDENT,
        studyProgram: {
            id: data.studyProgram
        }
      };

      const returnedStudent = await httpService.withAuth().request({
        method: "POST",
        url: "api/students",
        body: JSON.stringify(studentData),
      });

      if (student?.id) {
        await queryClient.setQueryData('student', () => returnedStudent);
      } else {
        await queryClient.refetchQueries(["students"], { active: true });
      }
      
      onComplete && onComplete(returnedStudent);
    } catch (e) {
      studentUpsertError = e.message || e.error;
    }
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
    email: yup.string().required('Email is required').email("Email is required"),
    username: yup.string().required("Username is required"),
    personalIdNumber: yup.string().required("Personal id number is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    currentStudyYear: yup.string().required("Study Year is required"),
    financialStatus: yup.string().required("Financial Status is required"),
    studyProgram: yup.string().required("Study Program is required"),
  })}
  initialValues={{
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    username: student.username,
    personalIdNumber: student.personalIdNumber,
    phoneNumber: student.phoneNumber,
    currentStudyYear: student.currentStudyYear,
    financialStatus: student.financialStatus,
    studyProgram: student.studyProgram?.id
  }}
>
  <p class="text-danger">{studentUpsertError}</p>
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
  <StudyYearInput
    name="currentStudyYear"
    label="Current study year"
    class="mt-2"
    {handleChange}
    value={form?.currentStudyYear}
    error={errors?.currentStudyYear}
  />
  <FinancialStatusInput
    name="financialStatus"
    label="Financial Status"
    class="mt-2"
    {handleChange}
    value={form?.financialStatus}
    error={errors?.financialStatus}
  />
  <StudyProgramInput
    name="studyProgram"
    label="Study Program"
    {handleChange}
    value={form?.studyProgram}
    error={errors?.studyProgram}
    class="mt-2"
  />
  <button class="btn btn-primary mt-2" type="submit">Save</button>
</Form>
