import React from "react";
import { SocialMediaIcon_Facebook, SocialMediaIcon_Insta, SocialMediaIcon_Pin, SocialMediaIcon_Snap, SocialMediaIcon_X, SocialMediaIcon_Yt } from "../../assets/svg/footer/social_media_icons";

function SocialMedia() {
  const socialIcons = [
    { Component: SocialMediaIcon_Insta, alt: "Instagram" },
    { Component: SocialMediaIcon_Facebook, alt: "Facebook" },
    { Component: SocialMediaIcon_Pin, alt: "Pinterest" },
    { Component: SocialMediaIcon_X, alt: "Twitter" },
    { Component: SocialMediaIcon_Snap, alt: "Snapchat" },
    { Component: SocialMediaIcon_Yt, alt: "YouTube" },
  ];

  return (
    <div className="flex justify-start items-center lg:mt-8 w-full">
      <div className="flex gap-3 max-w-full">
        {socialIcons.map((icon, index) => {
          const IconComponent = icon.Component;
          return (
            <div
              key={index}
              aria-label={icon.alt}
              className="w-[25px] h-[25px] flex items-center justify-center"
            >
              <IconComponent />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SocialMedia;