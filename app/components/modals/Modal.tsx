"use client";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  const [showModal, setShowModal] = useState(props.isOpen);

  useEffect(() => {
    setShowModal(props.isOpen);
  }, [props.isOpen]);

  // HANDLE CLOSE MODAL
  const handleClose = useCallback(() => {
    if (props.disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      props.onClose();
    }, 300);
  }, [props.onClose, props.disabled]);

  // HANDLE SUBMIT BUTTON INSIDE MODAL
  const handleSubmit = useCallback(() => {
    if (props.disabled) {
      return;
    }
    props.onSubmit();
  }, [props.onSubmit, props.disabled]);

  // HANDLE SECONDARY ACTION INSIDE MODAL
  const handleSecondaryAction = useCallback(() => {
    if (props.disabled || !props.secondaryAction) {
      return;
    }
    props.secondaryAction();
  }, [props.secondaryAction, props.disabled]);

  // DiSABLE ANYTHING IF NOT OPEN
  if (!props.isOpen) {
    return null;
  }

  return (
    <>
      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* CONTENT MODAL */}
          <div
            className={`translate duration-300 h-full
                    ${showModal ? "translate-y-0" : "translate-y-full"}
                    ${showModal ? "opacity-100" : "opacity-0"}
                `}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg  shadow-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div
                onClick={() => handleClose()}
                className="flex  items-center p-6 rounded- justify-center relative border-b-[1px]"
              >
                <button className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{props.title}</div>
              </div>

              {/* BODY */}
              <div className="relative p-6 flex-auto">{props.body}</div>

              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {props.secondaryAction && props.secondaryActionLabel && (
                    <Button
                      disabled={props.disabled}
                      label={props.secondaryActionLabel!}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={props.disabled}
                    label={props.actionLabel!}
                    onClick={handleSubmit}
                  />
                </div>
                {props.footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
