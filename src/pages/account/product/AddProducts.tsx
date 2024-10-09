import { v1 as uuidv1 } from "uuid";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Card,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  FormGroup,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  FormLabel,
  RadioGroup,
  Radio,
  Divider,
  Autocomplete,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveIcon from "@mui/icons-material/Remove";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useFetchSubCategories } from "../../../hooks/useFetchSubCategories";
import { ICategory } from "../../../types/categories";
import { toast } from "react-toastify";
import { addUpdateProductResponse } from "../../../api/productsApi";
import { setError } from "../../../redux/wishlistSlice";
import { useLazyFetchSizesQuery } from "../../../rtk-query/productApiSlice";

interface ImageData {
  id: string;
  side: string;
  file: File | null;
  isCover: boolean;
  fileName: string;
  isDeleted: boolean;
}

interface PriceListData {
  id: number;
  qtyFrom: string;
  qtyTo: string;
  price: string;
}

interface FormData {
  productId: number | undefined;
  productName: string;
  styleName: string;
  otherCategory: string;
  category: string;
  description: string;
  colors: string;
  sizes: string;
  status: boolean;
  leftHeading1: string;
  leftHeading1Content: string;
  leftHeading2: string;
  leftHeading2Content: string;
}

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "flex-start",
  "& .MuiTypography-root": {
    marginBottom: theme.spacing(1),
  },
}));

