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
  Divider,
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
import {
  useLoadCategoriesWithPaginationQuery,
  useLoadSubCategoriesWithIdQuery,
} from "../../../rtk-query/categoriesApiSlice";
import {
  useAddProductMutation,
  useGetAllColorsQuery,
  useGetAllSizesQuery,
  useAddNewColorMutation,
  useAddNewSizeMutation,
} from "../../../rtk-query/productApiSlice";
import { useUploadSingleFileMutation } from "../../../rtk-query/fileUploadApiSlice";
import MagnifyProductImage from "./MagnifyProductImage";
import { useNavigate } from "react-router-dom";

interface ImageData {
  id: string;
  side: string;
  file: File | null;
  isThumbnail: boolean;
  fileName: string;
  isDeleted: boolean;
  imageUrl: string;
}

interface PriceListData {
  id: number;
  minQty: string;
  maxQty: string;
  pricePerPiece: string;
}

interface InventoryListData {
  id: number;
  color: { id: number; name: string };
  size: { id: number; name: string };
  stockQty: number;
}

interface FormData {
  productId: number | undefined;
  productName: string;
  styleName: string;
  otherCategory: string;
  category: string;
  description: string;
  status: boolean;
  leftTopHeader: string;
  leftTopContent: string;
  leftBottomHeader: string;
  leftBottomContent: string;
  minQty: number | undefined;
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
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("enabled");
  const [imgList, setImgList] = useState<ImageData[]>([
    {
      id: uuidv1(),
      side: "",
      file: null,
      isThumbnail: true,
      fileName: "",
      isDeleted: false,
      imageUrl: "",
    },
  ]);

  const [priceList, setPriceList] = useState<PriceListData[]>([
    { id: 1, minQty: "", maxQty: "", pricePerPiece: "" },
  ]);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [inventoryList, setInventoryList] = useState<InventoryListData[]>([
    {
      id: 1,
      color: { id: -1, name: "" },
      size: { id: -1, name: "" },
      stockQty: 0,
    },
  ]);
  // const [userMinQty, setUserMinQty] = useState<number | undefined>(undefined);

  const [uploadSingleFile] = useUploadSingleFileMutation();

  const [addProduct] = useAddProductMutation();

  const { data: categories, isLoading: isCategoriesLoading } =
    useLoadCategoriesWithPaginationQuery({ pageIndex: 0, pageSize: 10 });
  const {
    data: subCategories,
    refetch,
    isLoading: isSubCatLoading,
  } = useLoadSubCategoriesWithIdQuery(
    {
      categoryId: selectedCategory?.id!,
      pageIndex: 0,
      pageSize: 10,
    },
    {
      skip: !selectedCategory?.id,
    }
  );

  const { data: sizes } = useGetAllSizesQuery({});
  const sizeOptions = sizes?.data;

  const { data: colors } = useGetAllColorsQuery({});
  const colorOptions = colors?.data;

  const [addNewSize] = useAddNewSizeMutation();
  const [addNewColor] = useAddNewColorMutation();

  useEffect(() => {
    if (selectedCategory) {
      refetch();
    }
  }, [selectedCategory]);

  const navigate = useNavigate();

  const handleCategoryChange = (e: any) => {
    const selectedCategoryId = e.target.value as number;
    const selectedCat =
      (categories &&
        categories?.find((cat: any) => cat.id === selectedCategoryId)) ||
      null;
    formik.setFieldValue("category", selectedCat?.id);
    setSelectedCategory(selectedCat);
  };

  const handleSubCategoryChange = (e: any) => {
    const selectedSubCategoryId = e.target.value;
    formik.setFieldValue("otherCategory", selectedSubCategoryId);
  };

  const handleAddSize = async () => {
    if (newSize) {
      try {
        const response = await addNewSize({ size: newSize });
        const responseBody = response?.data;
        if (responseBody?.status && responseBody?.httpStatusCode === 201) {
          toast.success(`New Size "${newSize}" created successfully`);
          setNewSize("");
          setIsSizeModalOpen(false);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.message ?? "Error while creating New Size");
      }
    }
  };

