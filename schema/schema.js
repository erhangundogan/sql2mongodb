var contract = {
  contractType: String,     // Purchase, Sales, Offer
  season: String,           // SUMMER 2013
  beginSeason: Date,
  endSeason: Date,
  currency: String,         // GBP
  paymentPlan: String,      // 21 days after invoice
  mealPlan: String,
  guarantee: Boolean,
  active: Boolean,
  singleSupplement: Boolean,
  exceptPrice: Boolean,
  periodCharCount: Number,
  invoiceParams: String,    // Accomodation, Transfer, Handling Fee, Child View
  beginReservation: Date,   // 22.12.2012
  endReservation: Date,     // 31.10.2013
  notes: [String],
  hotels: [ObjectID],
  createdBy: {
    date: Date,
    user: ObjectID
  },
  modifiedBy: [{
    date: Date,
    user: ObjectID
    // modifiedContract: ObjectID
  }],
  rooms: [{
    roomID: ObjectID,
    description: String,
    name: String,           // statics.roomType
    code: String,           // DAM
    hotelRoomName: String,
    location: String,       // Main, Annex, Clusters, Bungalow, Villa
    group: String,          // Standard, Family, BStandard, BFamily
    landSpace: String,      // statics.landSpace
    average: Number,
    allotment: Number,
    allotmentGuarantee: ObjectID,
    childRef: ObjectID,
    rateBasis: String,
    calcLikesPP: String,
    perRoomCalcType: String,
    minRmPriceAdl: String,
    pricePerPerson: Boolean,
    pricePerRoom: Boolean,
    resources: [{
        active: Boolean,
        caption: String,
        url: String,
        width: Number,
        height: Number,
        supplier: String,
        image: Boolean,
        video: Boolean
      }], // image, video links
    speciality: {}          // statics.speciality
  }],
  periods: [{
    roomID: ObjectID,
    periodName: String,
    formDate: Date,
    toDate: Date,
    price: Number,
    releaseDays: Number,
    minStay: Number,
    maxStay: Number,
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    cancellationPolicy: ObjectID,
    extraBed: [{
      bedType: String,    // Normal
      percent: Number,
      amount: Number
    }],
    childOption: [{
      minAge: Number,   // 2
      maxAge: Number,   // 9
      percent: Number,  // 100
      amount: Number    // 0
    }],
    earlyBooking: [{
      type: String, // Early Booking, Bonus, Rolling, Stay Pay
      beginPeriod: Date,
      endPeriod: Date,
      percent: Number,
      amount: Number,
      listSendDate: Date,
      paymentDate: Date,
      calculateType: String, // PP Per Day, PP Per Week, PP Per Stay, PB Per Stay
      rateBase: String,      // Arrival, Stay
      notes: [String],
      validRooms: [ObjectID],
      validMealPlans: [ObjectID],
      child: Boolean
    }],
    stayPay: [{
      beginAcomm: Date,
      endAcomm: Date,
      m: Boolean, // ?
      minStay: Number,
      maxStay: Number,
      minusDay: Number,
      percent: Number,
      amount: Number,
      rateBase: String, // Arrival, Stay
      calculateType: String, // Last Day, First Day, Cheapest Day, Average, Last Day of Each Week
      notes: [String],
      validRooms: [ObjectID],
      validCombinedEB: [ObjectID],
      validMealPlans: [ObjectID],
      child: Boolean
    }]
  }],
  promotions: [{
    type: [String], // Long Stayers, Group, Senior Guests, Travel Agent, Honeymoon, Driver or Guide
    min: Number,
    max: Number,
    beginBooking: Date,
    endBooking: Date,
    beginAcomm: Date,
    endAcomm: Date,
    percent: Number,
    amount: Number,
    rateBase: String, // Arrival, Stay
    notes: [String],
    validRooms: [ObjectID],
    validCombinedEB: [ObjectID],
    validOtherPromotions: [ObjectID],
    child: Boolean
  }],
  contributions: [{
    type: String, // Sales Marketing, Guide, Agency, TV/Lidl/Tchibo etc., Brochure & System
    beginBooking: Date,
    endBooking: Date,
    beginAcomm: Date,
    endAcomm: Date,
    percent: Number,
    amount: Number,
    rateBase: String, // Arrival, Stay
    notes: [String],
    operator: [ObjectID], // FTI, EXPEDIA, ...
    reduceEachInvoice: Boolean,
    directInvoice: Boolean,
    vatIncluded: Boolean,
    vatPercent: Number,
    paymentPlan: Number,
    child: Boolean
  }],
  exhibitions: [{
    remark: String, // statics.galaAndExhibitions
    beginDate: Date,
    endDate: Date,
    adults: [Number],
    childOption: [{
      minAge: Number,   // 2
      maxAge: Number,   // 9
      percent: Number,  // 100
      amount: Number    // 0
    }],
    minStay: Number,
    notes: [String],
    obligatory: Boolean, // ?
    validTime: Number, // ?
    validRooms: [ObjectID],
    validMealPlans: [ObjectID],
    validCombinedEB: [ObjectID]
  }],
  freeRooms: [{
    amount: Number,
    beginAcomm: Date,
    endAcomm: Date,
    validRooms: [ObjectID],
    adult: Number,
    day: Number,
    operator: [ObjectID] // FTI, EXPEDIA, ...
  }],
  markets: [String], // Countries
  turnOver: {
    type: String, // Room Night, Pax, Revenue
    min: Number,
    max: Number,
    percent: Number,
    amount: Number,
    separateCalculate: Boolean,
    cumulativeCalculate: Boolean,
    mealPlan: String,
    vat: Boolean,
    child: Boolean
  },
  deposit: Number,
  cancellationPolicies: [{
    name: String, // Jumbo, SunHotels, etc...
    operator: ObejctID,
    noChargeDays: Number,
    cancellationCharge: Number,
    noshowCharge: Number,
    values: [{
      day: Number,
      night: Number,
      percent: Number
    }]
  }],
  authorities: [{
    type: String, // Booking, Agency, Hotel, Sales
    user: ObjectID
  }]
};
var hotel = {
  active: Boolean,
  company: ObjectID,
  class: Number,
  chain: String,
  airports: [String],
  city: String,
  state: String,
  area: String,
  transferArea: String, // ?
  localLanguage: [String],
  marketingLevel: Number, // ?
  propertyType: Number, // ?
  country: String,
  phones: [{
    type: String,
    value: String
  }],
  fax: String,
  emails: [{
    type: String, // Reservation, Sales
    value: String
  }],
  websites: [{
    type: String,
    value: String
  }],
  addresses: [{
    type: String,
    value: String
  }],
  longitude: Number,
  latitude: Number,
  roomCount: Number,
  floorCount: Number,
  notes: [String],
  shortDescription: String, // 'Hilton Dahab Resort'
  description: String, // 'Located 100 kilometres north west of Sharm el Sheikh, the Hilton Dahab is a bungalow resort complex'
  location: String, // NULL
  nearbyAttractions: String, // 'Area Attractions: Nearby Points Of Interest Ras Mohamed National Park'
  drivingDirections: String, // 'The easiest way to get from the airport to the hotel is via taxi (typical fare 45 USD).'
  contracts: [ObjectID],
  resources: [{
    active: Boolean,
    caption: String,
    url: String,
    width: Number,
    height: Number,
    supplier: String,
    image: Boolean,
    video: Boolean,
    link: Boolean
  }], // image, video links
  createdBy: {
    date: Date,
    user: ObjectID
  },
  modifiedBy: [{
    date: Date,
    user: ObjectID
  }]
};