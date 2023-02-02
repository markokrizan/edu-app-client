<script>
  import Form from "../common/forms/Form.svelte";
  import * as yup from "yup";
  import SelectInput from "../common/forms/SelectInput.svelte";
  import httpService from "../../services/httpService";
  import TeacherInput from "../common/forms/TeacherInput.svelte";
  import { useQueryClient } from "@sveltestack/svelte-query";

  export let course;
  export let onComplete;

  const queryClient = useQueryClient();

  let createEngagementError = "";

  const onSubmit = async (data) => {
    const engagementData = {
      course: {
        id: course.id,
      },
      engagementType: data.engagementType,
      teacher: {
        id: data.teacher,
      },
    };

    try {
      const createdEngagement = await httpService.withAuth().request({
        method: "POST",
        url: "api/engagements",
        body: JSON.stringify(engagementData),
      });

      await queryClient.refetchQueries(["course"], { active: true });

      onComplete && onComplete(createdEngagement);
    } catch (e) {
      createEngagementError = e.message || e.error;
    }
  };
</script>

<Form
  let:handleChange
  let:errors
  let:form
  {onSubmit}
  validationSchema={yup.object().shape({
    engagementType: yup.string().required("Engagement type is required"),
    teacher: yup.string().required("Teacher is required"),
  })}
  class="w-50"
>
  <p class="text-danger">{createEngagementError}</p>
  <SelectInput
    name="engagementType"
    label="Engagement Type:"
    {handleChange}
    value={form?.engagementType}
    error={errors?.engagementType}
    class="mt-2"
    options={{
      ASSISTANT: "Assistant",
      PROFESSOR: "Professor",
    }}
  />
  <TeacherInput
    name="teacher"
    label="Teacher"
    {handleChange}
    value={form?.teacher}
    error={errors?.teacher}
    class="mt-2"
  />
  <button class="btn btn-primary mt-2" type="submit">Save Engagement</button>
</Form>
