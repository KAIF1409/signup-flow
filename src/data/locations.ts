/** Mock dataset powering the cross-field State → College/City dropdowns. */

export const REGIONS: string[] = [
  'Karnataka',
  'Maharashtra',
  'Delhi NCR',
  'Tamil Nadu',
  'Telangana',
  'Gujarat',
  'West Bengal',
  'Rajasthan',
  'Uttar Pradesh',
  'Punjab',
]

export const COLLEGES_BY_REGION: Record<string, string[]> = {
  Karnataka: [
    'RV College of Engineering',
    'BMS College of Engineering',
    'PES University',
    'Christ University',
    'MS Ramaiah Institute',
    'Manipal Institute of Technology',
  ],
  Maharashtra: [
    'COEP Technological University',
    'VJTI Mumbai',
    'KJ Somaiya College',
    'Symbiosis Institute',
    'Institute of Chemical Technology',
    'SPIT Mumbai',
  ],
  'Delhi NCR': [
    'Delhi Technological University',
    'NSUT Delhi',
    'IIIT Delhi',
    'SRCC Delhi',
    'Hansraj College',
    'Amity Noida',
  ],
  'Tamil Nadu': [
    'IIT Madras',
    'Anna University',
    'VIT Vellore',
    'SSN College of Engineering',
    'College of Engineering Guindy',
    'Loyola College Chennai',
  ],
  Telangana: [
    'IIT Hyderabad',
    'IIIT Hyderabad',
    'CBIT Hyderabad',
    'Osmania University College',
    'VNR VJIET',
    'ICFAI Hyderabad',
  ],
  Gujarat: [
    'Nirma University',
    'DA-IICT Gandhinagar',
    'PDEU (PDPU)',
    'LD College of Engineering',
    'MSU Baroda',
    'IIT Gandhinagar',
  ],
  'West Bengal': [
    'Jadavpur University',
    'IIEST Shibpur',
    "St. Xavier's College",
    'Presidency University',
    'Techno India Salt Lake',
    'IIM Calcutta',
  ],
  Rajasthan: [
    'BITS Pilani',
    'MNIT Jaipur',
    'SKIT Jaipur',
    'Poornima University',
    'JECRC University',
    'Manipal University Jaipur',
  ],
  'Uttar Pradesh': [
    'IIT Kanpur',
    'MNNIT Allahabad',
    'AKGEC Ghaziabad',
    'KIET Ghaziabad',
    'IIT BHU Varanasi',
    'Bennett University',
  ],
  Punjab: ['Thapar University', 'Chitkara University', 'Lovely Professional University', 'GNDU Amritsar', 'PEC Chandigarh', 'CU Chandigarh'],
}

export function getCollegesForRegion(region: string): string[] {
  return COLLEGES_BY_REGION[region] ?? []
}
