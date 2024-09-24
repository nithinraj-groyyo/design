import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";

const menuItems = [
  {
    title: "Overview",
    subItems: [],
  },
  {
    title: "Accounts",
    subItems: [
      { title: "Profile", route: "/account/profile" },
      // { title: "Addresses", route: "/account/address" },
      { title: "Change Password", route: "/account/changePassword" },
    ],
  },
  // {
  //   title: "Orders",
  //   subItems: [
  //     { title: "Orders & Returns", route: "/account/orders-returns" },
  //   ],
  // },
  
];

const adminMenuItems = [
  {
    title: "Admin Section",
    subItems: [],
  },
  {
    title: "Website Info",
    subItems: [
      { title: "About us", route: "/account/web-info/about-us" },
      { title: "Teams", route: "/account/web-info/teams" },
      { title: "Services", route: "/account/web-info/services" },
    ],
  },
  // {
  //   title: "Product",
  //   subItems: [
  //     { title: "Add Product", route: "/account/add-product" },
  //     { title: "Bulk Upload", route: "/account/bulk-upload" },
  //     { title: "Product List", route: "/account/product-list" },
  //   ],
  // },
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
  // {
  //   title: "Site Settings",
  //   subItems: [
  //     { title: "Brands", route: "/account/brands" },
  //     { title: "Add Brands", route: "/account/add-brands" },
  //     { title: "Manage Categories", route: "/account/manage-categories" },
  //   ],
  // },
];

const AccountPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("roles") as string);

  const onClickHandler = (route: string) => {
    navigate(route);
  };

  return (
    <BasicLayout showFooter={false}>
      <div className="flex mt-[10rem]" style={{ height: "calc(100vh - 10rem)" }}>
        <div className="flex-[1] overflow-y-auto" style={{ height: "100%" }}>
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
                        onClick={() => onClickHandler(subItem.route)}
                        className="cursor-pointer"
                      >
                        <ListItemText
                          primary={subItem.title}
                          primaryTypographyProps={{
                            style: {
                              fontWeight: "lighter",
                              fontSize: "1rem",
                              lineHeight: "0.65",
                              color: "#7f7f7f",
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

{user && user.role === "Admin" &&
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
                          onClick={() => onClickHandler(subItem.route)}
                          className="cursor-pointer"
                        >
                          <ListItemText
                            primary={subItem.title}
                            primaryTypographyProps={{
                              style: {
                                fontWeight: "lighter",
                                fontSize: "1rem",
                                lineHeight: "0.65",
                                color: "#7f7f7f",
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