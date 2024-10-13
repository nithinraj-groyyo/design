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
import React, { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLoadCategoriesWithPaginationQuery, useLoadSubCategoriesWithIdQuery } from "../../../rtk-query/categoriesApiSlice";
import { setError } from "../../../redux/shoppingBagSlice";
import { useGetAllColorsQuery, useGetAllSizesQuery } from "../../../rtk-query/productApiSlice";
import { useUploadSingleFileMutation } from "../../../rtk-query/fileUploadApiSlice";

interface ImageData {
  id: string;
  side: string;
  file: File | null;
  isThumbnail: boolean;
  fileName: string;
  isDeleted: boolean;
  imageUrl: string
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


interface ICategory {
  id: number;
  name: string;
}


const AddProducts = () => {

  const [sizeOpen, setSizeOpen] = React.useState(false);
  const [colorOpen, setColorOpen] = React.useState(false);
  const [colorOptionsState, setColorOptionsState] = React.useState<Array<{ id: number; name: string }>>(
    []
  );
  const [sizeOptionsState, setSizeOptionsState] = React.useState<Array<{ id: number; name: string }>>([]);

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("enabled");
  const [imgList, setImgList] = useState<ImageData[]>([
    { id: uuidv1(), side: "", file: null, isThumbnail: true, fileName: "", isDeleted: false, imageUrl: "" },
  ]);

  const [priceList, setPriceList] = useState<PriceListData[]>([
    { id: 1, qtyFrom: "", qtyTo: "", price: "" },
  ]);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const [uploadSingleFile, { isLoading: isFileLoading }] = useUploadSingleFileMutation()

  const { data: categories, isLoading: isCategoriesLoading, isError } = useLoadCategoriesWithPaginationQuery({ pageIndex: 0, pageSize: 10 });
  const { data: subCategories, refetch, isLoading: isSubCatLoading } = useLoadSubCategoriesWithIdQuery({
    categoryId: selectedCategory?.id!,
    pageIndex: 0,
    pageSize: 10
  });

  const { data: sizes, isLoading: isSizesLoading } = useGetAllSizesQuery({});
  const sizeOptions = sizes?.data;

  const { data: colors, isLoading: isColorsLoading } = useGetAllColorsQuery({});
  const colorOptions = colors?.data;

  useEffect(() => {
    if (selectedCategory) {
      refetch();
    }
  }, [selectedCategory]);

  const userId = JSON.stringify(localStorage.getItem("userId") as string);

  const handleCategoryChange = (e: any) => {
    const selectedCategoryId = e.target.value as number;
    const selectedCat = categories && categories?.find((cat: any) => cat.id === selectedCategoryId) || null;
    formik.setFieldValue("category", selectedCat?.id);
    setSelectedCategory(selectedCat);
  };

  const handleSubCategoryChange = (e: any) => {
    const selectedSubCategoryId = e.target.value;
    formik.setFieldValue("otherCategory", selectedSubCategoryId);
  };


  const handleFileUpload = (id: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files && files?.length > 0) {
      const file: any = files[0];

      const fileExtension = file?.name?.split('.').pop().toLowerCase();
      const acceptedFormats = ["png", "jpeg", "jpg", "webp"];
      if (!acceptedFormats.includes(fileExtension)) {
        toast.error("Invalid file format! Please upload .jpeg, .jpg, .png, or .webp files.");
        return;
      }

      const fileSizeInKB = file.size / 1024;
      if (fileSizeInKB > 100) {
        toast.error("File size must be between 50 KB and 100 KB.");
        return;
      }

      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = async () => {
        const width = image.width;
        const height = image.height;


        const aspectRatio = width / height;
        if (Math.abs(aspectRatio - 1) > 0.01) {
          toast.error("Image must have a square aspect ratio (1:1).");
          return;
        }

        try {
          const reader = new FileReader();

          reader.onloadend = () => {
            const previewUrl = reader.result as string;

            setImgList((prev) =>
              prev.map((img) =>
                img.id === id ? { ...img, file: file, imageUrl: previewUrl, fileName: file.name } : img
              )
            );
          };

          reader.readAsDataURL(file);


          const response = await uploadSingleFile(file).unwrap();
          const responseData = response?.data;
          const fileId = responseData?.id;

          setImgList(prev =>
            prev.map(img =>
              img.id === id
                ? {
                  ...img,
                  file: file,
                  fileName: responseData.fileName,
                  isDeleted: false,
                  id: fileId,
                }
                : img
            )
          );
        } catch (error) {
          toast.error("Error uploading file");
        }
      };
    }
  };

