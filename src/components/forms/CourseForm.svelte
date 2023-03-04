<script>
  import Form from "../common/forms/Form.svelte";
  import * as yup from "yup";
  import TextInput from "../common/forms/TextInput.svelte";
  import SelectInput from "../common/forms/SelectInput.svelte";
  import httpService from "../../services/httpService";
  import StudyYearInput from "../common/forms/StudyYearInput.svelte";
  import StudyProgramInput from "../common/forms/StudyProgramInput.svelte";
  import { useQueryClient } from "@sveltestack/svelte-query";

  export let course = {};
  export let onComplete;
  let clazz = '';
  export { clazz as class };

  const queryClient = useQueryClient();

  let upsertedCourseError = "";

  const onSubmit = async (data) => {
    const courseData = {
      ...course,
      name: data.name,
      semester: data.semester,
      year: data.year,
      espbPoints: data.espbPoints,
      studyPrograms: [
        {
          id: data.studyProgram,
        },
      ],
      engagements: course.engagements.map(engagement => ({ id: engagement.id }))
    };

    try {
      const upsertedCourse = await httpService.withAuth().request({
        method: "POST",
        url: "api/courses",
        body: JSON.stringify(courseData),
      });

      if (course?.id) {
        await queryClient.setQueryData("course", () => upsertedCourse);
      } else {
        await queryClient.refetchQueries(["admin-courses"], { active: true });
      }

      onComplete && onComplete(upsertedCourse);
    } catch (e) {
      upsertedCourseError = e.message;
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
    studyProgram: yup.string().required("Study Program is required"),
  })}
  class={clazz}
  initialValues={{...course, studyProgram: course?.studyPrograms[0]?.id ?? ''}}
>
  <p class="text-danger">{upsertedCourseError}</p>
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
    class="mt-2"
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
