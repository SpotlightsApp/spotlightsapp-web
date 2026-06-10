import type { TalentUniversity } from "./types";

export const talentUniversities: TalentUniversity[] = [
  { id: "berkeley", name: "UC Berkeley", shortName: "Berkeley", city: "Berkeley, CA", emailDomain: "berkeley.edu", logoUrl: "/universities/berkeley.png" },
  { id: "stanford", name: "Stanford University", shortName: "Stanford", city: "Stanford, CA", emailDomain: "stanford.edu", logoUrl: "/universities/stanford.png" },
  { id: "mit", name: "MIT", shortName: "MIT", city: "Cambridge, MA", emailDomain: "mit.edu", logoUrl: "/universities/mit.png" },
  { id: "cmu", name: "Carnegie Mellon University", shortName: "CMU", city: "Pittsburgh, PA", emailDomain: "cmu.edu", logoUrl: "/universities/cmu.png" },
  { id: "harvard", name: "Harvard University", shortName: "Harvard", city: "Cambridge, MA", emailDomain: "harvard.edu", logoUrl: "/universities/harvard.png" },
  { id: "princeton", name: "Princeton University", shortName: "Princeton", city: "Princeton, NJ", emailDomain: "princeton.edu", logoUrl: "/universities/princeton.png" },
  { id: "ucla", name: "UCLA", shortName: "UCLA", city: "Los Angeles, CA", emailDomain: "ucla.edu", logoUrl: "/universities/ucla.png" },
  { id: "uiuc", name: "University of Illinois Urbana-Champaign", shortName: "UIUC", city: "Urbana, IL", emailDomain: "illinois.edu", logoUrl: "/universities/uiuc.png" },
  { id: "gatech", name: "Georgia Tech", shortName: "Georgia Tech", city: "Atlanta, GA", emailDomain: "gatech.edu", logoUrl: "/universities/gatech.png" },
  { id: "umich", name: "University of Michigan", shortName: "Michigan", city: "Ann Arbor, MI", emailDomain: "umich.edu", logoUrl: "/universities/umich.png" },
  { id: "uw", name: "University of Washington", shortName: "UW", city: "Seattle, WA", emailDomain: "uw.edu", logoUrl: "/universities/uw.png" },
  { id: "cornell", name: "Cornell University", shortName: "Cornell", city: "Ithaca, NY", emailDomain: "cornell.edu", logoUrl: "/universities/cornell.png" },
  { id: "utaustin", name: "UT Austin", shortName: "UT Austin", city: "Austin, TX", emailDomain: "utexas.edu", logoUrl: "/universities/utaustin.png" },
  { id: "columbia", name: "Columbia University", shortName: "Columbia", city: "New York, NY", emailDomain: "columbia.edu", logoUrl: "/universities/columbia.png" },
];

export const universityById = new Map(talentUniversities.map((u) => [u.id, u]));