  const handleCheckboxIsThumbnail = (selectedId: string) => {
    setImgList((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        isThumbnail: item.id === selectedId,
      }))
    );
  };

  const handleAddImage = () => {
    setImgList(prev => [
      ...prev,
      { id: uuidv1(), side: "", file: null, isThumbnail: false, fileName: "", isDeleted: false, imageUrl: "" }
    ]);
  };

  const handleRemoveImage = (id: string) => () => {
    setImgList((prev) => prev.filter((img) => img?.id !== id));
  };

  const handleAddRow = () => {
    setPriceList((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, qtyFrom: "", qtyTo: "", price: "" },
    ]);
  };

  const handleDeleteRow = (id: number) => {
    setPriceList((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleAddSize = () => {
    if (newSize) {
      setNewSize("");
      setIsSizeModalOpen(false);
    }
  };
  const handleAddColor = () => {
    if (newSize) {
      setNewColor("");
      setIsColorModalOpen(false);
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
      otherCategory: Yup.string().required("Sub Category is required"),
      description: Yup.string().required("Description is required"),
      sizes: Yup.array()
        .of(Yup.string().required("Each size must be a string"))
        .min(1, "At least one size is required")
        .required("Sizes are required"),
      colors: Yup.array()
        .of(Yup.string().required("Each color must be a string"))
        .min(1, "At least one color is required")
        .required("Colors are required"),
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

  const handleSizeClose = () => {
    setSizeOpen(false);
    setSizeOptionsState([]);
  };

  const handleSizeOpen = () => {
    setSizeOpen(true);
    setSizeOptionsState(sizeOptions);
  };

  const sizeOptionsArray = Object.values(sizeOptionsState);

  const handleColorClose = () => {
    setColorOpen(false);
    setColorOptionsState([]);
  };

  const handleColorOpen = () => {
    setColorOpen(true);
    setColorOptionsState(colorOptions);
  };

  const colorOptionsArray = Object.values(colorOptionsState);

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
                    value={formik.values.category || ""}
                    onChange={handleCategoryChange}
                    onBlur={formik.handleBlur}
                    disabled={isCategoriesLoading}
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                  >
                    {isCategoriesLoading ? (
                      <MenuItem disabled>
                        <CircularProgress size={24} />
                        &nbsp; Loading Categories...
                      </MenuItem>
                    ) : (
                      [
                        <MenuItem key="default" value="">
                          --Select--
                        </MenuItem>,
                        ...(categories?.map((cat: any) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        )) || [])
                      ]
                    )}
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
                    onChange={handleSubCategoryChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.otherCategory && Boolean(formik.errors.otherCategory)}
                    disabled={isSubCatLoading && Boolean(!selectedCategory)}
                    renderValue={(selected) => {
                      if (isSubCatLoading) return "Loading...";
                      const selectedCategory = subCategories?.find(cat => +cat.id === +selected);
                      return selectedCategory ? selectedCategory.name : "--Select--";
                    }}
                  >
                    {isSubCatLoading ? (
                      <MenuItem disabled>
                        <CircularProgress size={24} />
                        &nbsp; Loading Sub-categories...
                      </MenuItem>
                    ) : (
                      [
                        <MenuItem key="default" value="">
                          --Select--
                        </MenuItem>,
                        ...(subCategories?.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        )) || [])
                      ]
                    )}
                  </Select>
                  {formik.touched.otherCategory && formik.errors.otherCategory && (
                    <div className="text-red-600 text-xs">{formik.errors.otherCategory}</div>
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
              {imgList.map(img => (
                <div key={img.id} className="flex flex-wrap gap-8 items-center">
                  <div className="flex flex-1 gap-4">
                    <TextField
                      id={`sideName-${img.id}`}
                      name={`sideName-${img.id}`}
                      label="Side Name"
                      value={img.side}
                      onChange={(e) =>
                        setImgList(prev =>
                          prev?.map(i =>
                            i.id === img.id ? { ...i, side: e.target.value } : i
                          )
                        )
                      }
                      fullWidth
                      sx={{ flex: '1 1 300px' }}
                    />

                    <TextField
                      fullWidth
                      label="Upload File (Preferred size: 1:1 aspect-ratio, Ex: 300*300)"
                      value={img.fileName || ""}
                      className="cursor-pointer"
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <input
                              accept=".png,.jpeg,.jpg,.webp"
                              style={{ display: 'none' }}
                              id={`upload-file-${img.id}`}
                              type="file"
                              onChange={handleFileUpload(img.id)}
                            />
                            <label htmlFor={`upload-file-${img.id}`}>
                              <IconButton color="primary" component="span">
                                <UploadIcon />
                              </IconButton>
                            </label>
                          </InputAdornment>
                        ),
                        sx: {
                          pointerEvents: 'none',
                        },
                      }}
                      sx={{ flex: '6 1 300px' }}
                      onClick={() => document.getElementById(`upload-file-${img.id}`)?.click()}
                    />
                  </div>

                  {img.imageUrl && (
                    <img src={img?.imageUrl} alt={img?.fileName} style={{ width: '100px', height: 'auto' }} />
                  )}

                  <FormGroup>
                    <StyledFormControlLabel
                      control={
                        <Checkbox
                          checked={img.isThumbnail}
                          onChange={() => handleCheckboxIsThumbnail(img.id)}
                          color="primary"
                        />
                      }
                      label="Is Cover"
                    />
                  </FormGroup>

                  {imgList.length > 1 && (
                    <div className="flex gap-2">
                      <IconButton color="error" onClick={handleRemoveImage(img.id)}>
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
              <div className="font-bold">Attributes</div>
              <div className="flex ">
                <div className="flex-[2] flex flex-col gap-8 ">
                  <Autocomplete
                    multiple
                    open={sizeOpen}
                    onOpen={handleSizeOpen}
                    onClose={handleSizeClose}
                    options={sizeOptionsArray}
                    loading={isSizesLoading}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(event, newValue) => {
                      const selectedSizeIds = newValue.map((size) => size.id);
                      formik.setFieldValue("sizes", selectedSizeIds);
                    }}
                    renderOption={(props, option) => {
                      const index = sizeOptionsArray.findIndex((opt) => opt.id === option.id);

                      return (
                        <React.Fragment key={option.id || index}>
                          <li {...props} key={`option-${option.id || index}`}>
                            {option.name}
                          </li>
                          {index === sizeOptionsArray?.length - 1 && (
                            <div key="add-new-size-button" className="w-full flex justify-center items-center">
                              <Button
                                onClick={() => {
                                  setIsSizeModalOpen(true);
                                }}
                              >
                                Add New Size
                              </Button>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sizes"
                        fullWidth
                        onBlur={formik.handleBlur}
                        error={formik.touched.sizes && Boolean(formik.errors.sizes)}
                        helperText={formik.touched.sizes && formik.errors.sizes}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {isSizesLoading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />

                  <Autocomplete
                    multiple
                    open={colorOpen}
                    onOpen={handleColorOpen}
                    onClose={handleColorClose}
                    options={colorOptionsArray}
                    loading={isColorsLoading}
                    value={colorOptions?.filter((color: any) => formik.values.colors.includes(color?.id as never)) || []}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(event, newValue) => {
                      const selectedColorIds = newValue.map((size) => size.id);
                      formik.setFieldValue("colors", selectedColorIds);
                    }}
                    renderOption={(props, option) => {
                      const index = colorOptionsArray.findIndex((opt) => opt.id === option.id);

                      return (
                        <React.Fragment key={option.id || index}>
                          <div>
                            <li {...props} key={`option-${option.id || index}`}>
                              {option.name || option}
                            </li>
                          </div>
                          {index === colorOptionsArray?.length - 1 && (
                            <div key="add-new-color-button" className="w-full flex justify-center items-center">
                              <Button
                                onClick={() => {
                                  setIsColorModalOpen(true);
                                }}
                              >
                                Add New Color
                              </Button>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    }}
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
                              {isColorsLoading ? (
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
                    <div className="font-bold">
                      Product Pricing :
                    </div>
                    <TableContainer>
                      <Table sx={{ border: "none" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography className="!font-bold !text-sm">
                                Min Quantity
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography className="!font-bold !text-sm">
                                Max Quantity
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography className="!font-bold !text-sm">
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
                className=" !rounded-lg w-32"
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

      <Dialog open={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)}>
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
          <Button onClick={() => setIsSizeModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSize} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isColorModalOpen}
        onClose={() => setIsColorModalOpen(false)}
      >
        <DialogTitle>Add New Color</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Color"
            type="text"
            fullWidth
            value={newColor}
            onChange={(e) => setNewSize(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsColorModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddColor} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AddProducts;
