import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Enums and Interfaces
enum ServiceButtons {
  ExploreDesigns = "Explore Designs",
  BookAppointment = "Book Appointment",
  ContactUs = "Contact Us",
}

interface CarouselItem {
  title: string;
  description: string;
  buttonName: ServiceButtons;
}

type CardPosition = "center" | "left" | "right" | "hidden";

interface StyledCardProps {
  position: CardPosition;
}

// Styled Components
const Container = styled("div")({
  position: "relative",
  height: "400px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  zIndex: 30,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  boxShadow: theme.shadows[3],
}));

const StyledCard = styled(Card)<StyledCardProps>(({ position }) => {
  const baseStyles = {
    position: "absolute",
    width: "300px",
    height: "360px",
    transition: "all 500ms ease-in-out",
  } as const;

  switch (position) {
    case "center":
      return {
        ...baseStyles,
        zIndex: 20,
        transform: "scale(1)",
        opacity: 1,
        filter: "blur(0)",
      };
    case "right":
      return {
        ...baseStyles,
        zIndex: 10,
        transform: "translateX(160px) rotate(12deg) scale(0.9)",
        opacity: 0.7,
        filter: "blur(2px)",
      };
    case "left":
      return {
        ...baseStyles,
        zIndex: 10,
        transform: "translateX(-160px) rotate(-12deg) scale(0.9)",
        opacity: 0.7,
        filter: "blur(2px)",
      };
    default:
      return {
        ...baseStyles,
        transform: "scale(0.75)",
        opacity: 0,
      };
  }
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "auto",
  padding: "10px 20px",
  borderRadius: "25px",
  textTransform: "none",
  fontWeight: 600,
}));

// Component Props Interface
interface RotatingCardsProps {
  autoRotateInterval?: number;
}

const RotatingCards: React.FC<RotatingCardsProps> = ({
  autoRotateInterval = 5000,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const carouselDetails: CarouselItem[] = [
    {
      title: "Exclusive Apparel Designs",
      description: "Discover ready-made, trend-driven apparel for your brand.",
      buttonName: ServiceButtons.ExploreDesigns,
    },
    {
      title: "Customization Services",
      description: "Create apparel tailored to your brand's unique vision.",
      buttonName: ServiceButtons.BookAppointment,
    },
    {
      title: "Design Consultation",
      description: "Expert guidance to perfect your design ideas.",
      buttonName: ServiceButtons.ContactUs,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselDetails.length);
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [autoRotateInterval]);

  const handlePrevious = (): void => {
    setActiveIndex(
      (current) =>
        (current - 1 + carouselDetails.length) % carouselDetails.length
    );
  };

  const handleNext = (): void => {
    setActiveIndex((current) => (current + 1) % carouselDetails.length);
  };

  const getCardPosition = (index: number): CardPosition => {
    const position =
      (index - activeIndex + carouselDetails.length) % carouselDetails.length;
    if (position === 0) return "center";
    if (position === 1) return "right";
    if (position === carouselDetails.length - 1) return "left";
    return "hidden";
  };

  const handleButtonClick = (buttonName: ServiceButtons): void => {
    // Handle button click based on button type
    switch (buttonName) {
      case ServiceButtons.ExploreDesigns:
        console.log("Navigate to designs page");
        break;
      case ServiceButtons.BookAppointment:
        console.log("Open appointment booking modal");
        break;
      case ServiceButtons.ContactUs:
        console.log("Open contact form");
        break;
    }
  };

  return (
    <Container>
      <NavigationButton
        sx={{ left: "16px" }}
        onClick={handlePrevious}
        aria-label="Previous card"
      >
        <ChevronLeft />
      </NavigationButton>

      <NavigationButton
        sx={{ right: "16px" }}
        onClick={handleNext}
        aria-label="Next card"
      >
        <ChevronRight />
      </NavigationButton>

      {carouselDetails.map((card, index) => (
        <StyledCard key={index} position={getCardPosition(index)} elevation={4}>
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "24px",
            }}
          >
            <div>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 3 }}
              >
                {card.description}
              </Typography>
            </div>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => handleButtonClick(card.buttonName)}
            >
              {card.buttonName}
            </StyledButton>
          </CardContent>
        </StyledCard>
      ))}
    </Container>
  );
};

export default RotatingCards;
