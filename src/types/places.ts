export interface PlacesResponse {
  candidates: Candidate[];
  status: string;
  error_message?: string;
  info_messages?: string[];
}

interface Candidate {
  formatted_address: string;
  name: string;
  place_id: string;
  photos: Photo[];
}

interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}
