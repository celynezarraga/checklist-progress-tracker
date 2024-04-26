import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tooltip,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { ChecklistFormModalAction, ChecklistFormModalDataType } from "../../utils/checklistFormModal";

interface ChecklistDeleteConfirmationModalProps {
  modalData: ChecklistFormModalDataType;
  handleSubmit: () => void;
  itemTitle: string;
}

const ChecklistDeleteConfirmationModal: FC<ChecklistDeleteConfirmationModalProps> = ({
  modalData,
  handleSubmit,
  itemTitle,
}) => {
  const { isOpen,
    onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { loading, success, error, type } = useSelector(
    (state: RootState) => state.checklist
  );

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    errorToastMessage, successToastMessage,
    icon, iconTooltip, actionType
  } = modalData;

  useEffect(() => {
    if (!loading && error && isSubmitted && actionType === type) {
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
    isSubmitted,
    loading,
    toast,
    actionType,
    type
  ]);

  useEffect(() => {
    if (!loading && success && isSubmitted && actionType === type) {
      onClose();
      toast({
        title: successToastMessage,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [
    loading,
    success,
    toast,
    successToastMessage,
    onClose,
    isSubmitted,
    actionType,
    type
  ]);

  const handleOnModalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  const handleDelete = () => {
    setIsSubmitted(true);
    handleSubmit();
  };

  return (
    <>
      <Tooltip label={iconTooltip} fontSize="sm">
        <Box mx={1} onClick={handleOnModalOpen}>
          { icon }
        </Box>
      </Tooltip>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>
          {`Delete ${actionType === ChecklistFormModalAction.DELETE_ITEM ? "item" : "subtask"}`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box>
            Are you sure you want to delete:
              <Box as="span" color="gray.600" fontSize="md" fontWeight="bold" >
                { ` ${itemTitle} ` }
              </Box>
            ?
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            { loading && isSubmitted ? <Spinner colorScheme="teal"/> : 'Delete' }
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  );
};

export default ChecklistDeleteConfirmationModal;