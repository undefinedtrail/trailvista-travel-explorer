import { Attraction } from './Attraction';

export type DestinationCategory = 'All' | 'Beaches' | 'Mountains' | 'Heritage' | 'Adventure';

export interface ItineraryDay {
  day: string;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
}

export interface FieldNotes {
  culinary: string;
  logistics: string;
  gear: string;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  state: string;
  stateKey?: string;
  category: DestinationCategory;
  image: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  description: string;
  bestTimeToVisit: string;
  duration: string;
  weather: string;
  curatorTip: string;
  tags: string[];
  attractions: Attraction[];
  badge?: string;
  itineraryCode?: string;
  highlights?: string[];
  includes?: string[];
  sunset?: string;
  subtitle?: string;
  itineraryPlan?: ItineraryDay[];
  fieldNotes?: FieldNotes;
}
