<script>
  import Form from "../common/forms/Form.svelte";
  import * as yup from "yup";
  import httpService from "../../services/httpService";
  import TextInput from "../common/forms/TextInput.svelte";
  import DateInput from "../common/forms/DateInput.svelte";
  import dateService from "../../services/dateService";

  export let term = {};

  export let onComplete = () => {};

  const onSubmit = async (data) => {
    const termData = {
      ...term,
      ...data,
    };

    const returnedTerm = await httpService.withAuth().request({
      method: "POST",
      url: "api/terms",
      body: JSON.stringify(termData),
    });

    window.location.reload(); // A dirty hack in order not to deal with the infinite query cache reload issue now

    onComplete && onComplete(returnedTerm);
  };
</script>

<Form
  let:handleChange
  let:errors
  let:form
  {onSubmit}
  validationSchema={yup.object().shape({
    name: yup.string().required("Name is required"),
    from: yup
      .date()
      .typeError("From Date is required")
      .required("From Date is required"),
    to: yup
      .date()
      .test(
        "toAndFromRange",
        "To date must be greater than the from date",
        function (value) {
          const { from } = this.parent;
          const to = value;

          if (!Date.parse(from) || !to) {
            return true;
          }

          return value.getTime() > Date.parse(from);
        }
      )
      .typeError("To Date is required")
      .required("To Date is required"),
  })}
  initialValues={{
    name: term?.name,
    from: term?.from ? dateService.formatDate(term?.from) : undefined,
    to: term?.to ? dateService.formatDate(term?.to) : undefined,
  }}
  let:submitError
>
  <p class="text-danger">{submitError}</p>
  <TextInput
    name="name"
    label="Name:"
    {handleChange}
    value={form?.name}
    error={errors?.name}
    variant="text"
  />
  <DateInput
    name="from"
    label="From:"
    {handleChange}
    value={form?.from}
    error={errors?.from}
    class="mt-2"
  />
  <DateInput
    name="to"
    label="To:"
    {handleChange}
    value={form?.to}
    error={errors?.to}
    class="mt-2"
  />
  <button class="btn btn-primary mt-2" type="submit">Save</button>
</Form>
