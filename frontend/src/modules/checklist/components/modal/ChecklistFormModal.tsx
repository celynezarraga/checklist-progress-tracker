import React, {
  FC,
  FormEvent,
  useEffect,
  useState
} from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Tooltip,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import InputField from "@/common/components/InputField";
import TextAreaField from "@/common/components/TextAreaField";
import {
  ChecklistFormInitialInvalidValues,
  ChecklistFormInitialValues,
  ChecklistFormInvalidValues,
  ChecklistFormValues,
  validateChecklistFormInput
} from "../../utils/checklistForm";
import { ChecklistFormData } from "../../types/checklist";
import {
  ChecklistFormModalAction,
  ChecklistFormModalDataType
} from "../../utils/checklistFormModal";
import { RootState } from "@/store/store";

interface ChecklistFormModalProps {
  modalData: ChecklistFormModalDataType;
  handleSubmit: (formData: ChecklistFormData) => void;
  initialValues?: ChecklistFormData;
}

const ChecklistFormModal: FC<ChecklistFormModalProps> = ({
  modalData,
  handleSubmit,
  initialValues = ChecklistFormInitialValues
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    actionType, errorToastMessage, successToastMessage,
    icon, iconTooltip, header, buttonText
  } = modalData;

  const [formValues, setFormValues] = useState<ChecklistFormValues>(initialValues);
  const [invalidValues, setInvalidValues] =
    useState<ChecklistFormInvalidValues>(ChecklistFormInitialInvalidValues);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [isEdit, _setIsEdit] = useState<boolean>(
    [ChecklistFormModalAction.EDIT_ITEM, ChecklistFormModalAction.EDIT_SUB_ITEM]
      .includes(actionType)
  );

  const { loading, success, error, type } = useSelector(
    (state: RootState) => state.checklist
  );


  useEffect(() => {
    if (!loading && error && isSubmitted && actionType === type) {
      setInvalidValues({
        title: true,
        description: true
      });
      setErrorMessage(error);
      setIsSubmitted(false);
      toast({
        title: errorToastMessage,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [
    error,
    errorToastMessage,
    loading,
    toast,
    isSubmitted,
    actionType,
    type
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOnClose = () => {
    setFormValues(initialValues);
    setInvalidValues(ChecklistFormInitialInvalidValues);
    setIsSubmitted(false);
    onClose();
  };

  useEffect(() => {
    if (!loading && success && isSubmitted && formValues.title !== "" && actionType === type) {
      handleOnClose();
      toast({
        title: successToastMessage,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [
    handleOnClose,
    loading,
    success,
    isSubmitted,
    toast,
    successToastMessage,
    formValues,
    actionType,
    type
  ]);

  useEffect(() => {
    validateChecklistFormInput(
      formValues,
      setInvalidValues,
      setErrorMessage
    );
  }, [formValues]);

  const handleInputChange = (key: string, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value
    });
    setIsSubmitted(false);
  };

  const isEdited = (): boolean => {
    return (initialValues?.title !== formValues.title) ||
    (initialValues?.description !== formValues.description);
  };

  const handleFormSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setIsSubmitted(true);
    if (Object.values(invalidValues).every(item => !item)) {
      if (isEdit && !isEdited()) {
        toast({
          title: "No changes found.",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      handleSubmit(formValues);
    }
  };

  const handleOnModalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <>
      <Tooltip label={iconTooltip} fontSize="sm">
        <Box mx={1} onClick={handleOnModalOpen}>
          { icon }
        </Box>
      </Tooltip>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleOnClose}>
        <form onSubmit={handleFormSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{header}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
              >
                <FormControl>
                  <InputField
                    placeholder="Title"
                    updateValue={(value) => handleInputChange("title", value)}
                    value={formValues.title}
                    isInvalid={isSubmitted && invalidValues.title}
                  />
                </FormControl>
                <FormControl>
                  <TextAreaField
                    placeholder="Description"
                    updateValue={(value) => handleInputChange("description", value)}
                    value={formValues.description}
                    isInvalid={isSubmitted && invalidValues.description}
                  />
                </FormControl>
                {
                  isSubmitted && errorMessage.length > 0 &&
                  <FormControl
                    isInvalid={Object.values(invalidValues).some(item => item)}
                  >
                    <FormErrorMessage>{errorMessage}</FormErrorMessage>
                  </FormControl> 
                }
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme='teal' mr={3}>
                { loading && isSubmitted ? <Spinner colorScheme="teal"/> : buttonText }
              </Button>
              <Button onClick={handleOnClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ChecklistFormModal;