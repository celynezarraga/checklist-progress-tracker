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
  const { title, description } = values;
  const invalidTitle = !(title.length > 0);
  const titleLengthExceeded = title.length > 100;
  const descriptionLengthExceeded = description.length > 500;
  setInvalidValues({
    title: invalidTitle || titleLengthExceeded,
    description: descriptionLengthExceeded
  });
  if (titleLengthExceeded || descriptionLengthExceeded) {
    setErrorMessage(
      `${titleLengthExceeded ? "Title must be at most 100 characters. " : ""}
      ${descriptionLengthExceeded ? "Description must be at most 500 characters. " : ""}`
    );
  }
};