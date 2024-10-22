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
  CircularProgress,
  Autocomplete,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddNewColorMutation,
  useAddNewSizeMutation,
  useGetAllColorsQuery,
  useGetAllSizesQuery,
  useLazyGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../rtk-query/productApiSlice";
import { useUploadSingleFileMutation } from "../../../rtk-query/fileUploadApiSlice";
import { useLoadCategoriesWithPaginationQuery, useLoadSubCategoriesWithIdQuery } from "../../../rtk-query/categoriesApiSlice";
import { IProduct } from "../../../types/products";
import MagnifyProductImage from "./MagnifyProductImage";


const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "flex-start",
  "& .MuiTypography-root": {
    marginBottom: theme.spacing(1),
  },
}));

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
  id: string | number;
  minQty: string;
  maxQty: string;
  pricePerPiece: string;
}

interface FormData {
  productId: number | undefined;
  productName: string;
  styleName: string;
  otherCategory: string;
  category: string;
  description: string;
  colors: [];
  sizes: [];
  status: boolean;
  leftTopHeader: string;
  leftTopContent: string;
  leftBottomHeader: string;
  leftBottomContent: string;
}

const EditProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<IProduct>()

  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string } | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<{ id: number; name: string } | null>(null);

  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [colorOptionsState, setColorOptionsState] = useState<Array<{ id: number; name: string }>>([]);
  const [sizeOptionsState, setSizeOptionsState] = useState<Array<{ id: number; name: string }>>([]);

  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const [imgList, setImgList] = useState<ImageData[]>([
    { id: uuidv1(), side: "", file: null, isThumbnail: true, fileName: "", isDeleted: false, imageUrl: "" },
  ]);

  const [priceList, setPriceList] = useState<PriceListData[]>([{ id: 1, minQty: "", maxQty: "", pricePerPiece: "" }]);

  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("enabled");

  const [uploadSingleFile] = useUploadSingleFileMutation();

  const { data: categories, isLoading: isCategoriesLoading } = useLoadCategoriesWithPaginationQuery({ pageIndex: 0, pageSize: 10 });
  const {
    data: subCategories,
    refetch,
    isLoading: isSubCatLoading,
  } = useLoadSubCategoriesWithIdQuery({
    categoryId: selectedCategory?.id!,
    pageIndex: 0,
    pageSize: 10,
  });

  const navigate = useNavigate();

  const [addNewSize] = useAddNewSizeMutation();
  const [addNewColor] = useAddNewColorMutation();

  const { data: sizes, isLoading: isSizesLoading } = useGetAllSizesQuery({});
  const sizeOptions = sizes?.data;

  const { data: colors, isLoading: isColorsLoading } = useGetAllColorsQuery({});
  const colorOptions = colors?.data;

  const [getProductById] = useLazyGetProductByIdQuery();

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    async function loadProducts () {
        if(productId){
            const response = await getProductById({ productId: +productId }).unwrap();
            const responseData = response?.data;
            setProduct(responseData); 
        }
    }
    loadProducts()
  }, [productId]);

  useEffect(() => {
    if (product && categories?.length > 0) {
        formik.setFieldValue("productId", product?.id);
        formik.setFieldValue("productName", product?.name);
        formik.setFieldValue("styleName", product?.styleName);
        formik.setFieldValue("description", product?.description);
        formik.setFieldValue("leftTopHeader", product?.leftTopHeader);
        formik.setFieldValue("leftTopContent", product?.leftTopContent);
        formik.setFieldValue("leftBottomHeader", product?.leftBottomHeader);
        formik.setFieldValue("leftBottomContent", product?.leftBottomContent);
  
        setSelectedStatus(product?.isPublic ? "enabled":"disabled");
  
        const loadedCategory = categories?.find((cat: any) => cat.id === product?.category);
        if (loadedCategory) {
          formik.setFieldValue("category", loadedCategory?.id);
          setSelectedCategory(loadedCategory);
        }
  
        const loadedSubCategory = subCategories?.find((subCat: any) => subCat.id === product?.subCategory);

        if (loadedSubCategory) {
          formik.setFieldValue("otherCategory", loadedSubCategory?.id);
          setSelectedSubCategory(loadedSubCategory!);
        }
  
        const initialSizeIds = product?.sizes?.map((size: any) => size?.id) || [];
        formik.setFieldValue("sizes", initialSizeIds);
  
        const initialColorIds = product?.productColors?.map((size: any) => size?.id) || [];
        formik.setFieldValue("colors", initialColorIds);
  
        const initialPricings =
          product?.productPrices?.map((price: any) => {
            return {
              id: price.id,
              minQty: price.minQty?.toString(),
              maxQty: price.maxQty?.toString(),
              pricePerPiece: price.pricePerPiece?.toString(),
            };
          }) || [];
        setPriceList(initialPricings);
  
        const initialImageList = product?.productImages?.map((price: any) => {
          return {
            id: price?.fileId,
            side: price?.sideName,
            file: null,
            isThumbnail: price?.isThumbnail,
            fileName: price?.fileName,
            isDeleted: false,
            imageUrl: price?.signedUrl,
          };
        });
        setImgList(initialImageList);
      }
  }, [product, categories, subCategories, productId])

  useEffect(() => {
    if (selectedCategory) {
      refetch();
    }
  }, [selectedCategory]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const selectedCategoryId = parseInt(event.target.value);
    const category = categories?.find((cat: any) => cat.id === selectedCategoryId);
    setSelectedCategory(category);
    formik.setFieldValue("category", selectedCategoryId);
  };

  const handleSubCategoryChange = (e: any) => {
    const selectedSubCategoryId = e.target.value;
    formik.setFieldValue("otherCategory", selectedSubCategoryId);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleFileUpload = (id: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files && files?.length > 0) {
      const file: any = files[0];

      const fileExtension = file?.name?.split(".").pop().toLowerCase();
      const acceptedFormats = ["png", "jpeg", "jpg", "webp"];
      if (!acceptedFormats.includes(fileExtension)) {
        toast.error("Invalid file format! Please upload .jpeg, .jpg, .png, or .webp files.");
        return;
      }

      const fileSizeInKB = file.size / 1024;
      if (fileSizeInKB > 1024) {
        toast.error("File size must be between 50 KB and 1MB.");
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

            setImgList((prev) => prev.map((img) => (img.id === id ? { ...img, file: file, imageUrl: previewUrl, fileName: file.name } : img)));
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

  const handleAddRow = () => {
    setPriceList((prevRows) => [...prevRows, { id: uuidv1(), minQty: "", maxQty: "", pricePerPiece: "" }]);
  };

  const handleAddImage = () => {
    setImgList((prev) => [...prev, { id: uuidv1(), side: "", file: null, isThumbnail: false, fileName: "", isDeleted: false, imageUrl: "" }]);
  };

  const handleDeleteRow = (id: number | string) => {
    setPriceList((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleInputChange = (id: number | string, field: keyof PriceListData, value: string) => {
    setPriceList((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const handleRemoveImage = (id: string) => () => {
    setImgList((prev) => prev.filter((img) => img?.id !== id));
  };

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
          toast.success(`New Color "${responseBody?.data?.name}" created successfully`);
          setNewColor("");
          setIsColorModalOpen(false);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.message ?? "Error while creating New Color");
      }
    }
  };

  const formik = useFormik<FormData>({
    initialValues: {
      productId: undefined,
      productName: "",
      styleName: "",
      otherCategory: "",
      category: "",
      description: "",
      colors: [],
      sizes: [],
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
      // if (imgList?.filter(x => (x.side.trim() == '' || (x.file == null && x.fileName == '') && x.isDeleted == false)).length > 0) {
      //     toast.error("Please enter product image and it's side!");
      // } else {
      //     if (priceList?.filter(x => +x.price == 0).length > 0) {
      //         toast.error("Please enter quantity range and price!");
      //     } else {

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
        styleName: values.styleName,
        categoryId: +values.category,
        subCategoryId: +values.otherCategory,
        productColorIds: values?.colors,
        productSizeIds: values?.sizes,
        productPrices: convertPriceList,
        productImages: finalImages,
        leftTopHeader: values?.leftTopHeader,
        leftTopContent: values?.leftTopContent,
        leftBottomHeader: values?.leftBottomHeader,
        leftBottomContent: values?.leftBottomContent,
        isPublic: selectedStatus === "enabled" ? true : false
      };

      try {
        if(productId){
            const response = await updateProduct({ payload: requestBody, productId: +productId }).unwrap();

        if (response?.status && response?.httpStatusCode === 200) {
          toast.success(response?.message);
          navigate("/account/product-list", { replace: true });
        }
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.error ?? "Error while Updatin g product");
      }
      // }

      // }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4 bg-white m-4 rounded-lg">
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
        <div className="flex justify-between">
          <div className="font-bold">Edit Product</div>
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
                error={formik.touched.productName && Boolean(formik.errors.productName)}
                helperText={formik.touched.productName && formik.errors.productName}
              />
              <div className="flex gap-4">
                <TextField
                  label="Style Name"
                  name="styleName"
                  value={formik.values.styleName}
                  onChange={formik.handleChange}
                  fullWidth
                  onBlur={formik.handleBlur}
                  error={formik.touched.styleName && Boolean(formik.errors.styleName)}
                  helperText={formik.touched.styleName && formik.errors.styleName}
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
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    renderValue={(selected) => {
                      if (isCategoriesLoading) return "Loading...";
                      const selectedCategory = categories?.find((cat: any) => cat.id === selected);
                      return selectedCategory ? selectedCategory.name : "--Select--";
                    }}
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
                  {formik.touched.category && formik.errors.category && <div className="text-red-600 text-xs">{formik.errors.category}</div>}
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
                      const selectedSubCategory = subCategories?.find((cat) => +cat.id === +selected);
                      return selectedSubCategory ? selectedSubCategory.name : "--Select--";
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
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Card>
            <Card className="p-4 flex flex-col gap-4">
              <div className="font-bold">Upload Images</div>
              {imgList?.map((img) => (
                <div key={img.id} className="flex flex-wrap gap-8 items-center">
                  <div className="flex flex-1 gap-4">
                    <TextField
                      id={`sideName-${img.id}`}
                      name={`sideName-${img.id}`}
                      label="Side Name"
                      value={img.side}
                      onChange={(e) => setImgList((prev) => prev?.map((i) => (i.id === img.id ? { ...i, side: e.target.value } : i)))}
                      fullWidth
                      sx={{ maxWidth: "12rem", flex: "1 1 300px" }}
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
                      onClick={() => document.getElementById(`upload-file-${img.id}`)?.click()}
                    />
                  </div>

                  {img?.imageUrl && <MagnifyProductImage img={img} />}

                  <FormGroup>
                    <StyledFormControlLabel
                      control={<Checkbox checked={img.isThumbnail} onChange={() => handleCheckboxIsThumbnail(img.id)} color="primary" />}
                      label="Is Cover"
                    />
                  </FormGroup>

                  {(imgList.length > 1 || imgList[0]?.fileName?.length > 0) && (
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
                    onClick={(e) => console.log("eee", e)}
                    onOpen={handleSizeOpen}
                    onClose={handleSizeClose}
                    value={sizeOptions?.filter((size: any) => formik.values.sizes.includes(size?.id as never)) || []}
                    options={sizeOptionsArray || []}
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
                          <div>
                            <li {...props} key={`option-${option.id || index}`}>
                              {option.name || option}
                            </li>
                          </div>
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
                            <>
                              {isSizesLoading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </>
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
                        error={formik.touched.colors && Boolean(formik.errors.colors)}
                        helperText={formik.touched.colors && formik.errors.colors}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {isColorsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />

                  <div className="flex-[5] px-2">
                    <div className="font-bold">Product Pricing :</div>
                    <TableContainer>
                      <Table sx={{ border: "none" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography className="!font-bold !text-sm">Min Quantity</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography className="!font-bold !text-sm">Max Quantity</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography className="!font-bold !text-sm">Price</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {priceList?.map((row, index) => (
                            <TableRow key={row?.id} sx={{ borderBottom: "none" }}>
                              <TableCell>
                                <TextField
                                  type="number"
                                  fullWidth
                                  variant="outlined"
                                  value={row?.minQty}
                                  placeholder="0"
                                  onChange={(e) => handleInputChange(row?.id, "minQty", e.target.value)}
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
                                  onChange={(e) => handleInputChange(row?.id, "maxQty", e.target.value)}
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
                                  onChange={(e) => handleInputChange(row?.id, "pricePerPiece", e.target.value)}
                                  inputProps={{ min: 0 }}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-4">
                                  {priceList?.length > 1 && (
                                    <IconButton color="error" onClick={() => handleDeleteRow(row?.id)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  )}
                                  {index === priceList?.length - 1 && (
                                    <IconButton color="primary" onClick={handleAddRow}>
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
              <Button variant="outlined" className="!text-red-500 !border-red-500 w-32">
                Cancel
              </Button>
              <Button type="submit" variant="outlined" color="primary" className=" !rounded-lg w-32" disabled={formik.isSubmitting}>
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
                <RadioGroup aria-label="status" name="status" value={selectedStatus} onChange={handleStatusChange}>
                  <FormControlLabel value="enabled" control={<Radio />} label="Enabled" />
                  <FormControlLabel value="disabled" control={<Radio />} label="Disabled" />
                </RadioGroup>
              </FormControl>
              <Divider />
              <div className="font-bold">Left Top Section</div>
              <TextField
                label="Heading"
                name="leftTopHeader"
                value={formik.values.leftTopHeader}
                onChange={formik.handleChange}
                fullWidth
                error={formik.touched.leftTopHeader && Boolean(formik.errors.leftTopHeader)}
                helperText={formik.touched.leftTopHeader && formik.errors.leftTopHeader}
              />
              <TextField
                label="Content"
                name="leftTopContent"
                value={formik.values.leftTopContent}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={2}
                error={formik.touched.leftTopContent && Boolean(formik.errors.leftTopContent)}
                helperText={formik.touched.leftTopContent && formik.errors.leftTopContent}
              />
              <Divider />
              <div className="font-bold">Left Bottom Section</div>
              <TextField
                label="Heading"
                name="leftBottomHeader"
                value={formik.values.leftBottomHeader}
                onChange={formik.handleChange}
                fullWidth
                error={formik.touched.leftBottomHeader && Boolean(formik.errors.leftBottomHeader)}
                helperText={formik.touched.leftBottomHeader && formik.errors.leftBottomHeader}
              />
              <TextField
                label="Content"
                name="leftBottomContent"
                value={formik.values.leftBottomContent}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={2}
                error={formik.touched.leftBottomContent && Boolean(formik.errors.leftBottomContent)}
                helperText={formik.touched.leftBottomContent && formik.errors.leftBottomContent}
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
            autoComplete={"off"}
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

      <Dialog open={isColorModalOpen} onClose={() => setIsColorModalOpen(false)}>
        <DialogTitle>Add New Color</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            autoComplete={"off"}
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
          <Button onClick={handleAddColor} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default EditProduct;