const colorOptions = ["Red", "Blue", "Green", "Black", "White"];

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const AddProducts = () => {
  // const [sizeOptions,setSizeOptions] = useState();

  // const loadSizes = async () => {
  //     setLoading(true);
  //     try {
  //       const data: any = await fetchAllServices();
  //       setSizeOptions(data?.data);
  //     } catch (error) {
  //       setError("Failed to fetch services");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   useEffect(() => {
  //     loadSizes();
  //   }, []);\\\\

  const [sizeOptions, setSizeOptions] = React.useState<{id: number, name: string}[]>([]);

  const [fetchSizes] = useLazyFetchSizesQuery({});

  const getSizesList = () => {
    void fetchSizes({})?.then((res) => {
        const responseBody = res?.data;

        const modifedSizeOptions = responseBody?.data?.map((size: any) => {
            return {
                id: size?.id,
                name: size?.name
            }
        })

        setSizeOptions(modifedSizeOptions)
    })
  }


  const userId = JSON.stringify(localStorage.getItem("userId") as string);

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [newSize, setNewSize] = useState("");

  const handleCategoryChange = (e: any) => {
    const selectedCategoryId = e.target.value as number;
    const selectedCat =
      categories.find((cat) => cat.id === selectedCategoryId) || null;

    formik.setFieldValue("category", selectedCat?.key);
    setSelectedCategory(selectedCat);
  };

  const [imgList, setImgList] = useState<ImageData[]>([
    {
      id: uuidv1(),
      side: "",
      file: null,
      isCover: true,
      fileName: "",
      isDeleted: false,
    },
  ]);

  const { categories, subCategories } = useSelector(
    (state: RootState) => state.categories
  );
  const { fetchSubCategories } = useFetchSubCategories();

  useEffect(() => {
    if (selectedCategory?.id) {
      fetchSubCategories(selectedCategory?.id as number);
    }
  }, [selectedCategory]);

  const handleFileUpload =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event?.target?.files;
      if (files && files?.length > 0) {
        const file: any = files[0];

        const fileExtension = file?.name?.split(".").pop().toLowerCase();
        const acceptedFormats = ["png", "jpeg", "jpg", "webp"];
        if (!acceptedFormats.includes(fileExtension)) {
          toast.error("Invalid file format!");
          return;
        }

        setImgList((prev) =>
          prev.map((img) =>
            img?.id === id
              ? {
                  ...img,
                  file,
                  fileName: `${img?.side}-${uuidv1()}.${fileExtension}`,
                }
              : img
          )
        );
      }
    };
  const handleCheckboxIsCover = (selectedId: string) => {
    setImgList((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        isCover: item.id === selectedId,
      }))
    );
  };

  const handleAddImage = () => {
    setImgList((prev) => [
      ...prev,
      {
        id: uuidv1(),
        side: "",
        file: null,
        isCover: false,
        fileName: "",
        isDeleted: false,
      },
    ]);
  };

  const handleRemoveImage = (id: string) => () => {
    setImgList((prev) => prev.filter((img) => img?.id !== id));
  };

  const [priceList, setPriceList] = useState<PriceListData[]>([
    { id: 1, qtyFrom: "", qtyTo: "", price: "" },
  ]);

  const handleAddRow = () => {
    setPriceList((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, qtyFrom: "", qtyTo: "", price: "" },
    ]);
  };

  const handleDeleteRow = (id: number) => {
    setPriceList((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  const [isModalOpen, setIsModalOpen] = useState(false); 


  const handleAddSize = () => {
    if (newSize) {
    //   setSizeOptionsState([...sizeOptionsState, newSize]);
      setNewSize('');
      setIsModalOpen(false); 
    }
  };

  const handleInputChange = (
    id: number,
    field: keyof PriceListData,
    value: string
  ) => {
    setPriceList((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const [selectedStatus, setSelectedStatus] = useState("enabled");

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  const formik = useFormik<FormData>({
    initialValues: {
      productId: undefined,
      productName: "",
      styleName: "",
      otherCategory: "",
      category: "",
      description: "",
      colors: "",
      sizes: "",
      status: true,
      leftHeading1: "",
      leftHeading1Content: "",
      leftHeading2: "",
      leftHeading2Content: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Product Name is required"),
      styleName: Yup.string().required("Style Name is required"),
      category: Yup.string().required("Category is required"),
      description: Yup.string().required("Description is required"),
      sizes: Yup.string().required("Sizes are required"),
      colors: Yup.string().required("Colors are required"),
    }),
    onSubmit: async (values) => {
      if (
        imgList?.filter(
          (x) =>
            x.side.trim() === "" ||
            (x.file == null && x.fileName === "" && x.isDeleted === false)
        ).length > 0
      ) {
        toast.error("Please enter product image and it's side!");
      } else {
        if (priceList?.filter((x) => +x.price === 0).length > 0) {
          toast.error("Please enter quantity range and price!");
        } else {
          const payload = {
            productName: values?.productName,
            styleName: values?.styleName,
            otherCategory: values?.otherCategory,
            category: values?.category,
            description: values?.description,
            colors: values?.colors,
            sizes: values?.sizes,
            status: values?.status,
            leftHeading1: values?.leftHeading1,
            leftHeading1Content: values?.leftHeading1Content,
            leftHeading2: values?.leftHeading2,
            leftHeading2Content: values?.leftHeading2Content,
          };

          const convertPriceList = priceList?.map((price) => {
            return {
              qtyFrom: +price?.qtyFrom,
              qtyTo: +price?.qtyTo,
              price: +price?.price,
            };
          });

          const formData = new FormData();

          imgList.forEach((item) => {
            formData.append("upload_file", item?.file ?? "");
          });

          formData.append("content", JSON.stringify(payload));
          formData.append("imgList", JSON.stringify(imgList));
          formData.append("priceList", JSON.stringify(convertPriceList));
          formData.append("userId", userId);
          console.log({ convertPriceList, imgList, payload });
          console.log(formData);
        }
      }
    },
  });

  const [sizeOpen, setSizeOpen] = React.useState(true);
  const [colorOpen, setColorOpen] = React.useState(false);
  const [colorOptionsState, setColorOptionsState] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleSizeOpen = () => {
    getSizesList()
  };

  const handleSizeClose = () => {
    setSizeOpen(false);
    setSizeOptions([]);
  };

  const handleColorOpen = () => {
    setColorOpen(true);
    (async () => {
      setLoading(true);
      await sleep(1000);
      setLoading(false);

      setColorOptionsState(colorOptions);
    })();
  };

  const handleColorClose = () => {
    setColorOpen(false);
    setColorOptionsState([]);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white m-4 rounded-lg"
    >
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
        <div className="flex justify-between">
          <div className="font-bold">Add Product</div>
        </div>
        <div className="flex w-full gap-4">
          <div className="flex-[3] flex flex-col gap-4">
            <Card className="p-4 flex flex-col gap-4">
              <div className="font-bold">General</div>
              <TextField
                label="Product Name"
                name="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
                fullWidth
                onBlur={formik.handleBlur}
                error={
                  formik.touched.productName &&
                  Boolean(formik.errors.productName)
                }
                helperText={
                  formik.touched.productName && formik.errors.productName
                }
              />
              <div className="flex gap-4">
                <TextField
                  label="Style Name"
                  name="styleName"
                  value={formik.values.styleName}
                  onChange={formik.handleChange}
                  fullWidth
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.styleName && Boolean(formik.errors.styleName)
                  }
                  helperText={
                    formik.touched.styleName && formik.errors.styleName
                  }
                />
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    label="Category"
                    value={selectedCategory?.id || ""}
                    onChange={handleCategoryChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.category && formik.errors.category && (
                    <div className="text-red-600 text-xs">
                      {formik.errors.category}
                    </div>
                  )}
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Other Category</InputLabel>
                  <Select
                    name="otherCategory"
                    label="Other Category"
                    value={formik.values.otherCategory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.otherCategory &&
                      Boolean(formik.errors.otherCategory)
                    }
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    {subCategories?.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.otherCategory &&
                    formik.errors.otherCategory && (
                      <div className="text-red-600 text-xs">
                        {formik.errors.otherCategory}
                      </div>
                    )}
                </FormControl>
              </div>
              <TextField
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={3}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Card>
            <Card className="p-4 flex flex-col gap-4">
              <div className="font-bold">Upload Images</div>
              {imgList.map((img) => (
                <div
                  key={img?.id}
                  className="flex flex-wrap gap-4 items-center"
                >
                  <div className="flex flex-1 gap-4">
                    <TextField
                      id={`sideName-${img?.id}`}
                      name={`sideName-${img?.id}`}
                      label="Side Name"
                      value={img?.side}
                      onChange={(e) =>
                        setImgList((prev) =>
                          prev.map((i) =>
                            i.id === img?.id
                              ? { ...i, side: e.target.value }
                              : i
                          )
                        )
                      }
                      fullWidth
                      sx={{ flex: "1 1 300px" }}
                    />
                    <TextField
                      fullWidth
                      label="Upload File (Preffered size: 512 × 768 px)"
                      InputLabelProps={{
                        sx: {
                          fontSize: '0.8rem',
                        },
                      }}
                      value={img?.fileName || ""}
                      className="cursor-pointer"
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <input
                              accept=".png,.jpeg,.jpg,.webp"
                              style={{ display: "none" }}
                              id={`upload-file-${img?.id}`}
                              type="file"
                              onChange={handleFileUpload(img?.id)}
                            />
                            <label htmlFor={`upload-file-${img?.id}`}>
                              <IconButton color="primary" component="span">
                                <UploadIcon />
                              </IconButton>
                            </label>
                          </InputAdornment>
                        ),
                        sx: {
                          pointerEvents: "none",
                        },
                      }}
                      sx={{ flex: "1 1 300px" }}
                      onClick={() =>
                        document
                          .getElementById(`upload-file-${img?.id}`)
                          ?.click()
                      }
                    />
                  </div>
                  <FormGroup>
                    <StyledFormControlLabel
                      control={
                        <Checkbox
                          checked={img?.isCover}
                          onChange={() => handleCheckboxIsCover(img?.id)}
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </FormGroup>
                  {imgList?.length > 1 && (
                    <div className="flex gap-2">
                      <IconButton
                        color="error"
                        onClick={handleRemoveImage(img?.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex justify-end mt-2">
                <IconButton color="primary" onClick={handleAddImage}>
                  <AddBoxIcon />
                </IconButton>
              </div>
            </Card>
            <Card className="p-4 flex flex-col gap-4">
              <div className="font-bold">Attribute</div>
              <div className="flex ">
                <div className="flex-[2] flex flex-col gap-8 ">
                  <Autocomplete
                    multiple
                    open={sizeOpen}
                    onOpen={handleSizeOpen}
                    onClose={handleSizeClose}
                    options={sizeOptions}
                    loading={loading}
                    onChange={(event, newValue) => {
                      formik.setFieldValue("sizes", newValue);
                    }}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sizes"
                        fullWidth
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.sizes && Boolean(formik.errors.sizes)
                        }
                        helperText={formik.touched.sizes && formik.errors.sizes}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />

                  {/* Color Autocomplete */}
                  <Autocomplete
                    multiple
                    open={colorOpen}
                    onOpen={handleColorOpen}
                    onClose={handleColorClose}
                    options={colorOptionsState}
                    loading={loading}
                    // value={formik.values.colors}
                    onChange={(event, newValue) => {
                      formik.setFieldValue("colors", newValue); // Update formik value
                    }}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Colors"
                        fullWidth
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.colors && Boolean(formik.errors.colors)
                        }
                        helperText={
                          formik.touched.colors && formik.errors.colors
                        }
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                  <div className="flex-[5] px-2">
                    <TableContainer>
                      <Table sx={{ border: "none" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography className="!font-bold text-[1rem]">
                                Min Quantity
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography className="!font-bold text-[1rem]">
                                Max Quantity
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography className="!font-bold text-[1rem]">
                                Price
                              </Typography>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {priceList.map((row, index) => (
                            <TableRow
                              key={row?.id}
                              sx={{ borderBottom: "none" }}
                            >
                              <TableCell>
                                <TextField
                                  type="number"
                                  fullWidth
                                  variant="outlined"
                                  value={row?.qtyFrom}
                                  placeholder="0"
                                  onChange={(e) =>
                                    handleInputChange(
                                      row?.id,
                                      "qtyFrom",
                                      e.target.value
                                    )
                                  }
                                  inputProps={{ min: 0 }}
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  type="number"
                                  fullWidth
                                  variant="outlined"
                                  placeholder="0"
                                  value={row?.qtyTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      row?.id,
                                      "qtyTo",
                                      e.target.value
                                    )
                                  }
                                  inputProps={{ min: 0 }}
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  type="number"
                                  fullWidth
                                  variant="outlined"
                                  placeholder="0"
                                  value={row?.price}
                                  onChange={(e) =>
                                    handleInputChange(
                                      row?.id,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                  inputProps={{ min: 0 }}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-4">
                                  {priceList?.length > 1 && (
                                    <IconButton
                                      color="error"
                                      onClick={() => handleDeleteRow(row?.id)}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  )}
                                  {index === priceList?.length - 1 && (
                                    <IconButton
                                      color="primary"
                                      onClick={handleAddRow}
                                    >
                                      <AddBoxIcon />
                                    </IconButton>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </Card>
            <div className="flex justify-between mt-4">
              <Button
                variant="outlined"
                className="!text-red-500 !border-red-500 w-32"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className="!text-black !border-black !rounded-lg w-32"
                disabled={formik.isSubmitting}
              >
                Submit
              </Button>
            </div>
          </div>
          <div className="flex-[1]">
            <Card className="p-4 flex flex-col gap-4">
              <div className="font-bold">Product Status</div>

              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <p className="font-bold text-sm">Status</p>
                </FormLabel>
                <RadioGroup
                  aria-label="status"
                  name="status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <FormControlLabel
                    value="enabled"
                    control={<Radio />}
                    label="Enabled"
                  />
                  <FormControlLabel
                    value="disabled"
                    control={<Radio />}
                    label="Disabled"
                  />
                </RadioGroup>
              </FormControl>
              <Divider />
              <div className="font-bold">Left Top Section</div>
              <TextField
                label="Heading"
                name="leftHeading1"
                value={formik.values.leftHeading1}
                onChange={formik.handleChange}
                fullWidth
              />
              <TextField
                label="Content"
                name="leftHeading1Content"
                value={formik.values.leftHeading1Content}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={2}
              />
              <Divider />
              <div className="font-bold">Left Bottom Section</div>
              <TextField
                label="Heading"
                name="leftHeading2"
                value={formik.values.leftHeading2}
                onChange={formik.handleChange}
                fullWidth
              />
              <TextField
                label="Content"
                name="leftHeading2Content"
                value={formik.values.leftHeading2Content}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Add New Size</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Size"
            type="text"
            fullWidth
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSize} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

    </form>
  );
};

export default AddProducts;
