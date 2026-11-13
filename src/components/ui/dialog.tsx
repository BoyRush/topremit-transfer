"use client";

import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react";
import * as React from "react";
import { X } from "lucide-react";

export interface DialogProps extends ChakraDialog.RootProps {
  children: React.ReactNode;
}

export const DialogRoot = ChakraDialog.Root;
export const DialogTrigger = ChakraDialog.Trigger;
export const DialogHeader = ChakraDialog.Header;
export const DialogTitle = ChakraDialog.Title;
export const DialogDescription = ChakraDialog.Description;
export const DialogBody = ChakraDialog.Body;
export const DialogFooter = ChakraDialog.Footer;
export const DialogActionTrigger = ChakraDialog.ActionTrigger;

export interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  backdrop?: boolean;
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(props, ref) {
    const { children, portalled = true, portalRef, backdrop = true, ...rest } = props;

    return (
      <Portal disabled={!portalled} container={portalRef}>
        {backdrop && (
          <ChakraDialog.Backdrop
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(4px)",
            }}
          />
        )}
        <ChakraDialog.Positioner padding={4}>
          <ChakraDialog.Content
            ref={ref}
            {...rest}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              boxShadow: "0px 16px 40px rgba(15, 23, 42, 0.15)",
              border: "1px solid #E7EDF5",
              maxWidth: "520px",
              width: "100%",
              overflow: "hidden",
              ...rest.style,
            }}
          >
            {children}
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    );
  }
);

export const DialogCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraDialog.CloseTriggerProps
>(function DialogCloseTrigger(props, ref) {
  return (
    <ChakraDialog.CloseTrigger
      ref={ref}
      {...props}
      style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        cursor: "pointer",
        background: "transparent",
        border: "none",
        color: "#64748B",
        padding: "6px",
        borderRadius: "8px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...props.style,
      }}
    >
      <X size={20} />
    </ChakraDialog.CloseTrigger>
  );
});
