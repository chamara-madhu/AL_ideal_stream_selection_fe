// User roles
export const USER_ROLES = {
  ADMIN: 0,
  USER: 1,
};

export const GENRES = {
  POP: "Pop",
  ROCK: "Rock",
  HIP_HOP: "Hip Hop",
  RNB: "R&B",
  JAZZ: "Jazz",
  BLUES: "Blues",
  COUNTRY: "Country",
  REGGAE: "Reggae",
  CLASSICAL: "Classical",
  EDM: "EDM",
  HOUSE: "House",
  TECHNO: "Techno",
  METAL: "Metal",
  FOLK: "Folk",
  LATIN: "Latin",
  FUNK: "Funk",
  DISCO: "Disco",
  TRAP: "Trap",
  INDIE: "Indie",
  ALTERNATIVE: "Alternative",
  SOUL: "Soul",
  PUNK: "Punk",
  GRUNGE: "Grunge",
  GOSPEL: "Gospel",
  BALLAD: "Ballad",
  ACOUSTIC: "Acoustic",
  SOUNDTRACK: "Soundtrack",
  WORLD: "World",
  AMBIENT: "Ambient",
  DUBSTEP: "Dubstep",
};

export const VENUE_TYPES = {
  CLUB: "Club",
  PUB: "Pub",
  WEDDING: "Wedding",
  CONCERT_HALL: "Concert Hall",
  THEATRE: "Theatre",
  FESTIVAL: "Festival",
  STREET: "Street",
  HOUSE_PARTY: "House Party",
  CORPORATE_EVENT: "Corporate Event",
  KARAOKE_BAR: "Karaoke Bar",
  RESTAURANT: "Restaurant",
  RADIO: "Radio",
  CHURCH: "Church",
  SCHOOL_EVENT: "School Event",
  AWARDS_SHOW: "Awards Show",
  LIVESTREAM: "Livestream",
  STADIUM: "Stadium",
  OPEN_MIC: "Open Mic",
  BIRTHDAY_PARTY: "Birthday Party",
  CHARITY_EVENT: "Charity Event"
};

export const GENRES_OPTIONS = Object.keys(GENRES).map((key) => {
  return {
    value: GENRES[key],
    label: GENRES[key],
  };
});

export const VENUE_TYPES_OPTIONS = Object.keys(VENUE_TYPES).map((key) => {
  return {
    value: VENUE_TYPES[key],
    label: VENUE_TYPES[key],
  };
});
