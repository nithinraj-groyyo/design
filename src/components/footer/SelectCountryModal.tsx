import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '100%',
  maxWidth: 600,
  bgcolor: "white",
  p: 4,
};

interface SelectCountryModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function SelectCountryModal({
  open,
  handleClose,
}: SelectCountryModalProps) {
  const [country, setCountry] = React.useState("India");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCountry(event.target.value);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className="w-full sm:min-w-[20rem] md:min-w-[25rem] lg:min-w-[32rem] flex flex-col gap-[1.225rem] mt-3">
            <div className="flex justify-between w-full font-semibold tracking-[0.1em]">
              <div>Which country would you like to shop in?</div>
              <div>
                <CloseIcon onClick={handleClose} className="cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 tracking-[0.145em]">
                <div className="w-[100%] text-xs text-center">
                  Select a country or region
                </div>
                <div className="w-[100%]">
                  <FormControl className="w-full">
                    <Select
                      value={country}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={"India"}>India</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div>
                <Button
                  variant="contained"
                  className="w-[100%] h-[3.5rem] !bg-black text-white"
                  disabled={false}
                >
                  Send
                </Button>
              </div>
            </div>
            <div className="text-xs my-4">
              By continuing, you accept the{" "}
              <span className="underline">Terms & Conditions</span> of your
              chosen country or region.
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}