export interface ChecklistFormValues {
  title: string;
  description: string;
};

export const ChecklistFormInitialValues: ChecklistFormValues = {
  title: "",
  description: "",
};

export interface ChecklistFormInvalidValues {
  title: boolean;
  description: boolean;
};

export const ChecklistFormInitialInvalidValues: ChecklistFormInvalidValues = {
  title: false,
  description: false
};

export const validateChecklistFormInput = (
  values: ChecklistFormValues,
  setInvalidValues: (invalidValues: ChecklistFormInvalidValues) => void,
  setErrorMessage: (error: string) => void,
) => {
  const { title } = values;
  const invalidTitle = !(title.length > 0);
  setInvalidValues({
    title: invalidTitle,
    description: false
  });
};