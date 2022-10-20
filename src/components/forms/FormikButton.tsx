import { Button, ButtonProps } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import React from "react";

interface props extends ButtonProps {
  goBack?: boolean;
}

export default function FormikButton({ goBack, ...props }: props) {
  const formik = useFormikContext();

  return (
    <Button
      isLoading={formik.isSubmitting}
      {...props}
      onClick={(e) => {
        formik.handleSubmit();
        if (props.onClick) props.onClick(e);
      }}
    />
  );
}
