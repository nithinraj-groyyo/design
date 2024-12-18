import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const menuItems = [
  {
    title: "Overview",
    subItems: [],
  },
  {
    title: "Accounts",
    subItems: [
      { title: "Profile", route: "/account/profile" },
      { title: "Addresses", route: "/account/address" },
      // { title: "Change Password", route: "/account/changePassword" },
    ],
  },
  {
    title: "Orders",
    subItems: [
      { title: "Orders", route: "/account/orders" },
      { title: "RFQ List", route: "/account/rfq/list" },
    ],
  },
  
];

const adminMenuItems = [
  {
    title: "Admin Section",
    subItems: [],
  },
  {
    title: "Website Info",
    subItems: [
      // { title: "About us", route: "/account/web-info/about-us" },
      // { title: "Teams", route: "/account/web-info/teams" },
      { title: "Services", route: "/account/web-info/services" },
      { title: "FAQ", route: "/account/web-info/faq" },
    ],
  },
  {
    title: "Product",
    subItems: [
      { title: "Add Product", route: "/account/add-product" },
      // { title: "Bulk Upload", route: "/account/bulk-upload" },
      { title: "Product List", route: "/account/product-list" },
    ],
  },
  {
    title: "Catalogue",
    subItems: [
      { title: "Add Catalogue", route: "/account/add-catalogue" },
      { title: "Catalogue List", route: "/account/catalogue-list" },
      { title: "Catalogue Categories", route: "/account/manage-catalogue-categories" },
    ],
  },
  {
    title: "RFQ",
    subItems: [
      // { title: "Add RFQ", route: "/account/add-rfq" },
      { title: "RFQ List", route: "/account/admin-rfq-list" },
      // { title: "Catalogue Categories", route: "/account/manage-catalogue-categories" },
    ],
  },
  // {
  //   title: "Blog",
  //   subItems: [
  //     { title: "Blogs", route: "/account/blogs" },
  //     { title: "Add Blog", route: "/account/add-blog" },
  //   ],
  // },
  // {
  //   title: "Event",
  //   subItems: [
  //     { title: "Events", route: "/account/events" },
  //     { title: "Add Events", route: "/account/add-events" },
  //   ],
  // },
  // {
  //   title: "Customer",
  //   subItems: [{ title: "Queries", route: "/account/queries" }],
  // },
  {
    title: "Site Settings",
    subItems: [
      // { title: "Brands", route: "/account/brands" },
      // { title: "Add Brands", route: "/account/add-brands" },
      { title: "Manage Categories", route: "/account/manage-categories" },
      { title: "Manage Subscriptions", route: "/account/manage-subscriptions" },
    ],
  },
];


const AccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = JSON.parse(localStorage.getItem("authToken") as string);
  const decodedToken: any = jwtDecode(token);
  // const isAdmin = decodedToken?.role?.name==="ADMIN";
  const isSuperAdmin = decodedToken?.role?.name==="SUPER_ADMIN";
  console.log(decodedToken, "decodedToken")

  const handleSelectedList = (selectedRoute: string) => {
    navigate(selectedRoute);
  };

  return (
    <BasicLayout showFooter={false}>
      <div className="flex mt-[5rem] lg:mt-[10rem] " style={{ height: "calc(100vh - 10rem)" }}>
        <div className="flex-[1] overflow-y-auto xxs:hidden lg:block" style={{ height: "100%" }}>
          <List>
            {menuItems.map((menuItem, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={menuItem.title}
                    primaryTypographyProps={{
                      style: { fontWeight: "normal", fontSize: "1.35rem" },
                    }}
                  />
                </ListItem>
                {menuItem.subItems.length > 0 && (
                  <List>
                    {menuItem.subItems.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex}
                        onClick={() => handleSelectedList(subItem.route)}
                        className="cursor-pointer"
                        style={{
                          backgroundColor: location.pathname === subItem.route ? "#e0e0e0" : "transparent",                           
                        }}
                      >
                        <ListItemText
                          primary={subItem.title}
                          primaryTypographyProps={{
                            style: {
                              fontWeight: location.pathname === subItem.route ? "bold" : "lighter",
                              fontSize: "1rem",
                              lineHeight: "0.65",
                              color: location.pathname === subItem.route ? "#000" : "#7f7f7f",                               
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
                {index !== menuItems.length - 1 && (
                  <Divider sx={{ width: "90%", mx: "auto" }} />
                )}
              </React.Fragment>
            ))}

            {/* {user && user.role === "Admin" && */}
            {isSuperAdmin &&
              adminMenuItems.map((menuItem, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={menuItem.title}
                      primaryTypographyProps={{
                        style: { fontWeight: "normal", fontSize: "1.35rem" },
                      }}
                    />
                  </ListItem>
                  {menuItem.subItems.length > 0 && (
                    <List>
                      {menuItem.subItems.map((subItem, subIndex) => (
                        <ListItem
                          key={subIndex}
                          onClick={() => handleSelectedList(subItem.route)}
                          className="cursor-pointer"
                          style={{
                            backgroundColor: location.pathname === subItem.route ? "#e0e0e0" : "transparent",
                          }}
                        >
                          <ListItemText
                            primary={subItem.title}
                            primaryTypographyProps={{
                              style: {
                                fontWeight: location.pathname === subItem.route ? "bold" : "lighter",
                                fontSize: "1rem",
                                lineHeight: "0.65",
                                color: location.pathname === subItem.route ? "#000" : "#7f7f7f",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {index !== adminMenuItems.length - 1 && (
                    <Divider sx={{ width: "90%", mx: "auto" }} />
                  )}
                </React.Fragment>
              ))}
          </List>
        </div>
        <div className="flex-[5] bg-[#f1f1f1] overflow-y-auto" style={{ height: "100%" }}>
          <Outlet />
        </div>
      </div>
    </BasicLayout>
  );
};

export default AccountPage;
