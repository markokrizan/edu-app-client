<script>
  import Form from "../common/forms/Form.svelte";
  import * as yup from "yup";
  import TextInput from "../common/forms/TextInput.svelte";
  import SelectInput from "../common/forms/SelectInput.svelte";
  import httpService from "../../services/httpService";
  import StudyYearInput from "../common/forms/StudyYearInput.svelte";

  export let onComplete;

  let createCourseError = "";

  const onSubmit = async (data) => {
    const courseData = {
      name: data.name,
      semester: data.semester,
      year: data.year,
      espbPoints: data.espbPoints,
      studyPrograms: [
        {
          id: data.studyProgram,
        },
      ],
    };

    try {
      const createdCourse = await httpService.withAuth().request({
        method: "POST",
        url: "api/courses",
        body: JSON.stringify(courseData),
      });

      onComplete && onComplete(createdCourse);
    } catch (e) {
      createCourseError = e.message;
    }
  };
</script>

<Form
  let:handleChange
  let:errors
  let:form
  {onSubmit}
  validationSchema={yup.object().shape({
    name: yup.string().required("Name is required"),
    semester: yup.string().required("Semester is required"),
    year: yup.string().required("Year is required"),
    espbPoints: yup.string().required("ESPB Points is required"),
  })}
  class="w-50"
>
  <h3>Create a new course</h3>
  <p class="text-danger">{createCourseError}</p>
  <TextInput
    name="name"
    label="Name:"
    {handleChange}
    value={form?.name}
    error={errors?.name}
  />
  <SelectInput
    name="semester"
    label="Semester:"
    {handleChange}
    value={form?.semester}
    error={errors?.semester}
    class="mt-2"
    options={{
      SUMMER: "Summer",
      WINTER: "Winter",
      SUMMER_WINTER: "Summer Winter",
    }}
  />
  <StudyYearInput
    name="year"
    label="Year:"
    {handleChange}
    value={form?.year}
    error={errors?.year}
    class="mt-2"
  />
  <TextInput
    name="espbPoints"
    label="ESPB Points:"
    {handleChange}
    value={form?.espbPoints}
    error={errors?.espbPoints}
    variant="number"
  />
  <button class="btn btn-primary mt-2" type="submit">Create</button>
</Form>
