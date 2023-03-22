<script>
  import Form from "../common/forms/Form.svelte";
  import * as yup from "yup";
  import httpService from "../../services/httpService";
  import CourseInput from "../common/forms/CourseInput.svelte";
  import TermInput from "../common/forms/TermInput.svelte";
  import TextInput from "../common/forms/TextInput.svelte";
  import DateInput from "../common/forms/DateInput.svelte";

  export let onComplete;

  const onSubmit = async (data) => {
    const examData = {
      course: {
        id: data.course,
      },
      term: {
        id: data.term,
      },
      location: data.location,
      examDate: data.examDate,
    };

    const createdEngagement = await httpService.withAuth().request({
      method: "POST",
      url: "api/exams",
      body: JSON.stringify(examData),
    });

    onComplete && onComplete(createdEngagement);
  };
</script>

<Form
  let:handleChange
  let:errors
  let:form
  let:submitError
  {onSubmit}
  validationSchema={yup.object().shape({
    examDate: yup.string().required("Exam date is required"),
    location: yup.string().required("Location is required"),
    term: yup.string().required("Term is required"),
    course: yup.string().required("Course is required"),
  })}
>
  <p class="text-danger">{submitError}</p>
  <DateInput
    name="examDate"
    label="Exam Date:"
    {handleChange}
    value={form?.examDate}
    error={errors?.examDate}
    class="mt-2"
  />
  <TextInput
    name="location"
    label="Location:"
    {handleChange}
    value={form?.location}
    error={errors?.location}
    class="mt-2"
    variant="text"
  />
  <TermInput
    name="term"
    label="Term"
    {handleChange}
    value={form?.term}
    error={errors?.term}
    class="mt-2"
  />
  <CourseInput
    name="course"
    label="Course"
    {handleChange}
    value={form?.course}
    error={errors?.course}
    class="mt-2"
  />
  <button class="btn btn-primary mt-2" type="submit">Save Exam</button>
</Form>
