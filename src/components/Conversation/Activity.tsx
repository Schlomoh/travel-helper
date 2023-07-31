import { Box, Button, Chip, Divider, Typography, styled } from "@mui/material";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import PlaceIcon from "@mui/icons-material/Place";
import { Activity } from "../../types/trip";
import { PriceCheckRounded } from "@mui/icons-material";

const Container = styled(Box)`
  display: grid;
  flex-direction: grid;
  grid-template-columns: 1fr 2fr;
`;

const ImageContainer = styled(Box)`
  width: 100%;
  height: 100%;
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
  return (
    <>
      <Divider sx={{ m: "1rem 0" }}></Divider>
      <Container>
        <ImageContainer>
          <img src="" alt={specificLocation} />
        </ImageContainer>
        <Box>
          <Chip
            size="small"
            variant="filled"
            color="primary"
            sx={{ mb: 1 }}
            icon={<ScheduleRoundedIcon />}
            label={plannedTime}
          />
          <Chip
            size="small"
            variant="filled"
            color="primary"
            sx={{ mb: 1 }}
            icon={<PriceCheckRounded />}
            label={estimatedPrice}
          />
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
