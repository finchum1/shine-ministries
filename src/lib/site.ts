// Central place for site-wide content that Terrence will want to edit directly.
// Anything here is placeholder copy standing in for real ministry content.

export const site = {
  name: "Shine Ministries",
  tagline: "Brighter and Brighter.",
  verse: {
    text: "“The path of the righteous is like the morning sun, shining ever brighter till the full light of day.”",
    reference: "Proverbs 4:18",
  },
  // Verses the ministry holds close — 2 Corinthians 3:18 was the theme of
  // the "Glory to Glory" retreat pictured on the About page.
  verses: [
    {
      text: "“Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.”",
      reference: "3 John 1:2",
    },
    {
      text: "“And we all, who with unveiled faces contemplate the Lord's glory, are being transformed into his image with ever-increasing glory, which comes from the Lord, who is the Spirit.”",
      reference: "2 Corinthians 3:18",
    },
    {
      text: "“Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is — his good, pleasing and perfect will.”",
      reference: "Romans 12:2",
    },
  ],
  description:
    "Gathering and empowering women to cultivate a healthy soul to shine His glory.",
  ageNote: "All women welcome, ages 17+",
  email: "shineministriesoklahoma@gmail.com",
  // Real service area, from the Shine Ministries OK Facebook page.
  serviceArea: ["Oklahoma City", "Edmond", "Norman", "Moore", "Yukon", "Piedmont", "Tuttle"],
  social: {
    instagram: "https://instagram.com/shineministriesok",
    facebook: "https://www.facebook.com/profile.php?id=61589769434289",
  },
  // How We Began photo carousel — moves through 3 at a time, auto-advancing.
  groupPhotos: [
    "/brand/group-photo.jpg",
    "/brand/group-photo-02.jpg",
    "/brand/group-photo-03.jpg",
    "/brand/group-photo-04.jpg",
    "/brand/group-photo-05.jpg",
    "/brand/group-photo-06.jpg",
    "/brand/group-photo-07.jpg",
    "/brand/group-photo-08.jpg",
    "/brand/group-photo-09.jpg",
    "/brand/group-photo-10.jpg",
    "/brand/group-photo-11.jpg",
    "/brand/group-photo-12.jpg",
    "/brand/group-photo-13.jpg",
    "/brand/group-photo-14.jpg",
    "/brand/group-photo-15.jpg",
    "/brand/group-photo-16.jpg",
    "/brand/group-photo-17.jpg",
    "/brand/group-photo-18.jpg",
  ],
  // Bible Studies and Get Involved are built (src/app/bible-studies,
  // src/app/get-involved) but intentionally left out of nav for now —
  // add them back here when ready to relaunch those pages.
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
  ],
};

export const values = [
  {
    title: "Community",
    description:
      "We gather as sisters — sharing life's joys and struggles, praying for one another, and growing together in genuine friendship.",
    icon: "hands",
  },
  {
    title: "Growth",
    description:
      "We dig into God's Word together through Bible studies and teaching that help us grow deeper in faith, wisdom, and truth.",
    icon: "leaf",
  },
  {
    title: "Fun",
    description:
      "We make room for laughter and lightness — retreats, game nights, and shared meals that remind us faith is meant to be enjoyed together.",
    icon: "sun",
  },
];

// Real founder — bio is still being written; photo pending (public/brand/gina.jpg).
export const founder = {
  name: "Gina Helms-Ouren",
  role: "Founder",
  bio: "Gina's story is coming soon — check back for more about her heart behind Shine Ministries.",
  photo: "/brand/gina.jpg",
};

export const servingOpportunities = [
  {
    title: "Hospitality Team",
    description: "Welcome guests, set up gathering spaces, and help every event feel warm and inviting.",
  },
  {
    title: "Prayer Team",
    description: "Commit to praying over requests submitted by women in our community each week.",
  },
  {
    title: "Bible Study Leader",
    description: "Guide a small group through a study, fostering honest conversation and encouragement.",
  },
  {
    title: "Event Planning",
    description: "Help dream up and organize retreats, brunches, and seasonal gatherings throughout the year.",
  },
  {
    title: "Childcare Support",
    description: "Care for little ones during studies and events so moms can fully participate.",
  },
  {
    title: "Greeting & Welcome",
    description: "Be the friendly face that helps newcomers feel at home from the moment they arrive.",
  },
];

// Real fall 2026 events. Also serves as fallback content shown whenever
// Supabase isn't configured (which is the case right now — no events table
// is wired up yet, so these are what actually renders on the live site).
export const fallbackEvents = [
  {
    id: "fallback-1",
    title: "Shine Fall Kickoff Event",
    description:
      "Join us for a special night of worship, a powerful message, giveaways, sweet treats, and more.",
    event_date: "2026-09-14",
    event_time: "6:30 – 8:30 PM",
    location: "The McGranahan Barn",
    rsvp_url: "https://evite.me/8zBGqXASyZ",
    is_featured: true,
  },
  {
    id: "fallback-2",
    title: "Shine Gathering",
    description: "Join us for message, community, and fun.",
    event_date: "2026-09-28",
    event_time: "6:30 PM",
    location: "TBD",
  },
  {
    id: "fallback-3",
    title: "Shine Gathering",
    description: "Join us for message, community, and fun.",
    event_date: "2026-10-12",
    event_time: "6:30 PM",
    location: "TBD",
  },
  {
    id: "fallback-4",
    title: "Shine Gathering",
    description: "Join us for message, community, and fun.",
    event_date: "2026-10-26",
    event_time: "6:30 PM",
    location: "TBD",
  },
  {
    id: "fallback-5",
    title: "Shine Gathering",
    description: "Join us for message, community, and fun.",
    event_date: "2026-11-09",
    event_time: "6:30 PM",
    location: "TBD",
  },
  {
    id: "fallback-6",
    title: "Shine Gathering",
    description: "Join us for message, community, and fun.",
    event_date: "2026-11-23",
    event_time: "6:30 PM",
    location: "TBD",
  },
  {
    id: "fallback-7",
    title: "Shine Gathering",
    description: "Join us for message, community, and fun.",
    event_date: "2026-12-07",
    event_time: "6:30 PM",
    location: "TBD",
  },
];

export const fallbackBibleStudies = [
  {
    id: "fallback-1",
    title: "Tuesday Morning Study",
    description: "A gentle-paced study through Scripture with coffee, conversation, and childcare provided.",
    day_of_week: "Tuesdays",
    meeting_time: "9:30–11:00 AM",
    location: "Fellowship Hall",
    leader_name: "Rachel Simmons",
  },
  {
    id: "fallback-2",
    title: "Thursday Evening Study",
    description: "A study designed for women balancing work and family, meeting in the evening for deeper discussion.",
    day_of_week: "Thursdays",
    meeting_time: "6:30–8:00 PM",
    location: "Room 204",
    leader_name: "Sarah Mitchell",
  },
  {
    id: "fallback-3",
    title: "Online Study",
    description: "Join from anywhere on a flexible video call — perfect for busy seasons or if you're out of town.",
    day_of_week: "Wednesdays",
    meeting_time: "7:00 PM",
    location: "Online (Zoom link sent after sign-up)",
    leader_name: "Emily Carter",
  },
];
