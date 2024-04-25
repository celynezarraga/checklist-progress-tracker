import React, { FC, ReactElement } from "react";
import { Progress } from "@chakra-ui/react";

interface ProgressTrackerProps {
  value: number;
  loading: boolean;
};

const ProgressTracker:FC<ProgressTrackerProps> = ({ value, loading }): ReactElement => {
  return (
    <>
      {
        loading ? null : <> { `${value}%` } </>
      }
      <Progress
        colorScheme='teal'
        value={value}
        isIndeterminate={loading}
      />
    </>
  );
};

export default ProgressTracker;