var roomType = {
  "AP": "Apartment",
  "AX": "Apartment Deluxe",
  "AM": "Apartment Economy",
  "AK": "Apartment Single + Child",
  "JF": "Cabin Comfort Inside",
  "JL": "Cabin Comfort Outside",
  "JN": "Cabin Deluxe Outside",
  "JE": "Cabin Economy",
  "JP": "Cabin Inside Roulette",
  "JR": "Cabin Outside Roulette",
  "JG": "Cabin Premium Inside",
  "JH": "Cabin Select Outside",
  "JI": "Cabin Standard Inside",
  "JA": "Cabin Standard Outside",
  "JK": "Cabin Superior Inside",
  "JB": "Cabin Superior Outside",
  "MC": "Chalet",
  "DH": "Club Room Single Use",
  "EC": "Comfort Single",
  "DC": "Comfort Twin",
  "DN": "Comfort Twin / Single Use",
  "FX": "Deluxe Family",
  "EX": "Deluxe Single",
  "DX": "Deluxe Twin",
  "ZA": "Double room + 1 Tent",
  "ZD": "Double room + 2 Tents",
  "DM": "Economy Room",
  "SE": "Executive Studio",
  "PE": "Executive Suite",
  "FH": "Family House",
  "FM": "Family Room Economy",
  "PF": "Family Suite",
  "FS": "Family Superior",
  "PG": "GrandSuite",
  "L1": "Holiday Flat (1 bedroom)",
  "L2": "Holiday Flat (2 bedrooms)",
  "L3": "Holiday Flat (3 bedrooms)",
  "LF": "Holiday Flat",
  "PM": "Honeymoon Suite",
  "WH": "House",
  "W1": "House (1 Bdrm)",
  "W2": "House (2 Bdrm)",
  "W3": "House (3Bdrm)",
  "W4": "House (4 Bdrm)",
  "W5": "House (5Bdrm)",
  "PJ": "Junior Suite",
  "PK": "Junior Suite Single + Child",
  "PA": "Junior suite single use",
  "PU": "Juniorsuite Deluxe",
  "PN": "Juniorsuite Prestige",
  "PP": "Juniorsuite Superior",
  "PV": "Juniorsuite VIP",
  "ML": "Lodge",
  "PY": "Luxury Suite",
  "MS": "Maisonette",
  "MH": "MobilHome",
  "OO": "No Accommodation/Facilities",
  "KO": "No Accomodation",
  "PH": "Penthouse Suite",
  "VZ": "Quadruple Room",
  "EK": "Room for single with child",
  "DR": "Royal Club Room",
  "PR": "Royal Suite",
  "PO": "Senior Suite",
  "GE": "Share Room Share Facilities",
  "JC": "Single Cabin Inside",
  "JD": "Single Cabin Outside",
  "EM": "Single Economy",
  "ED": "Single Executive",
  "EZ": "Single Room",
  "ER": "Single Room Royal Club",
  "EE": "Single room shared facilities",
  "ST": "Studio ",
  "SX": "Studio Deluxe",
  "SM": "Studio Economy",
  "SD": "Studio oder Double",
  "S1": "Studio single use",
  "P" : "Suite",
  "PX": "Suite Deluxe",
  "PB": "Suite Single Use",
  "PS": "Suite Superior",
  "P1": "Suite(1 Bdroom)",
  "P2": "Suite(2 Bdrooms)",
  "P3": "Suite(3 Bdrooms)",
  "P4": "Suite(4 Bdrooms)",
  "DQ": "Superior Deluxe",
  "ES": "Superior Single",
  "ZU": "Tent",
  "DT": "Tower Room",
  "TZ": "Triple Room",
  "TC": "Triple Room Comfort",
  "TX": "Triple Room Deluxe",
  "TS": "Triple Room Superior",
  "DF": "Twin Club Room",
  "DA": "Twin Deluxe/Single Use",
  "DP": "Twin Premium",
  "DZ": "Twin Room",
  "DI": "Twin Room Best Ager",
  "DG": "Twin Room Business",
  "DD": "Twin Room Executive",
  "DY": "Twin Room Luxury",
  "DW": "Twin Room Premium Single Use",
  "DV": "Twin Room Villa",
  "HU": "Twin Share",
  "IV": "Villa",
  "I1": "Villa (1Bdrm)",
  "I2": "Villa (2 Bdrm)",
  "I3": "Villa (3Bdrm)",
  "I4": "Villa (4Bdrm)",
  "IX": "Villa Deluxe",
  "IJ": "Villa Junior Suite Sea View",
  "IA": "Villa Single Use",
  "IQ": "Villa Super Deluxe",
  "IS": "Villa Superior",
  "IW": "Water Villa",
  "D1": "Twin Rm/Single Use",
  "DS": "Twin Superior",
  "AA": "Apartment Single Use",
  "A1": "Appt (1 Bedrm)",
  "A2": "Appt (2 Bedrm)",
  "A3": "Appt (3 Bedrm)",
  "A4": "Appt (4 Bedrm)",
  "A5": "Appt (5 Bedrm)",
  "A6": "Appt (6 Bedrm)",
  "DO": "Budget Room",
  "BG": "Bungalow",
  "B1": "Bungalow (1Bdrm) ",
  "B2": "Bungalow (2Bdrm) ",
  "B3": "Bungalow (3Bdrm) ",
  "B4": "Bungalow (4Bdrm) ",
  "B5": "Bungalow (5Bdrm) ",
  "BM": "Bungalow Economy",
  "BK": "Bungalow With Child",
  "BA": "Bungalow/Single Use",
  "JZ": "Cabin",
  "FZL": "Large Room",
  "FU": "Family Accomodation",
  "FZ": "Family Room",
  "AS": "Apartmt. Superior",
  "BX": "Bungalow Deluxe",
  "BS": "Bungalow Superior",
  "DB": "Club room w. bath",
  "DJ": "Double/Twin Room Private Occupancy",
  "DK": "Double/Twin Room Single + Child",
  "F1": "Family Room (1 bedroom)",
  "F2": "Family Room (2 bedrooms)",
  "GM": "Share Room",
  "GJ": "Share Room private occupancy",
  "EJ": "Single room private occupancy",
  "EB": "Single room with bathroom",
  "SK": "Studio Single + Child",
  "SS": "Studio Superior",
  "HJ": "Twin Share private occupancy",
  "HE": "Twin Share shared facilities",
  "HB": "Twin Share with bathroom"
};
var landSpace = [
  "Annex",
  "Cityview",
  "Gardenview",
  "Ladies ",
  "LandView",
  "Low Cost",
  "Main Building",
  "Mountain view",
  "Pool",
  "Promo",
  "RiverView",
  "Roulette",
  "Run of the House",
  "SeaSide",
  "Seaview",
  "Side Seaview",
  "Street view",
  "Typ A",
  "Typ B"
];
var speciality = {
  "Balcon-Terrace"      : Boolean,
  "French Balcony"      : Boolean,
  "Bath-WC"             : Boolean,
  "Shower-WC"           : Boolean,
  "Air-Condition"       : Boolean,
  "Heating"             : Boolean,
  "Connecting Doors"    : Boolean,
  "Bunk Bed"            : Boolean,
  "Dublex"              : Boolean,
  "Large Room"          : Boolean,
  "Kitchenette"         : Boolean,
  "Infant"              : Boolean,
  "Sleeping Room"       : Number,
  "Basic Beds in Room"  : Number,
  "Living sleeping room": Number,
  "Max OCP."            : Number,
  "Min OCP."            : Number,
  "Max Adult"           : Number,
  "Min Adult"           : Number,
  "Max Child"           : Number,
  "Min Child"           : Number,
  "Max AdlChl"          : Number,
  "Min AdlChl"          : Number
};
var galaAndExhibitions = [
  "New Year Gala",
  "Christmas Gala",
  "Easter Gala",
  "Christmas Lunch",
  "New Years Lunch",
  "Christmas Day Dinner",
  "Exhibition Supplement",
  "Valentine’s Dinner",
  "Easter Lunch",
  "New Year’s Day Dinner",
  "Alf Lelia Show",
  "Aqua Park in Jungle Aqua Park Resort",
  "Chinese New Year Dinner",
  "Russia Meets Asia Gala Dinner",
  "Songkran Thai New Year Dinner",
  "Loy Krathong Festival Dinner",
  "Madinet Makadi Aqua Park",
  "River Kwai Light &amp; Sound Dinner"
];
var priceSearch = {
  cancelPolicy: {
    PolicyID          : Number, // 1
    Policy            : String, // 'No Cancellation Fee'
    NoChargeDays      : Number, // 0
    CancelationCharge : Number, // 0
    NoShowCharge      : Number, // 0
    Day               : [Number], // 7
    Percent           : [Number], // 0.00
    Night             : [Number]  // 3
  },

  description: {
    refID              : Number, // 5
    HotelID            : Number, // 156640
    Culture            : String, // 'en-US'
    ShortDescription   : String, // 'Hilton Dahab Resort'
    Description        : String, // 'Located 100 kilometres north west of Sharm el Sheikh, the Hilton Dahab is a bungalow resort complex'
    Location           : String, // NULL
    NearbyAttractions  : String, // 'Area Attractions: Nearby Points Of Interest Ras Mohamed National Park'
    DrivingDirections  : String, // 'The easiest way to get from the airport to the hotel is via taxi (typical fare 45 USD).'
    CancellationPolicy : String  // NULL
  },

  information: {
    RefID           : Number, // 875
    HotelID         : Number, // 156640
    RoomDescription : String, // 'NULL'
    Caption         : String, // 'Exterior'
    ImageUrl        : String, // 'http://images.travelnow.com/hotels/CAI_HDAH-exter-1.jpg'
    Supplier        : String, // 'HRN'
    RoomID          : Number, // 0
    PicDef          : String, // 'H'
    PicType         : String, // 'H'
    Active          : String  // 'E'
  },

  price: {
    HotelCount           : Number, // 159
    Records              : Number, // 525
    MyDiscountPrice      : Number, // 738
    MyAmount             : Number, // 738
    MyCurrency           : Number, // EUR
    DiscountPrice        : Number, // 738
    RecordNumber         : Number, // 88
    GunSayisi            : Number, // 9
    HotelID              : Number, // 156031
    Country              : String, // EG
    City                 : String, // Hurghada
    Area                 : String, // HRC
    RoomID               : Number, // 9612
    HotelName            : String, // BEACH ALBATROS HURGHADA
    Category             : String, // 4 Star
    RoomDescription      : String, // Economy Room/Run of the House/Clusters
    Amount               : Number, // 738
    Currency             : String, // EUR
    Country_Text         : String, // Egypt
    Area_Text            : String, // Hurghada
    OperatorID           : Number, // 65
    OperatorGroup        : Number, // 0
    OperatorName         : String, // YOU TRAVEL
    Board                : String, // All inclusive, HalfBoard, HalfBoard, BedAndBreakfast, FullBoard
    Longitude            : Number, // 34.29889
    Latidude             : Number, // 27.85886
    ContractID           : Number, // 2850
    Quota                : Number, // 3
    CancellationPolicyID : Number, // 1
    DiscountPr           : Number, // 738
    EBDiscount           : Number, // 0
    MyAmountPr           : Number, // 738
    MealPlan             : String// AI
  }
};