  const handleAddColor = async () => {
    if (newColor) {
      try {
        const response = await addNewColor({ color: newColor });
        const responseBody = response?.data;
        if (responseBody?.status && responseBody?.httpStatusCode === 201) {
          toast.success(
            `New Color "${responseBody?.data?.name}" created successfully`
          );
          setNewColor("");
          setIsColorModalOpen(false);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.message ?? "Error while creating New Color");
      }
    }
  };

  const handleFileUpload =
    (id: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event?.target?.files;
      if (files && files?.length > 0) {
        const file: any = files[0];

        const fileExtension = file?.name?.split(".").pop().toLowerCase();
        const acceptedFormats = ["png", "jpeg", "jpg", "webp"];
        if (!acceptedFormats.includes(fileExtension)) {
          toast.error(
            "Invalid file format! Please upload .jpeg, .jpg, .png, or .webp files."
          );
          return;
        }

        // const fileSizeInKB = file.size / 1024;
        // if (fileSizeInKB > 1024) {
        //   toast.error("File size must be between 50 KB and 1MB.");
        //   return;
        // }

        const image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = async () => {
          // const width = image.width;
          // const height = image.height;

          // const aspectRatio = width / height;
          // if (Math.abs(aspectRatio - 1) > 0.01) {
          //   toast.error("Image must have a square aspect ratio (1:1).");
          //   return;
          // }

          try {
            const reader = new FileReader();

            reader.onloadend = () => {
              const previewUrl = reader.result as string;

              setImgList((prev) =>
                prev.map((img) =>
                  img.id === id
                    ? {
                        ...img,
                        file: file,
                        imageUrl: previewUrl,
                        fileName: file.name,
                      }
                    : img
                )
              );
            };

            reader.readAsDataURL(file);

            const response = await uploadSingleFile(file).unwrap();
            const responseData = response?.data;
            const fileId = responseData?.id;

            setImgList((prev) =>
              prev.map((img) =>
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
    setImgList((prev) => [
      ...prev,
      {
        id: uuidv1(),
        side: "",
        file: null,
        isThumbnail: false,
        fileName: "",
        isDeleted: false,
        imageUrl: "",
      },
    ]);
  };

  const handleRemoveImage = (id: string) => () => {
    setImgList((prev) => prev.filter((img) => img?.id !== id));
  };

  const handleAddRow = () => {
    setPriceList((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, minQty: "", maxQty: "", pricePerPiece: "" },
    ]);
  };
  const handleAddInventoryRow = () => {
    setInventoryList((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        color: { id: -1, name: "" },
        size: { id: -1, name: "" },
        stockQty: 0,
      },
    ]);
  };

  const handleDeleteRow = (id: number) => {
    setPriceList((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  const handleDeleteInvenetoryRow = (id: number) => {
    setInventoryList((prevRows) => prevRows.filter((row) => row.id !== id));
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

  const handleInventoryData = (
    id: number,
    field: keyof InventoryListData,
    value: string | number | { id: number; name: string }
  ) => {
    setInventoryList((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]:
                typeof value === "object" && value !== null
                  ? { id: value.id, name: value.name }
                  : value,
            }
          : row
      )
    );
  };

  const formik = useFormik<FormData>({
    initialValues: {
      productId: undefined,
      minQty: undefined,
      productName: "",
      styleName: "",
      otherCategory: "",
      category: "",
      description: "",
      status: true,
      leftTopHeader: "",
      leftTopContent: "",
      leftBottomHeader: "",
      leftBottomContent: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Product Name is required"),
      styleName: Yup.string().required("Style Name is required"),
      category: Yup.string().required("Category is required"),
      otherCategory: Yup.string().required("Sub Category is required"),
      description: Yup.string().required("Description is required"),
      leftTopHeader: Yup.string().required("Field is required"),
      leftTopContent: Yup.string().required("Field is required"),
      leftBottomHeader: Yup.string().required("Field is required"),
      leftBottomContent: Yup.string().required("Field is required"),
      minQty: Yup.number()
        .required("Min Quantity is required")
        .positive("Must be a positive number"),
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
        if (priceList?.filter((x) => +x.pricePerPiece === 0).length > 0) {
          toast.error("Please enter quantity range and price!");
        } else {
          const convertPriceList = priceList?.map((price) => {
            return {
              minQty: +price?.minQty,
              maxQty: isNaN(+price?.maxQty) ? null : +price?.maxQty,
              pricePerPiece: +price?.pricePerPiece,
            };
          });

          const images = imgList
            ?.map((item) => {
              if (item?.id && !isNaN(+item.id)) {
                return {
                  fileId: +item?.id,
                  sideName: item?.side,
                  isThumbnail: item?.isThumbnail,
                };
              }
              return undefined;
            })
            .filter(Boolean);

          const hasInvalidFileId = imgList?.some((item) => isNaN(+item?.id));

          const finalImages = hasInvalidFileId ? undefined : images;

          const requestBody = {
            name: values?.productName,
            description: values.description,
            styleName: values?.styleName,
            categoryId: +values.category,
            subCategoryId: +values.otherCategory,
            productPrices: convertPriceList,
            productImages: finalImages,
            leftTopHeader: values?.leftTopHeader,
            leftTopContent: values?.leftTopContent,
            leftBottomHeader: values?.leftBottomHeader,
            leftBottomContent: values?.leftBottomContent,
            isPublic: selectedStatus === "enabled" ? true : false,
            minQty: values.minQty !== undefined ? +values.minQty : null,
            inventory: inventoryList?.map((inventoryValue) => {
              return {
                sizeId: inventoryValue.size.id,
                colorId: inventoryValue.color.id,
                availableQty: +inventoryValue.stockQty,
              };
            }),
          };

          try {
            const response = await addProduct({
              payload: requestBody,
            }).unwrap();

            if (response?.status && response?.httpStatusCode === 201) {
              toast.success(response?.message);
              navigate("/account/product-list", { replace: true });
            }
          } catch (error: any) {
            console.error(error);
            toast.error(error?.error ?? "Error while Creating product");
          }
        }
      }
    },
  });

  const sizeOptionsArray = sizeOptions ? Object.values(sizeOptions) : [];

  const colorOptionsArray = colorOptions ? Object.values(colorOptions) : [];

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
                        )) || []),
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
                    error={
                      formik.touched.otherCategory &&
                      Boolean(formik.errors.otherCategory)
                    }
                    disabled={isSubCatLoading && Boolean(!selectedCategory)}
                    renderValue={(selected) => {
                      if (isSubCatLoading) return "Loading...";
                      const selectedCategory = subCategories?.find(
                        (cat) => +cat.id === +selected
                      );
                      return selectedCategory
                        ? selectedCategory.name
                        : "--Select--";
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
                        )) || []),
                      ]
                    )}
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
                <div key={img.id} className="flex flex-wrap gap-8 items-center">
                  <div className="flex flex-1 gap-4">
                    <TextField
                      id={`sideName-${img.id}`}
                      name={`sideName-${img.id}`}
                      label="Side Name"
                      value={img.side}
                      onChange={(e) =>
                        setImgList((prev) =>
                          prev?.map((i) =>
                            i.id === img.id ? { ...i, side: e.target.value } : i
                          )
                        )
                      }
                      fullWidth
                      sx={{ maxWidth: "12rem", flex: "1 1 300px" }}
                    />

                    <TextField
                      fullWidth
                      label="Upload File"
                      value={img.fileName || ""}
                      className="cursor-pointer"
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <input
                              accept=".png,.jpeg,.jpg,.webp"
                              style={{ display: "none" }}
                              id={`upload-file-${img.id}`}
                              type="file"
                              disabled={Boolean(img?.fileName)}
                              onChange={handleFileUpload(img.id)}
                            />
                            {!img?.fileName && (
                              <label htmlFor={`upload-file-${img.id}`}>
                                <IconButton color="primary" component="span">
                                  <UploadIcon />
                                </IconButton>
                              </label>
                            )}
                          </InputAdornment>
                        ),
                        sx: {
                          pointerEvents: "none",
                        },
                      }}
                      sx={{ flex: "6 1 300px" }}
                      onClick={() =>
                        document
                          .getElementById(`upload-file-${img.id}`)
                          ?.click()
                      }
                    />
                  </div>

                  {img?.imageUrl && <MagnifyProductImage img={img} />}

                  <FormGroup>
                    <StyledFormControlLabel
                      control={
                        <Checkbox
                          checked={img.isThumbnail}
                          onChange={() => handleCheckboxIsThumbnail(img.id)}
                          color="primary"
                        />
                      }
                      label="Is Thumbnail"
                    />
                  </FormGroup>

                  {imgList.length > 1 && (
                    <div className="flex gap-2">
                      <IconButton
                        color="error"
                        onClick={handleRemoveImage(img.id)}
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
              <div className="font-bold">Attributes</div>
              <div className="flex ">
                <div className="flex-[2] flex flex-col gap-8 ">
                  <div className="flex-[5] px-2">
                    <div className="font-bold">Available Quantities</div>
                    <TableContainer>
                      <Table sx={{ border: "none" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography className="!font-bold !text-sm">
                                Color
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography className="!font-bold !text-sm">
                                Size
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography className="!font-bold !text-sm">
                                Stock Quantity
                              </Typography>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {inventoryList.map((row, index) => (
                            <TableRow
                              key={row?.id}
                              sx={{ borderBottom: "none" }}
                            >
                              <TableCell>
                                <Select
                                  value={row?.color?.id || ""}
                                  onChange={(e) => {
                                    if (e.target.value === "addColor") {
                                      setIsColorModalOpen(true);
                                    } else {
                                      // handleInputQuantityChange(row?.id, "color", e.target.value);
                                      const selectedColor: any =
                                        colorOptionsArray.find(
                                          (color: any) =>
                                            color.id === Number(e.target.value)
                                        );
                                      if (selectedColor) {
                                        handleInventoryData(
                                          row.id,
                                          "color",
                                          selectedColor
                                        );
                                      }
                                    }
                                  }}
                                  // fullWidth
                                  className="min-w-[12rem]"
                                  displayEmpty
                                  variant="outlined"
                                >
                                  <MenuItem value="-1" disabled>
                                    Select Color
                                  </MenuItem>
                                  {colorOptionsArray.map((color: any) => (
                                    <MenuItem key={color.id} value={color.id}>
                                      {color.name}
                                    </MenuItem>
                                  ))}
                                  <MenuItem
                                    value="addColor"
                                    className="!font-bold"
                                  >
                                    Add more color...
                                  </MenuItem>
                                </Select>
                              </TableCell>

                              <TableCell>
                                <Select
                                  value={row?.size?.id || ""}
                                  onChange={(e) => {
                                    if (e.target.value === "addSize") {
                                      setIsSizeModalOpen(true);
                                    } else {
                                      const selectedSize: any =
                                        sizeOptionsArray.find(
                                          (size: any) =>
                                            size.id === Number(e.target.value)
                                        );
                                      if (selectedSize) {
                                        handleInventoryData(
                                          row.id,
                                          "size",
                                          selectedSize
                                        );
                                      }
                                    }
                                  }}
                                  // fullWidth
                                  className="min-w-[12rem]"
                                  displayEmpty
                                  variant="outlined"
                                >
                                  <MenuItem value="-1" disabled>
                                    Select Size
                                  </MenuItem>
                                  {sizeOptionsArray.map((size: any) => (
                                    <MenuItem key={size.id} value={size.id}>
                                      {size.name}
                                    </MenuItem>
                                  ))}
                                  <MenuItem
                                    value="addSize"
                                    className="!font-bold"
                                  >
                                    Add New Size...
                                  </MenuItem>
                                </Select>
                              </TableCell>

                              <TableCell>
                                <TextField
                                  type="number"
                                  fullWidth
                                  variant="outlined"
                                  placeholder="0"
                                  value={row?.stockQty}
                                  onChange={(e) =>
                                    handleInventoryData(
                                      row?.id,
                                      "stockQty",
                                      e.target.value
                                    )
                                  }
                                  inputProps={{ min: 0 }}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-4">
                                  {inventoryList?.length > 1 && (
                                    <IconButton
                                      color="error"
                                      onClick={() =>
                                        handleDeleteInvenetoryRow(row?.id)
                                      }
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  )}
                                  {index === inventoryList?.length - 1 && (
                                    <IconButton
                                      color="primary"
                                      onClick={handleAddInventoryRow}
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

                  <div className="font-bold">Minimum Quantity</div>

                  <TextField
                    label="Min Quantity"
                    name="minQty"
                    value={formik.values.minQty}
                    onChange={formik.handleChange}
                    fullWidth
                  />

                  <div className="flex-[5] px-2">
                    <div className="font-bold">Product Pricing :</div>
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
                                  value={row?.minQty}
                                  placeholder="0"
                                  onChange={(e) =>
                                    handleInputChange(
                                      row?.id,
                                      "minQty",
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
                                  value={row?.maxQty}
                                  onChange={(e) =>
                                    handleInputChange(
                                      row?.id,
                                      "maxQty",
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
                                  value={row?.pricePerPiece}
                                  onChange={(e) =>
                                    handleInputChange(
                                      row?.id,
                                      "pricePerPiece",
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
              <div className="font-bold">Left Section</div>
              <div className="font-bold">Left Visible Section</div>
              <TextField
                label="Heading"
                name="leftTopHeader"
                value={formik.values.leftTopHeader}
                onChange={formik.handleChange}
                fullWidth
                error={
                  formik.touched.leftTopHeader &&
                  Boolean(formik.errors.leftTopHeader)
                }
                helperText={
                  formik.touched.leftTopHeader && formik.errors.leftTopHeader
                }
              />
              <TextField
                label="Content"
                name="leftTopContent"
                value={formik.values.leftTopContent}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={2}
                error={
                  formik.touched.leftTopContent &&
                  Boolean(formik.errors.leftTopContent)
                }
                helperText={
                  formik.touched.leftTopContent && formik.errors.leftTopContent
                }
              />
              <Divider />
              <div className="font-bold">Left Toggle Section</div>
              <TextField
                label="Heading"
                name="leftBottomHeader"
                value={formik.values.leftBottomHeader}
                onChange={formik.handleChange}
                fullWidth
                error={
                  formik.touched.leftBottomHeader &&
                  Boolean(formik.errors.leftBottomHeader)
                }
                helperText={
                  formik.touched.leftBottomHeader &&
                  formik.errors.leftBottomHeader
                }
              />
              <TextField
                label="Content"
                name="leftBottomContent"
                value={formik.values.leftBottomContent}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={2}
                error={
                  formik.touched.leftBottomContent &&
                  Boolean(formik.errors.leftBottomContent)
                }
                helperText={
                  formik.touched.leftBottomContent &&
                  formik.errors.leftBottomContent
                }
              />
              <Divider />
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
          <Button
            onClick={() => {
              handleAddSize();
              setIsSizeModalOpen(false);
            }}
            color="primary"
          >
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
            onChange={(e) => setNewColor(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsColorModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleAddColor();
              setIsColorModalOpen(false);
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AddProducts;
