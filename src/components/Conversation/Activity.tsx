/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Chip, Divider, Typography, styled } from "@mui/material";

import PlaceIcon from "@mui/icons-material/Place";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";

import { Activity } from "../../types/trip";
import { useMapsPlaces } from "../../utils";
import usePlacesImage from "../../utils/usePlacesImage";

const Container = styled(Box)`
  display: grid;
  flex-direction: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
`;

const ImageContainer = styled(Box)`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;

  overflow: hidden;
  
  border-radius: 1rem;
  border: 2px solid rgba(128, 128, 128, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ActivityTitle = styled(Typography)`
  line-height: 1.2;
`;

const Description = styled(Typography)`
  margin: 0.75rem 0 2rem;
  opacity: 0.9;
`;

const LocationTextContainer = styled(Button)`
  padding: 0.5rem;
  background-color: inherit;
  border-radius: 0.75rem;
`;

const LocationText = styled(ActivityTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  text-align: start;
  opacity: 0.75;
`;

const ActivityDetails = (activity: Activity) => {
  const {
    activityName,
    description,
    specificLocation,
    plannedTime,
    estimatedPrice,
  } = activity;

  const { imageReference } = useMapsPlaces(specificLocation);
  const { imageSrc } = usePlacesImage(imageReference);

  return (
    <>
      <Divider sx={{ m: "1rem 0" }}></Divider>
      <Container>
        <ImageContainer>
          <img src={imageSrc ?? ""} alt={specificLocation} />
        </ImageContainer>
        <Box>
          <Box sx={{ mb: 1, display: "flex", gap: 1 }}>
            <Chip
              size="small"
              variant="filled"
              color="primary"
              icon={<ScheduleRoundedIcon />}
              label={plannedTime}
            />
            <Chip
              size="small"
              variant="filled"
              color="primary"
              icon={<MonetizationOnRoundedIcon />}
              label={estimatedPrice ? estimatedPrice + "$" : "Potentially free"}
            />
          </Box>
          <ActivityTitle variant="h6">{activityName}</ActivityTitle>
          <Description variant="body2">{description}</Description>
          <LocationTextContainer
            variant="outlined"
            startIcon={<PlaceIcon />}
            fullWidth
          >
            <LocationText variant="overline" textAlign="start">
              {specificLocation}
            </LocationText>
            <Box flexGrow={1} />
          </LocationTextContainer>
        </Box>
      </Container>
    </>
  );
};

export default ActivityDetails;
